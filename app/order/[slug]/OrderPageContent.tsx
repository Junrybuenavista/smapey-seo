"use client"

import { useEffect, useMemo, useState, useCallback, useRef } from "react"
import { useSearchParams } from "next/navigation"
import {
  UtensilsCrossed, Plus, Minus, ShoppingBag, Loader2, AlertCircle,
  CheckCircle2, ChefHat, BellRing, X, ArrowLeft, Clock, XCircle, Wallet,
  Download, Copy, Check,
} from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL || ""

interface MenuItem {
  id: string
  name: string
  description: string | null
  price: number
  imageUrl: string | null
  categoryId: string | null
}
interface Category { id: string; name: string }
interface MenuData {
  org: { companyName: string; logoUrl: string | null; currencySymbol: string; tagline: string | null; accentColor: string | null; coverUrl: string | null }
  categories: Category[]
  items: MenuItem[]
}
interface PlacedOrder {
  id: string
  orderNumber: string
  status: string
  type: string
  tableNumber: string | null
  customerName: string | null
  totalAmount: number
  paymentStatus: string | null
  paymentMethod: string | null
  customerPaidClaim: boolean
  createdAt: string
  items: { name: string; quantity: number; unitPrice: number; subtotal: number }[]
}
interface Gcash {
  enabled: boolean
  name?: string | null
  number?: string | null
  qrUrl?: string | null
}

const STATUS_STEPS = [
  { key: "PENDING",   label: "Order received", active: "Waiting for the kitchen…", icon: CheckCircle2 },
  { key: "PREPARING", label: "Being prepared", active: "In the kitchen now…",      icon: ChefHat },
  { key: "READY",     label: "Ready to serve", active: "Your order is ready!",     icon: BellRing },
  { key: "COMPLETED", label: "Completed",      active: "Enjoy your meal!",          icon: CheckCircle2 },
]

