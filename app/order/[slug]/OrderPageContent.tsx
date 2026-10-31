"use client"

import { useEffect, useMemo, useState, useCallback, useRef } from "react"
import {
  UtensilsCrossed, Plus, Minus, ShoppingBag, Loader2, AlertCircle,
  CheckCircle2, ChefHat, BellRing, X, ArrowLeft, Clock, XCircle, Wallet,
  Download, Copy, Check, QrCode, StickyNote, Ban,
} from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL || ""

interface MenuItem {
  id: string
  name: string
  description: string | null
  price: number
  imageUrl: string | null
  categoryId: string | null
  // false while it's sold out. Older menus don't send it: available.
  isAvailable?: boolean
}
interface Category { id: string; name: string }
interface Gcash {
  enabled: boolean
  name?: string | null
  number?: string | null
  qrUrl?: string | null
}
interface MenuData {
  org: { companyName: string; logoUrl: string | null; currencySymbol: string; tagline: string | null; accentColor: string | null; coverUrl: string | null; gcash: Gcash }
  categories: Category[]
  items: MenuItem[]
}
interface PlacedOrder {
  publicId: string
  ticketNumber: number | null
  status: "PENDING" | "PREPARING" | "READY" | "COMPLETED" | "CANCELLED"
  type: "DINE_IN" | "TAKEAWAY"
  customerName: string | null
  notes: string | null
  totalAmount: number
  paymentStatus: string | null
  paymentMethod: string | null
  customerPaidClaim: boolean
  cancelReason: string | null
  expired: boolean
  expiresAt: string | null
  qrDataUrl: string | null
  createdAt: string
  items: { name: string; quantity: number; unitPrice: number; subtotal: number; notes: string | null }[]
}

type OrderType = "DINE_IN" | "TAKEAWAY"

const STEPS = [
  { key: "PENDING",   label: "Show it at the counter", active: "The cashier scans your QR",       icon: QrCode },
  { key: "PREPARING", label: "Being prepared",         active: "In the kitchen now…",             icon: ChefHat },
  { key: "READY",     label: "Ready to claim",         active: "Claim it at the counter!",        icon: BellRing },
  { key: "COMPLETED", label: "Done",                   active: "Enjoy your meal!",                icon: CheckCircle2 },
]

const PAYMENT_LABEL: Record<string, string> = { CASH: "Cash", GCASH: "GCash", CARD: "Card" }

// The number on the customer's screen matches the cashier's slips: 01-99.
const orderNo = (o: { ticketNumber: number | null }) => (o.ticketNumber != null ? String(o.ticketNumber).padStart(2, "0") : "—")
const money = (sym: string, n: number) => `${sym}${n.toFixed(2)}`
const isActive = (s: PlacedOrder["status"]) => s === "PENDING" || s === "PREPARING" || s === "READY"
const soldOut = (i: MenuItem) => i.isAvailable === false

export default function OrderPageContent({ slug }: { slug: string }) {
  const [data, setData]       = useState<MenuData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState("")
  // A sold-out dish the customer tapped: shown in a small message instead of added.
  const [unavailable, setUnavailable] = useState<MenuItem | null>(null)

  const [cart, setCart]           = useState<Record<string, number>>({})
  const [lineNotes, setLineNotes] = useState<Record<string, string>>({})
  const [noteOpen, setNoteOpen]   = useState<Record<string, boolean>>({})
  const [showCart, setShowCart]   = useState(false)
  const [orderType, setOrderType] = useState<OrderType>("DINE_IN")
  const [customerName, setCustomerName] = useState("")
  const [notes, setNotes]         = useState("")
  const [submitting, setSubmitting] = useState(false)

  // Orders placed from this phone, newest first; one is shown at a time.
  const [myOrders, setMyOrders]     = useState<string[]>([])
  const [trackingId, setTrackingId] = useState<string | null>(null)
  const [order, setOrder]           = useState<PlacedOrder | null>(null)
  const [gcash, setGcash]           = useState<Gcash | null>(null)
  const [payingMark, setPayingMark] = useState(false)
  const [copiedNum, setCopiedNum]   = useState(false)
  const [savingQr, setSavingQr]     = useState(false)
  const [now, setNow]               = useState(() => Date.now())

  const accent = data?.org.accentColor || "#f97316"
  const sym    = data?.org.currencySymbol || "₱"
  const storageKey = `smapey_orders_${slug}`

  const audioCtxRef = useRef<AudioContext | null>(null)
  const audioUnlockedRef = useRef(false)
  const prevStatusRef = useRef<string | null>(null)
  // The QR already drawn for an order, kept while it waits at the counter.
  const qrRef = useRef<{ id: string; url: string } | null>(null)

  const ensureCtx = (): AudioContext | null => {
    try {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext
      if (!Ctx) return null
      if (!audioCtxRef.current) audioCtxRef.current = new Ctx()
      return audioCtxRef.current
    } catch { return null }
  }

  // Short three-note chime via Web Audio + vibration (no asset needed).
  const playChime = useCallback(() => {
    try {
      const ctx = ensureCtx()
      if (ctx) {
        if (ctx.state === "suspended") ctx.resume()
        const t0 = ctx.currentTime
        ;[{ f: 880, t: 0 }, { f: 1318.5, t: 0.14 }, { f: 1760, t: 0.28 }].forEach(({ f, t }) => {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = "sine"
          osc.frequency.value = f
          gain.gain.setValueAtTime(0.0001, t0 + t)
          gain.gain.exponentialRampToValueAtTime(0.3, t0 + t + 0.02)
          gain.gain.exponentialRampToValueAtTime(0.0001, t0 + t + 0.4)
          osc.connect(gain).connect(ctx.destination)
          osc.start(t0 + t)
          osc.stop(t0 + t + 0.45)
        })
      }
      // With the silent switch on, iOS mutes Web Audio; vibration is the
      // reliable alert on Android (iOS ignores it).
      if (navigator.vibrate) navigator.vibrate([250, 120, 250])
    } catch {}
  }, [])

  // Unlock audio on the first tap. iOS needs a silent buffer played inside the
  // gesture, not just ctx.resume().
  useEffect(() => {
    const unlock = () => {
      try {
        const ctx = ensureCtx()
        if (!ctx) return
        if (ctx.state === "suspended") ctx.resume()
        if (!audioUnlockedRef.current) {
          const src = ctx.createBufferSource()
          src.buffer = ctx.createBuffer(1, 1, 22050)
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
          throw new Error(body?.message || "Menu not available")
        }
        return r.json()
      })
      .then(d => { if (active) { setData(d); setLoading(false) } })
      .catch(e => { if (active) { setError(e.message || "Menu not available"); setLoading(false) } })
    return () => { active = false }
  }, [slug])

  // Re-read the menu when the customer comes back to the page (and after a
  // refused order), so a dish that sold out meanwhile shows as unavailable.
  const refreshMenu = useCallback(() => {
    fetch(`${API}/api/restaurant/public/${slug}`, { cache: "no-store" })
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (d) setData(d) })
      .catch(() => {})
  }, [slug])
  useEffect(() => {
    const onVisible = () => { if (document.visibilityState === "visible") refreshMenu() }
    document.addEventListener("visibilitychange", onVisible)
    return () => document.removeEventListener("visibilitychange", onVisible)
  }, [refreshMenu])

  // ─── Orders placed from this phone ──────────────────────────────────────────
  const saveMyOrders = useCallback((ids: string[]) => {
    setMyOrders(ids)
    try { localStorage.setItem(storageKey, JSON.stringify(ids)) } catch {}
  }, [storageKey])

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "[]")
      if (Array.isArray(saved) && saved.length) {
        setMyOrders(saved)
        setTrackingId(saved[0])
      }
    } catch {}
  }, [storageKey])

  // ─── Poll the order being shown ─────────────────────────────────────────────
  const refreshOrder = useCallback(async () => {
    if (!trackingId) return
    try {
      // The QR never changes, so once it's showing, later checks skip it (qr=0).
      const haveQr = qrRef.current?.id === trackingId
      const r = await fetch(`${API}/api/restaurant/public/${slug}/orders/${trackingId}${haveQr ? "?qr=0" : ""}`, { cache: "no-store" })
      if (!r.ok) {
        if (r.status === 404) {
          saveMyOrders(myOrders.filter(id => id !== trackingId))
          setTrackingId(null)
          setOrder(null)
        }
        return
      }
      const d = await r.json()
      const newStatus = d.order?.status ?? null
      // Chime when the status changes (not on the first load).
      if (prevStatusRef.current !== null && newStatus && newStatus !== prevStatusRef.current) playChime()
      prevStatusRef.current = newStatus
      if (d.order?.qrDataUrl) qrRef.current = { id: trackingId, url: d.order.qrDataUrl }
      const keptQr = newStatus === "PENDING" && qrRef.current?.id === trackingId ? qrRef.current.url : null
      setNow(Date.now())
      setOrder(d.order ? { ...d.order, qrDataUrl: d.order.qrDataUrl ?? keptQr } : null)
      setGcash(d.gcash || null)
    } catch {}
  }, [trackingId, slug, playChime, myOrders, saveMyOrders])

  useEffect(() => {
    if (!trackingId) return
    prevStatusRef.current = null
    refreshOrder()
    // Only while the page is on screen; it catches up the moment it's shown again.
    const t = setInterval(() => { if (document.visibilityState === "visible") refreshOrder() }, 5000)
    const clock = setInterval(() => setNow(Date.now()), 30000)
    const onVisible = () => { if (document.visibilityState === "visible") refreshOrder() }
    document.addEventListener("visibilitychange", onVisible)
    window.addEventListener("focus", onVisible)
    return () => {
      clearInterval(t)
      clearInterval(clock)
      document.removeEventListener("visibilitychange", onVisible)
      window.removeEventListener("focus", onVisible)
    }
    // refreshOrder changes with myOrders; restarting the poll for that is harmless.
  }, [trackingId, refreshOrder])

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

  // Save the GCash QR so the customer can upload it inside GCash (Scan QR →
  // Upload from Gallery). Phones get the share sheet so it lands in Photos.
  const saveQr = async () => {
    if (!gcash?.qrUrl) return
    setSavingQr(true)
    try {
      const res = await fetch(gcash.qrUrl)
      const blob = await res.blob()
      const file = new File([blob], `gcash-qr-${slug}.png`, { type: blob.type || "image/png" })
      const nav = navigator as any
      if (nav.canShare && nav.canShare({ files: [file] })) {
        try {
          await nav.share({ files: [file], title: "GCash QR" })
        } catch (err: any) {
          if (err?.name !== "AbortError") window.open(gcash.qrUrl, "_blank")
        }
        return
      }
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `gcash-qr-${slug}.png`
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch {
      window.open(gcash.qrUrl, "_blank")
    } finally {
      setSavingQr(false)
    }
  }

  // ─── Cart ───────────────────────────────────────────────────────────────────
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

  const setQty = (id: string, delta: number) => {
    const item = itemsById[id]
    if (delta > 0 && item && soldOut(item)) { setUnavailable(item); return }
    setCart(c => {
      const next = Math.max(0, Math.min(99, (c[id] || 0) + delta))
      const copy = { ...c }
      if (next === 0) delete copy[id]
      else copy[id] = next
      return copy
    })
  }

  // ─── Place the order ─────────────────────────────────────────────────────────
  const placeOrder = async () => {
    if (cartLines.length === 0) return
    setError("")
    setSubmitting(true)
    try {
      const r = await fetch(`${API}/api/restaurant/public/${slug}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: orderType,
          customerName: customerName.trim() || undefined,
          notes: notes.trim() || undefined,
          items: cartLines.map(l => ({ menuItemId: l.item.id, quantity: l.qty, notes: lineNotes[l.item.id]?.trim() || undefined })),
        }),
      })
      const d = await r.json().catch(() => ({} as any))
      if (!r.ok) throw new Error(d?.message || "Could not place order")
      saveMyOrders([d.publicId, ...myOrders.filter(id => id !== d.publicId)].slice(0, 5))
      setOrder(null)
      setTrackingId(d.publicId)
      setCart({}); setLineNotes({}); setNoteOpen({}); setShowCart(false); setNotes("")
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (e: any) {
      setError(e.message || "Could not place order")
      refreshMenu()
    } finally {
      setSubmitting(false)
    }
  }

  const backToMenu = () => {
    setTrackingId(null)
    setOrder(null)
    setError("")
  }

  const forgetOrder = () => {
    saveMyOrders(myOrders.filter(id => id !== trackingId))
    backToMenu()
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

  // ─── Order view ─────────────────────────────────────────────────────────────
  if (trackingId && !order) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-[#fbf7f0] text-orange-600">
      <Loader2 className="w-7 h-7 animate-spin" />
      <p className="text-sm font-medium">Loading your order…</p>
    </div>
  )

  if (trackingId && order) {
    const cancelled = order.status === "CANCELLED"
    const activeIdx = STEPS.findIndex(s => s.key === order.status)
    const paid = order.paymentStatus === "PAID"
    // Capped at the 30-minute window in case this phone's clock runs a little behind.
    const minutesLeft = order.expiresAt ? Math.min(30, Math.max(0, Math.ceil((new Date(order.expiresAt).getTime() - now) / 60000))) : null
    return (
      <div className="min-h-screen bg-[#fbf7f0]">
        <header className="px-5 pt-8 pb-7 text-white text-center" style={{ background: `linear-gradient(135deg, ${accent}, #fbbf24)` }}>
          <p className="text-sm/none opacity-90">{data?.org.companyName}</p>
          <p className="text-xs font-semibold uppercase tracking-widest opacity-90 mt-4">Your order number</p>
          <p className="font-mono font-extrabold text-7xl leading-none mt-1 tabular-nums">{orderNo(order)}</p>
          <p className="text-sm opacity-90 mt-2">{order.type === "TAKEAWAY" ? "Take-out" : "Dine-in"}{order.customerName ? ` · ${order.customerName}` : ""}</p>
        </header>

        <main className="max-w-md mx-auto px-5 -mt-3 pb-16 space-y-4">
          {/* Status */}
          <div className="bg-white rounded-2xl border-2 border-[#161616] shadow-[5px_5px_0_#161616] p-5">
            {cancelled ? (
              <div className="flex flex-col items-center text-center gap-2 py-4">
                <XCircle className="w-10 h-10 text-[#e11d48]" />
                {order.expired ? (
                  <>
                    <p className="font-semibold text-[#161616]">This order expired</p>
                    <p className="text-sm text-[#56524b]">Nobody scanned it at the counter within 30 minutes. Please order again.</p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-[#161616]">This order was cancelled</p>
                    <p className="text-sm text-[#56524b]">Please talk to the staff if this is unexpected.</p>
                  </>
                )}
              </div>
            ) : order.status === "PENDING" ? (
              <div className="flex flex-col items-center text-center gap-3">
                <p className="font-bold text-lg text-[#161616]">Show this at the counter</p>
                {order.qrDataUrl && (
                  <img src={order.qrDataUrl} alt={`QR code for order ${orderNo(order)}`} className="w-60 h-60 max-w-full rounded-xl border-2 border-[#161616] bg-white p-1" />
                )}
                <p className="text-sm text-[#56524b]">The cashier scans it (or types <span className="font-bold font-mono">{orderNo(order)}</span>) and your order goes to the kitchen.</p>
                {minutesLeft !== null && (
                  <p className="text-xs text-[#9b9487] flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Please show it within {minutesLeft} minute{minutesLeft === 1 ? "" : "s"}.</p>
                )}
              </div>
            ) : (
              <ol className="space-y-4">
                {STEPS.map((step, i) => {
                  const done = i < activeIdx
                  const current = i === activeIdx
                  const Icon = step.icon
                  return (
                    <li key={step.key} className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition"
                        style={{ background: done || current ? accent : "#f3f4f6", color: done || current ? "#fff" : "#9ca3af" }}
                      >
                        <Icon className={`w-4 h-4 ${current ? "animate-pulse" : ""}`} />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-semibold ${done || current ? "text-[#161616]" : "text-[#9b9487]"}`}>{step.label}</p>
                        {current && <p className="text-xs font-semibold" style={{ color: accent }}>{step.active}</p>}
                      </div>
                      {(done || current) && <CheckCircle2 className="w-4 h-4 text-[#0d9f6e]" />}
                    </li>
                  )
                })}
              </ol>
            )}
          </div>

          {/* Items */}
          <div className="bg-white rounded-2xl border-2 border-[#161616] shadow-[5px_5px_0_#161616] p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#9b9487] mb-3">Your order</p>
            <ul className="space-y-2">
              {order.items.map((it, i) => (
                <li key={i} className="text-sm">
                  <div className="flex justify-between gap-3">
                    <span className="text-[#56524b]"><span className="font-semibold" style={{ color: accent }}>{it.quantity}×</span> {it.name}</span>
                    <span className="text-[#56524b]">{money(sym, it.subtotal)}</span>
                  </div>
                  {it.notes && <p className="text-xs text-[#9b9487] mt-0.5">{it.notes}</p>}
                </li>
              ))}
            </ul>
            {order.notes && <p className="text-xs text-[#56524b] bg-[#f7f2e9] rounded-lg px-3 py-2 mt-3">Note: {order.notes}</p>}
            <div className="border-t border-[#161616] mt-3 pt-3 flex justify-between font-bold text-[#161616]">
              <span>Total</span><span>{money(sym, order.totalAmount)}</span>
            </div>
          </div>

          {/* Payment */}
          {!cancelled && (
            <div className="bg-white rounded-2xl border-2 border-[#161616] shadow-[5px_5px_0_#161616] p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#9b9487] mb-3 flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5" /> Payment
              </p>
              {paid ? (
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-[#0d9f6e] shrink-0" />
                  <div>
                    <p className="font-semibold text-[#161616]">Paid{order.paymentMethod ? ` · ${PAYMENT_LABEL[order.paymentMethod] ?? order.paymentMethod}` : ""}</p>
                    <p className="text-sm text-[#56524b]">Thank you!</p>
                  </div>
                </div>
              ) : order.customerPaidClaim ? (
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-amber-500 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#161616]">GCash payment sent</p>
                    <p className="text-sm text-[#56524b]">The cashier will check it. Keep your GCash receipt ready.</p>
                  </div>
                </div>
              ) : gcash?.enabled ? (
                <>
                  <p className="text-sm text-[#56524b] mb-3">Pay <span className="font-bold text-[#161616]">{money(sym, order.totalAmount)}</span> at the counter, or now with GCash:</p>
                  {gcash.qrUrl && (
                    <>
                      <img src={gcash.qrUrl} alt="GCash QR" className="w-44 h-44 mx-auto rounded-xl border-2 border-[#161616] object-contain" />
                      <p className="text-[11px] text-[#9b9487] text-center mt-1.5">Press and hold the QR to save it to your Photos.</p>
                    </>
                  )}
                  {gcash.name && <p className="text-sm text-[#56524b] text-center mt-2"><span className="text-[#9b9487]">Account:</span> <span className="font-semibold">{gcash.name}</span></p>}
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
                  <div className="mt-3 rounded-xl bg-[#f7f2e9] px-4 py-3">
                    <p className="text-xs font-semibold text-[#56524b] mb-1.5">How to pay with GCash</p>
                    <ol className="text-xs text-[#56524b] space-y-1 list-decimal list-inside">
                      {gcash.qrUrl ? (
                        <>
                          <li>Tap <span className="font-semibold">Save QR to Photos</span>, then <span className="font-semibold">Save Image</span>.</li>
                          <li>Open <span className="font-semibold">GCash</span> → <span className="font-semibold">Scan QR</span> → <span className="font-semibold">Upload from Gallery</span>{gcash.number ? <>, or <span className="font-semibold">Send Money</span> to the number above</> : null}.</li>
                        </>
                      ) : (
                        <li>Open <span className="font-semibold">GCash</span> → <span className="font-semibold">Send Money</span> to the number above.</li>
                      )}
                      <li>Send <span className="font-semibold">{money(sym, order.totalAmount)}</span>.</li>
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
              ) : (
                <p className="text-sm text-[#56524b]">Pay <span className="font-bold text-[#161616]">{money(sym, order.totalAmount)}</span> at the counter.</p>
              )}
            </div>
          )}

          {isActive(order.status) && (
            <p className="text-center text-xs text-[#9b9487] flex items-center justify-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> This page updates on its own. Keep it open.
            </p>
          )}

          <button
            onClick={isActive(order.status) ? backToMenu : forgetOrder}
            className="w-full py-3 rounded-xl bg-white border-2 border-[#161616] text-[#56524b] text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#f7f2e9] transition"
          >
            <ArrowLeft className="w-4 h-4" /> {isActive(order.status) ? "Order something else" : "Place another order"}
          </button>
        </main>
      </div>
    )
  }

  // ─── Menu view ──────────────────────────────────────────────────────────────
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
          <div className="mt-4 inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
            Order here, then show your number at the counter
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 -mt-2">
        {myOrders.length > 0 && (
          <button
            onClick={() => setTrackingId(myOrders[0])}
            className="mt-4 w-full bg-white rounded-2xl border-2 border-[#161616] shadow-[3px_3px_0_#161616] px-4 py-3 flex items-center justify-between text-sm font-semibold text-[#161616]"
          >
            <span className="flex items-center gap-2"><QrCode className="w-4 h-4" style={{ color: accent }} /> Your last order</span>
            <span style={{ color: accent }}>View →</span>
          </button>
        )}

        {grouped.map(g => (
          <section key={g.cat.id} className="mt-5">
            <h2 className="text-sm font-bold text-[#161616] mb-2 px-1">{g.cat.name}</h2>
            <div className="space-y-2.5">
              {g.items.map(item => {
                const qty = cart[item.id] || 0
                if (soldOut(item)) return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setUnavailable(item)}
                    aria-label={`${item.name} is unavailable`}
                    className="w-full text-left bg-white/60 rounded-2xl border-2 border-[#d6cfc2] p-3 flex gap-3 items-center"
                  >
                    {item.imageUrl && <img src={item.imageUrl} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0 grayscale opacity-50" />}
                    <div className="flex-1 min-w-0 opacity-60">
                      <p className="font-semibold text-[#161616] text-sm leading-tight">{item.name}</p>
                      {item.description && <p className="text-xs text-[#56524b] mt-0.5 line-clamp-2">{item.description}</p>}
                      <p className="text-sm font-bold mt-1 text-[#9b9487]">{money(sym, item.price)}</p>
                    </div>
                    <span className="shrink-0 rounded-full border-2 border-[#d6cfc2] bg-[#f7f2e9] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#8a8173]">
                      Unavailable
                    </span>
                  </button>
                )
                return (
                  <div key={item.id} className="bg-white rounded-2xl border-2 border-[#161616] shadow-[5px_5px_0_#161616] p-3 flex gap-3">
                    {item.imageUrl && <img src={item.imageUrl} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#161616] text-sm leading-tight">{item.name}</p>
                      {item.description && <p className="text-xs text-[#56524b] mt-0.5 line-clamp-2">{item.description}</p>}
                      <p className="text-sm font-bold mt-1" style={{ color: accent }}>{money(sym, item.price)}</p>
                    </div>
                    <div className="flex items-center self-center">
                      {qty > 0 ? (
                        <div className="flex items-center gap-2.5">
                          <button onClick={() => setQty(item.id, -1)} aria-label={`One less ${item.name}`} className="w-7 h-7 rounded-full bg-[#f7f2e9] text-[#56524b] flex items-center justify-center active:scale-95"><Minus className="w-4 h-4" /></button>
                          <span className="text-sm font-bold w-4 text-center">{qty}</span>
                          <button onClick={() => setQty(item.id, +1)} aria-label={`One more ${item.name}`} className="w-7 h-7 rounded-full text-white flex items-center justify-center active:scale-95" style={{ background: accent }}><Plus className="w-4 h-4" /></button>
                        </div>
                      ) : (
                        <button onClick={() => setQty(item.id, +1)} aria-label={`Add ${item.name}`} className="w-8 h-8 rounded-full text-white flex items-center justify-center active:scale-95" style={{ background: accent }}><Plus className="w-4 h-4" /></button>
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
            <span>View cart · {money(sym, cartTotal)}</span>
          </button>
        </div>
      )}

      {/* A sold-out dish the customer tapped */}
      {unavailable && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-6" onClick={() => setUnavailable(null)}>
          <div
            role="dialog" aria-modal="true" aria-labelledby="unavailable-title"
            onClick={e => e.stopPropagation()}
            className="w-full max-w-xs bg-white rounded-2xl border-2 border-[#161616] shadow-[5px_5px_0_#161616] p-5 text-center"
          >
            {unavailable.imageUrl ? (
              <img src={unavailable.imageUrl} alt="" className="w-20 h-20 rounded-xl object-cover mx-auto grayscale opacity-70" />
            ) : (
              <div className="w-14 h-14 rounded-full bg-[#f7f2e9] mx-auto flex items-center justify-center"><Ban className="w-6 h-6 text-[#9b9487]" /></div>
            )}
            <p id="unavailable-title" className="mt-3 font-bold text-[#161616]">{unavailable.name} is unavailable</p>
            <p className="mt-1 text-sm text-[#56524b]">Sorry, it&apos;s not available right now. Please choose something else.</p>
            <button
              onClick={() => setUnavailable(null)}
              className="mt-4 w-full py-2.5 rounded-full text-white font-bold border-2 border-[#161616] active:translate-y-0.5"
              style={{ background: accent }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Cart sheet */}
      {showCart && (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/40" onClick={() => setShowCart(false)}>
          <div className="bg-white w-full max-w-md rounded-t-3xl p-5 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#161616]">Your order</h3>
              <button onClick={() => setShowCart(false)} aria-label="Close" className="w-8 h-8 rounded-full bg-[#f7f2e9] flex items-center justify-center"><X className="w-4 h-4 text-[#56524b]" /></button>
            </div>

            <div className="space-y-3">
              {cartLines.map(l => (
                <div key={l.item.id} className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#161616]">{l.item.name}</p>
                      <p className="text-xs text-[#56524b]">{money(sym, l.item.price)}</p>
                      {soldOut(l.item) && <p className="text-xs font-semibold text-[#e11d48]">Unavailable now. Remove it to order.</p>}
                    </div>
                    <button
                      onClick={() => setNoteOpen(n => ({ ...n, [l.item.id]: !n[l.item.id] }))}
                      aria-label={`Note for ${l.item.name}`}
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ color: lineNotes[l.item.id]?.trim() ? accent : "#9b9487" }}
                    >
                      <StickyNote className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2.5">
                      <button onClick={() => setQty(l.item.id, -1)} aria-label={`One less ${l.item.name}`} className="w-7 h-7 rounded-full bg-[#f7f2e9] flex items-center justify-center"><Minus className="w-4 h-4" /></button>
                      <span className="text-sm font-bold w-4 text-center">{l.qty}</span>
                      <button onClick={() => setQty(l.item.id, +1)} aria-label={`One more ${l.item.name}`} className="w-7 h-7 rounded-full text-white flex items-center justify-center" style={{ background: accent }}><Plus className="w-4 h-4" /></button>
                    </div>
                    <span className="text-sm font-semibold w-16 text-right text-[#56524b]">{money(sym, l.item.price * l.qty)}</span>
                  </div>
                  {(noteOpen[l.item.id] || lineNotes[l.item.id]) && (
                    <input
                      value={lineNotes[l.item.id] || ""}
                      onChange={e => setLineNotes(n => ({ ...n, [l.item.id]: e.target.value }))}
                      placeholder="e.g. no onions"
                      maxLength={140}
                      className="w-full px-3 py-2 rounded-xl bg-[#f7f2e9] border-2 border-[#161616] text-sm outline-none"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-[#161616] mt-4 pt-4 space-y-3">
              <div className="grid grid-cols-2 rounded-xl border-2 border-[#161616] overflow-hidden text-sm font-semibold">
                {(["DINE_IN", "TAKEAWAY"] as OrderType[]).map(t => (
                  <button
                    key={t}
                    onClick={() => setOrderType(t)}
                    className="py-2.5 transition"
                    style={orderType === t ? { background: accent, color: "#fff" } : { color: "#56524b" }}
                  >
                    {t === "DINE_IN" ? "Dine-in" : "Take-out"}
                  </button>
                ))}
              </div>
              <input
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                placeholder="Your name (optional)"
                maxLength={60}
                className="w-full px-4 py-2.5 rounded-xl bg-[#f7f2e9] border-2 border-[#161616] text-sm outline-none focus:border-[#161616]"
              />
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Note for the whole order (optional)"
                rows={2}
                maxLength={300}
                className="w-full px-4 py-2.5 rounded-xl bg-[#f7f2e9] border-2 border-[#161616] text-sm outline-none focus:border-[#161616] resize-none"
              />
            </div>

            {error && <p className="text-sm text-[#e11d48] mt-3 flex items-center gap-1.5"><AlertCircle className="w-4 h-4 shrink-0" /> {error}</p>}

            <div className="flex justify-between font-bold text-[#161616] mt-4 mb-3">
              <span>Total</span><span>{money(sym, cartTotal)}</span>
            </div>
            <button
              onClick={placeOrder}
              disabled={submitting}
              className="w-full py-3.5 rounded-full text-white font-bold border-2 border-[#161616] shadow-[3px_3px_0_#161616] flex items-center justify-center gap-2 disabled:opacity-60 active:translate-y-0.5 active:shadow-none transition"
              style={{ background: accent }}
            >
              {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Placing…</> : <>Place order</>}
            </button>
            <p className="text-xs text-[#9b9487] text-center mt-2">You'll get an order number to show at the counter.</p>
          </div>
        </div>
      )}
    </div>
  )
}