export default function OrderPageContent({ slug }: { slug: string }) {
  const searchParams = useSearchParams()
  const table = searchParams.get("table") || ""

  const [data, setData]       = useState<MenuData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState("")

  const [cart, setCart]         = useState<Record<string, number>>({})
  const [showCart, setShowCart] = useState(false)
  const [customerName, setCustomerName] = useState("")
  const [notes, setNotes]       = useState("")
  const [submitting, setSubmitting] = useState(false)

  const [order, setOrder]       = useState<PlacedOrder | null>(null)
  const [trackingId, setTrackingId] = useState<string | null>(null)
  const [gcash, setGcash]       = useState<Gcash | null>(null)
  const [payingMark, setPayingMark] = useState(false)
  const [copiedNum, setCopiedNum] = useState(false)
  const [savingQr, setSavingQr] = useState(false)

  const accent = data?.org.accentColor || "#f97316"
  const sym    = data?.org.currencySymbol || "₱"
  const storageKey = `smapey_order_${slug}`

  const audioCtxRef = useRef<AudioContext | null>(null)
  const audioUnlockedRef = useRef(false)
  const prevStatusRef = useRef<string | null>(null)

  const ensureCtx = (): AudioContext | null => {
    try {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext
      if (!Ctx) return null
      if (!audioCtxRef.current) audioCtxRef.current = new Ctx()
      return audioCtxRef.current
    } catch { return null }
  }

  // Short two-tone chime via Web Audio + vibrate fallback (no asset needed).
  const playChime = useCallback(() => {
    try {
      const ctx = ensureCtx()
      if (ctx) {
        if (ctx.state === "suspended") ctx.resume()
        const now = ctx.currentTime
        ;[{ f: 880, t: 0 }, { f: 1318.5, t: 0.14 }, { f: 1760, t: 0.28 }].forEach(({ f, t }) => {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = "sine"
          osc.frequency.value = f
          gain.gain.setValueAtTime(0.0001, now + t)
          gain.gain.exponentialRampToValueAtTime(0.3, now + t + 0.02)
          gain.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.4)
          osc.connect(gain).connect(ctx.destination)
          osc.start(now + t)
          osc.stop(now + t + 0.45)
        })
      }
      // On phones with the silent switch on, Web Audio is muted by iOS —
      // vibration is the only reliable alert (Android; iOS ignores it).
      if (navigator.vibrate) navigator.vibrate([250, 120, 250])
    } catch {}
  }, [])

  // Fully unlock audio on the first user gesture. iOS needs a silent buffer
  // played *inside* the gesture, not just ctx.resume().
  useEffect(() => {
    const unlock = () => {
      try {
        const ctx = ensureCtx()
        if (!ctx) return
        if (ctx.state === "suspended") ctx.resume()
        if (!audioUnlockedRef.current) {
          const buf = ctx.createBuffer(1, 1, 22050)
          const src = ctx.createBufferSource()
          src.buffer = buf
          src.connect(ctx.destination)
          src.start(0)
          audioUnlockedRef.current = true
        }
      } catch {}
    }
    window.addEventListener("touchend", unlock)
    window.addEventListener("pointerdown", unlock)
    window.addEventListener("click", unlock)
    return () => {
      window.removeEventListener("touchend", unlock)
      window.removeEventListener("pointerdown", unlock)
      window.removeEventListener("click", unlock)
    }
  }, [])

  // ─── Load menu ────────────────────────────────────────────────────────────
  useEffect(() => {
    let active = true
    fetch(`${API}/api/restaurant/public/${slug}`)
      .then(async r => {
        if (!r.ok) {
          const body = await r.json().catch(() => ({} as any))
          throw new Error(body?.message || body?.error || "Menu not available")
        }
        return r.json()
      })
      .then(d => { if (active) { setData(d); setLoading(false) } })
      .catch(e => { if (active) { setError(e.message || "Menu not available"); setLoading(false) } })
    return () => { active = false }
  }, [slug])

  // ─── Restore a tracked order from this device ───────────────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) setTrackingId(JSON.parse(saved).id)
    } catch {}
  }, [storageKey])

  // ─── Poll order status while tracking ───────────────────────────────────────
  const refreshOrder = useCallback(async () => {
    if (!trackingId) return
    try {
      const r = await fetch(`${API}/api/restaurant/public/${slug}/orders/${trackingId}`)
      if (!r.ok) { if (r.status === 404) { localStorage.removeItem(storageKey); setTrackingId(null) } return }
      const d = await r.json()
      // Chime when the order status changes (skip the first load).
      const newStatus = d.order?.status ?? null
      if (prevStatusRef.current !== null && newStatus && newStatus !== prevStatusRef.current) {
        playChime()
      }
      prevStatusRef.current = newStatus
      setOrder(d.order)
      setGcash(d.gcash || null)
    } catch {}
  }, [trackingId, slug, storageKey, playChime])

  const markPaid = async () => {
    if (!trackingId) return
    setPayingMark(true)
    try {
      await fetch(`${API}/api/restaurant/public/${slug}/orders/${trackingId}/paid`, { method: "POST" })
      await refreshOrder()
    } catch {} finally {
      setPayingMark(false)
    }
  }

  const copyNumber = () => {
    if (!gcash?.number) return
    navigator.clipboard?.writeText(gcash.number).catch(() => {})
    setCopiedNum(true)
    setTimeout(() => setCopiedNum(false), 1500)
  }

  // Save the QR so the customer can upload it inside GCash (Scan QR → Upload from Gallery).
  // On phones we use the native share sheet so it lands in Photos (not the Files folder).
  const saveQr = async () => {
    if (!gcash?.qrUrl) return
    setSavingQr(true)
    try {
      const res = await fetch(gcash.qrUrl)
      const blob = await res.blob()
      const file = new File([blob], `gcash-qr-${slug}.png`, { type: blob.type || "image/png" })
      const nav = navigator as any

      // Mobile: open the share sheet → "Save Image" / "Save to Photos" → goes to gallery.
      if (nav.canShare && nav.canShare({ files: [file] })) {
        try {
          await nav.share({ files: [file], title: "GCash QR" })
        } catch (err: any) {
          // User just dismissed the sheet — leave them on the page.
          if (err?.name !== "AbortError") window.open(gcash.qrUrl, "_blank")
        }
        return
      }

      // Desktop (no share API): download the file.
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `gcash-qr-${slug}.png`
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch {
      // Last resort: open the image so they can long-press → Save to Photos.
      window.open(gcash.qrUrl, "_blank")
    } finally {
      setSavingQr(false)
    }
  }

  useEffect(() => {
    if (!trackingId) return
    refreshOrder()
    const t = setInterval(refreshOrder, 8000)
    const onVisible = () => { if (document.visibilityState === "visible") refreshOrder() }
    document.addEventListener("visibilitychange", onVisible)
    window.addEventListener("focus", onVisible)
    return () => {
      clearInterval(t)
      document.removeEventListener("visibilitychange", onVisible)
      window.removeEventListener("focus", onVisible)
    }
  }, [trackingId, refreshOrder])

  // ─── Cart helpers ───────────────────────────────────────────────────────────
  const itemsById = useMemo(() => {
    const m: Record<string, MenuItem> = {}
    data?.items.forEach(i => { m[i.id] = i })
    return m
  }, [data])

  const cartLines = useMemo(
    () => Object.entries(cart).filter(([, q]) => q > 0).map(([id, q]) => ({ item: itemsById[id], qty: q })).filter(l => l.item),
    [cart, itemsById]
  )
  const cartCount = cartLines.reduce((s, l) => s + l.qty, 0)
  const cartTotal = cartLines.reduce((s, l) => s + l.item.price * l.qty, 0)

  const setQty = (id: string, delta: number) =>
    setCart(c => {
      const next = Math.max(0, (c[id] || 0) + delta)
      const copy = { ...c }
      if (next === 0) delete copy[id]
      else copy[id] = next
      return copy
    })

  // ─── Submit order ───────────────────────────────────────────────────────────
  const placeOrder = async () => {
    if (!table) { setError("Missing table number. Please rescan the QR code on your table."); return }
    if (cartLines.length === 0) return
    setError("")
    setSubmitting(true)
    try {
      const r = await fetch(`${API}/api/restaurant/public/${slug}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableNumber: table,
          customerName: customerName.trim() || undefined,
          notes: notes.trim() || undefined,
          items: cartLines.map(l => ({ menuItemId: l.item.id, quantity: l.qty })),
        }),
      })
      const d = await r.json()
      if (!r.ok) throw new Error(d?.message || d?.error || "Could not place order")
      localStorage.setItem(storageKey, JSON.stringify({ id: d.id }))
      setTrackingId(d.id)
      setCart({}); setShowCart(false); setNotes(""); setCustomerName("")
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (e: any) {
      setError(e.message || "Could not place order")
    } finally {
      setSubmitting(false)
    }
  }

  const startNewOrder = () => {
    localStorage.removeItem(storageKey)
    setTrackingId(null)
    setOrder(null)
  }

  // ─── Render states ──────────────────────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-[#fbf7f0] text-orange-600">
      <Loader2 className="w-7 h-7 animate-spin" />
      <p className="text-sm font-medium">Loading menu…</p>
    </div>
  )

  if (error && !data) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-[#fbf7f0] text-[#56524b] p-6 text-center">
      <AlertCircle className="w-9 h-9 text-orange-500" />
      <p className="text-lg font-semibold text-[#161616]">Menu unavailable</p>
      <p className="text-sm max-w-xs">{error}</p>
    </div>
  )

  // ─── Order tracking view ────────────────────────────────────────────────────
  if (trackingId && order) {
    const cancelled = order.status === "CANCELLED"
    const activeIdx = STATUS_STEPS.findIndex(s => s.key === order.status)
    return (
      <div className="min-h-screen bg-[#fbf7f0]">
        <header className="px-5 pt-8 pb-6 text-white" style={{ background: `linear-gradient(135deg, ${accent}, #fbbf24)` }}>
          <p className="text-sm/none opacity-90">{data?.org.companyName}</p>
          <h1 className="text-2xl font-bold mt-1">Order {order.orderNumber}</h1>
          {order.tableNumber && <p className="text-sm opacity-90 mt-0.5">Table {order.tableNumber}</p>}
        </header>

        <main className="max-w-md mx-auto px-5 -mt-3 pb-16">
          <div className="bg-white rounded-2xl border-2 border-[#161616] shadow-[5px_5px_0_#161616] p-5">
            {cancelled ? (
              <div className="flex flex-col items-center text-center gap-2 py-4">
                <XCircle className="w-10 h-10 text-[#e11d48]" />
                <p className="font-semibold text-[#161616]">This order was cancelled</p>
                <p className="text-sm text-[#56524b]">Please talk to the staff if this is unexpected.</p>
              </div>
            ) : (
              <ol className="space-y-4">
                {STATUS_STEPS.map((step, i) => {
                  const done = i < activeIdx
                  const current = i === activeIdx
                  const Icon = step.icon
                  return (
                    <li key={step.key} className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition"
                        style={{
                          background: done || current ? accent : "#f3f4f6",
                          color: done || current ? "#fff" : "#9ca3af",
                        }}
                      >
                        {current ? <Icon className="w-4 h-4 animate-pulse" /> : <Icon className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-semibold ${done || current ? "text-[#161616]" : "text-[#9b9487]"}`}>{step.label}</p>
                        {current && <p className="text-xs" style={{ color: accent }}>{step.active}</p>}
                      </div>
                      {(done || current) && <CheckCircle2 className="w-4 h-4 text-[#0d9f6e]" />}
                    </li>
                  )
                })}
              </ol>
            )}
          </div>

          <div className="bg-white rounded-2xl border-2 border-[#161616] shadow-[5px_5px_0_#161616] p-5 mt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#9b9487] mb-3">Your order</p>
            <ul className="space-y-2">
              {order.items.map((it, i) => (
                <li key={i} className="flex justify-between text-sm">
                  <span className="text-[#56524b]"><span className="font-semibold" style={{ color: accent }}>{it.quantity}×</span> {it.name}</span>
                  <span className="text-[#56524b]">{sym}{it.subtotal.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-[#161616] mt-3 pt-3 flex justify-between font-bold text-[#161616]">
              <span>Total</span><span>{sym}{order.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* GCash payment */}
          {!cancelled && gcash?.enabled && (
            <div className="bg-white rounded-2xl border-2 border-[#161616] shadow-[5px_5px_0_#161616] p-5 mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#9b9487] mb-3 flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5" /> Pay with GCash
              </p>

              {order.paymentStatus === "PAID" ? (
                <div className="flex flex-col items-center text-center gap-2 py-3">
                  <CheckCircle2 className="w-10 h-10 text-[#0d9f6e]" />
                  <p className="font-semibold text-[#161616]">Payment confirmed</p>
                  <p className="text-sm text-[#56524b]">Thank you! Your payment has been received.</p>
                </div>
              ) : order.customerPaidClaim ? (
                <div className="flex flex-col items-center text-center gap-2 py-3">
                  <Clock className="w-9 h-9 text-amber-500" />
                  <p className="font-semibold text-[#161616]">Payment submitted</p>
                  <p className="text-sm text-[#56524b]">Waiting for the staff to confirm your GCash payment. Please keep your GCash receipt ready.</p>
                </div>
              ) : (
                <>
                  {gcash.qrUrl && (
                    <>
                      <img src={gcash.qrUrl} alt="GCash QR" className="w-44 h-44 mx-auto rounded-xl border-2 border-[#161616] object-contain" />
                      <p className="text-[11px] text-[#9b9487] text-center mt-1.5">Press and hold the QR to save it to your Photos.</p>
                    </>
                  )}

                  <div className="mt-3 space-y-1 text-center">
                    {gcash.name && <p className="text-sm text-[#56524b]"><span className="text-[#9b9487]">Account:</span> <span className="font-semibold">{gcash.name}</span></p>}
                    <p className="text-lg font-bold text-[#161616]">Pay {sym}{order.totalAmount.toFixed(2)}</p>
                  </div>

                  {/* Number with copy */}
                  {gcash.number && (
                    <button
                      onClick={copyNumber}
                      className="w-full mt-3 flex items-center justify-between gap-2 rounded-xl border-2 border-[#161616] px-4 py-2.5 text-sm"
                    >
                      <span className="text-[#9b9487]">GCash number</span>
                      <span className="flex items-center gap-1.5 font-semibold text-[#161616]">
                        {gcash.number}
                        {copiedNum ? <Check className="w-3.5 h-3.5 text-[#0d9f6e]" /> : <Copy className="w-3.5 h-3.5 text-[#9b9487]" />}
                      </span>
                    </button>
                  )}

                  {/* Save QR for in-app scanning */}
                  {gcash.qrUrl && (
                    <button
                      onClick={saveQr}
                      disabled={savingQr}
                      className="w-full mt-2 py-2.5 rounded-xl border-2 border-[#161616] text-[#56524b] text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {savingQr ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                      Save QR to Photos
                    </button>
                  )}

                  {/* How to pay */}
                  <div className="mt-3 rounded-xl bg-[#f7f2e9] px-4 py-3">
                    <p className="text-xs font-semibold text-[#56524b] mb-1.5">How to pay</p>
                    <ol className="text-xs text-[#56524b] space-y-1 list-decimal list-inside">
                      <li>Tap <span className="font-semibold">Save QR to Photos</span>, then choose <span className="font-semibold">Save Image</span> to add it to your gallery.</li>
                      <li>Open <span className="font-semibold">GCash</span> → <span className="font-semibold">Scan QR</span> → <span className="font-semibold">Upload from Gallery</span> and pick the saved QR{gcash.number ? <> — or use <span className="font-semibold">Send Money</span> to the number above</> : null}.</li>
                      <li>Enter <span className="font-semibold">{sym}{order.totalAmount.toFixed(2)}</span> and complete the payment.</li>
                      <li>Come back here and tap <span className="font-semibold">I’ve paid via GCash</span>.</li>
                    </ol>
                  </div>

                  <button
                    onClick={markPaid}
                    disabled={payingMark}
                    className="w-full mt-3 py-3 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                    style={{ background: accent }}
                  >
                    {payingMark ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                    I’ve paid via GCash
                  </button>
                </>
              )}
            </div>
          )}

          <p className="text-center text-xs text-[#9b9487] mt-4 flex items-center justify-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Status updates automatically
          </p>

          <button
            onClick={startNewOrder}
            className="w-full mt-4 py-3 rounded-xl bg-white border-2 border-[#161616] text-[#56524b] text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#f7f2e9] transition"
          >
            <ArrowLeft className="w-4 h-4" /> Place another order
          </button>
        </main>
      </div>
    )
  }

  // ─── Menu / ordering view ───────────────────────────────────────────────────
  const cats = data ? [{ id: "__all", name: "" }, ...data.categories] : []
  const grouped = data
    ? [
        ...data.categories.map(c => ({ cat: c, items: data.items.filter(i => i.categoryId === c.id) })),
        { cat: { id: "__uncat", name: "More" }, items: data.items.filter(i => !i.categoryId || !data.categories.some(c => c.id === i.categoryId)) },
      ].filter(g => g.items.length > 0)
    : []

  return (
    <div className="min-h-screen bg-[#fbf7f0] pb-28">
      <header className="relative px-5 pt-10 pb-7 text-white overflow-hidden min-h-[150px] flex flex-col justify-end">
        {data?.org.coverUrl
          ? <img src={data.org.coverUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
          : <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${accent}, #fbbf24)` }} />}
        {/* Scrim keeps the logo and name readable on any image */}
        {data?.org.coverUrl && (
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.35) 100%)" }} />
        )}
        <div className="relative" style={{ textShadow: data?.org.coverUrl ? "0 1px 4px rgba(0,0,0,0.55)" : undefined }}>
          <div className="flex items-center gap-3">
            {data?.org.logoUrl
              ? <img src={data.org.logoUrl} alt="" className="w-12 h-12 rounded-xl object-cover bg-white/20 ring-2 ring-white/40 shadow-lg" />
              : <div className="w-12 h-12 rounded-xl bg-white/20 ring-2 ring-white/40 shadow-lg flex items-center justify-center"><UtensilsCrossed className="w-6 h-6" /></div>}
            <div>
              <h1 className="text-xl font-bold leading-tight">{data?.org.companyName}</h1>
              {data?.org.tagline && <p className="text-sm opacity-90">{data.org.tagline}</p>}
            </div>
          </div>
          {table
            ? <div className="mt-4 inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">Table {table}</div>
            : <div className="mt-4 inline-flex items-center gap-1.5 bg-red-500/40 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium"><AlertCircle className="w-3.5 h-3.5" /> No table — rescan QR</div>}
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 -mt-2">
        {grouped.map(g => (
          <section key={g.cat.id} className="mt-5">
            <h2 className="text-sm font-bold text-[#161616] mb-2 px-1">{g.cat.name}</h2>
            <div className="space-y-2.5">
              {g.items.map(item => {
                const qty = cart[item.id] || 0
                return (
                  <div key={item.id} className="bg-white rounded-2xl border-2 border-[#161616] shadow-[5px_5px_0_#161616] p-3 flex gap-3">
                    {item.imageUrl && <img src={item.imageUrl} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#161616] text-sm leading-tight">{item.name}</p>
                      {item.description && <p className="text-xs text-[#56524b] mt-0.5 line-clamp-2">{item.description}</p>}
                      <p className="text-sm font-bold mt-1" style={{ color: accent }}>{sym}{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center self-center">
                      {qty > 0 ? (
                        <div className="flex items-center gap-2.5">
                          <button onClick={() => setQty(item.id, -1)} className="w-7 h-7 rounded-full bg-[#f7f2e9] text-[#56524b] flex items-center justify-center active:scale-95"><Minus className="w-4 h-4" /></button>
                          <span className="text-sm font-bold w-4 text-center">{qty}</span>
                          <button onClick={() => setQty(item.id, +1)} className="w-7 h-7 rounded-full text-white flex items-center justify-center active:scale-95" style={{ background: accent }}><Plus className="w-4 h-4" /></button>
                        </div>
                      ) : (
                        <button onClick={() => setQty(item.id, +1)} className="w-8 h-8 rounded-full text-white flex items-center justify-center active:scale-95" style={{ background: accent }}><Plus className="w-4 h-4" /></button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
        {grouped.length === 0 && (
          <p className="text-center text-[#9b9487] text-sm mt-16">No items on the menu yet.</p>
        )}
      </main>

      {/* Floating cart button */}
      {cartCount > 0 && !showCart && (
        <div className="fixed bottom-4 inset-x-0 px-4 z-20">
          <button
            onClick={() => setShowCart(true)}
            className="max-w-md mx-auto w-full py-3.5 rounded-full text-white font-bold border-2 border-[#161616] shadow-[4px_4px_0_#161616] flex items-center justify-between px-5 active:translate-y-0.5 active:shadow-none transition"
            style={{ background: accent }}
          >
            <span className="flex items-center gap-2"><ShoppingBag className="w-5 h-5" /> {cartCount} item{cartCount > 1 ? "s" : ""}</span>
            <span>View cart · {sym}{cartTotal.toFixed(2)}</span>
          </button>
        </div>
      )}

      {/* Cart sheet */}
      {showCart && (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/40" onClick={() => setShowCart(false)}>
          <div className="bg-white w-full max-w-md rounded-t-3xl p-5 max-h-[88vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#161616]">Your order</h3>
              <button onClick={() => setShowCart(false)} className="w-8 h-8 rounded-full bg-[#f7f2e9] flex items-center justify-center"><X className="w-4 h-4 text-[#56524b]" /></button>
            </div>

            <div className="space-y-3">
              {cartLines.map(l => (
                <div key={l.item.id} className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#161616]">{l.item.name}</p>
                    <p className="text-xs text-[#56524b]">{sym}{l.item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button onClick={() => setQty(l.item.id, -1)} className="w-7 h-7 rounded-full bg-[#f7f2e9] flex items-center justify-center"><Minus className="w-4 h-4" /></button>
                    <span className="text-sm font-bold w-4 text-center">{l.qty}</span>
                    <button onClick={() => setQty(l.item.id, +1)} className="w-7 h-7 rounded-full text-white flex items-center justify-center" style={{ background: accent }}><Plus className="w-4 h-4" /></button>
                  </div>
                  <span className="text-sm font-semibold w-16 text-right text-[#56524b]">{sym}{(l.item.price * l.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#161616] mt-4 pt-4 space-y-3">
              <input
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                placeholder="Your name (optional)"
                className="w-full px-4 py-2.5 rounded-xl bg-[#f7f2e9] border-2 border-[#161616] text-sm outline-none focus:border-[#161616]"
              />
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Special requests (optional)"
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl bg-[#f7f2e9] border-2 border-[#161616] text-sm outline-none focus:border-[#161616] resize-none"
              />
            </div>

            {error && <p className="text-sm text-[#e11d48] mt-3 flex items-center gap-1.5"><AlertCircle className="w-4 h-4" /> {error}</p>}

            <div className="flex justify-between font-bold text-[#161616] mt-4 mb-3">
              <span>Total</span><span>{sym}{cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={placeOrder}
              disabled={submitting || !table}
              className="w-full py-3.5 rounded-full text-white font-bold border-2 border-[#161616] shadow-[3px_3px_0_#161616] flex items-center justify-center gap-2 disabled:opacity-60 active:translate-y-0.5 active:shadow-none transition"
              style={{ background: accent }}
            >
              {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Placing…</> : <>Place order</>}
            </button>
            {!table && <p className="text-xs text-[#e11d48] text-center mt-2">Rescan the QR code on your table to order.</p>}
          </div>
        </div>
      )}
    </div>
  )
}
