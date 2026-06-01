"use client"

import { useEffect, useMemo, useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import {
  UtensilsCrossed, Plus, Minus, ShoppingBag, Loader2, AlertCircle,
  CheckCircle2, ChefHat, BellRing, X, ArrowLeft, Clock, XCircle,
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
  createdAt: string
  items: { name: string; quantity: number; unitPrice: number; subtotal: number }[]
}

const STATUS_STEPS = [
  { key: "PENDING",   label: "Order received", icon: CheckCircle2 },
  { key: "PREPARING", label: "Being prepared", icon: ChefHat },
  { key: "READY",     label: "Ready to serve", icon: BellRing },
  { key: "COMPLETED", label: "Completed",      icon: CheckCircle2 },
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

  const accent = data?.org.accentColor || "#f97316"
  const sym    = data?.org.currencySymbol || "₱"
  const storageKey = `smapey_order_${slug}`

  // ─── Load menu ────────────────────────────────────────────────────────────
  useEffect(() => {
    let active = true
    fetch(`${API}/api/restaurant/public/${slug}`)
      .then(async r => {
        if (!r.ok) throw new Error((await r.json().catch(() => ({})))?.error || "Menu not available")
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
      setOrder(d.order)
    } catch {}
  }, [trackingId, slug, storageKey])

  useEffect(() => {
    if (!trackingId) return
    refreshOrder()
    const t = setInterval(refreshOrder, 8000)
    return () => clearInterval(t)
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
      if (!r.ok) throw new Error(d?.error || "Could not place order")
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
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-orange-50 text-orange-600">
      <Loader2 className="w-7 h-7 animate-spin" />
      <p className="text-sm font-medium">Loading menu…</p>
    </div>
  )

  if (error && !data) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-orange-50 text-gray-600 p-6 text-center">
      <AlertCircle className="w-9 h-9 text-orange-500" />
      <p className="text-lg font-semibold text-gray-800">Menu unavailable</p>
      <p className="text-sm max-w-xs">{error}</p>
    </div>
  )

  // ─── Order tracking view ────────────────────────────────────────────────────
  if (trackingId && order) {
    const cancelled = order.status === "CANCELLED"
    const activeIdx = STATUS_STEPS.findIndex(s => s.key === order.status)
    return (
      <div className="min-h-screen bg-orange-50">
        <header className="px-5 pt-8 pb-6 text-white" style={{ background: `linear-gradient(135deg, ${accent}, #fbbf24)` }}>
          <p className="text-sm/none opacity-90">{data?.org.companyName}</p>
          <h1 className="text-2xl font-bold mt-1">Order {order.orderNumber}</h1>
          {order.tableNumber && <p className="text-sm opacity-90 mt-0.5">Table {order.tableNumber}</p>}
        </header>

        <main className="max-w-md mx-auto px-5 -mt-3 pb-16">
          <div className="bg-white rounded-2xl shadow-sm p-5">
            {cancelled ? (
              <div className="flex flex-col items-center text-center gap-2 py-4">
                <XCircle className="w-10 h-10 text-red-500" />
                <p className="font-semibold text-gray-800">This order was cancelled</p>
                <p className="text-sm text-gray-500">Please talk to the staff if this is unexpected.</p>
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
                        <p className={`text-sm font-semibold ${done || current ? "text-gray-900" : "text-gray-400"}`}>{step.label}</p>
                        {current && <p className="text-xs" style={{ color: accent }}>In progress…</p>}
                      </div>
                      {done && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                    </li>
                  )
                })}
              </ol>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5 mt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Your order</p>
            <ul className="space-y-2">
              {order.items.map((it, i) => (
                <li key={i} className="flex justify-between text-sm">
                  <span className="text-gray-700"><span className="font-semibold" style={{ color: accent }}>{it.quantity}×</span> {it.name}</span>
                  <span className="text-gray-500">{sym}{it.subtotal.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between font-bold text-gray-900">
              <span>Total</span><span>{sym}{order.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Status updates automatically
          </p>

          <button
            onClick={startNewOrder}
            className="w-full mt-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition"
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
    <div className="min-h-screen bg-orange-50 pb-28">
      <header className="px-5 pt-8 pb-6 text-white" style={{ background: `linear-gradient(135deg, ${accent}, #fbbf24)` }}>
        <div className="flex items-center gap-3">
          {data?.org.logoUrl
            ? <img src={data.org.logoUrl} alt="" className="w-12 h-12 rounded-xl object-cover bg-white/20" />
            : <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><UtensilsCrossed className="w-6 h-6" /></div>}
          <div>
            <h1 className="text-xl font-bold leading-tight">{data?.org.companyName}</h1>
            {data?.org.tagline && <p className="text-sm opacity-90">{data.org.tagline}</p>}
          </div>
        </div>
        {table
          ? <div className="mt-4 inline-flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 text-sm font-medium">Table {table}</div>
          : <div className="mt-4 inline-flex items-center gap-1.5 bg-red-500/30 rounded-full px-3 py-1 text-xs font-medium"><AlertCircle className="w-3.5 h-3.5" /> No table — rescan QR</div>}
      </header>

      <main className="max-w-md mx-auto px-4 -mt-2">
        {grouped.map(g => (
          <section key={g.cat.id} className="mt-5">
            <h2 className="text-sm font-bold text-gray-800 mb-2 px-1">{g.cat.name}</h2>
            <div className="space-y-2.5">
              {g.items.map(item => {
                const qty = cart[item.id] || 0
                return (
                  <div key={item.id} className="bg-white rounded-2xl shadow-sm p-3 flex gap-3">
                    {item.imageUrl && <img src={item.imageUrl} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm leading-tight">{item.name}</p>
                      {item.description && <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{item.description}</p>}
                      <p className="text-sm font-bold mt-1" style={{ color: accent }}>{sym}{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center self-center">
                      {qty > 0 ? (
                        <div className="flex items-center gap-2.5">
                          <button onClick={() => setQty(item.id, -1)} className="w-7 h-7 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center active:scale-95"><Minus className="w-4 h-4" /></button>
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
          <p className="text-center text-gray-400 text-sm mt-16">No items on the menu yet.</p>
        )}
      </main>

      {/* Floating cart button */}
      {cartCount > 0 && !showCart && (
        <div className="fixed bottom-4 inset-x-0 px-4 z-20">
          <button
            onClick={() => setShowCart(true)}
            className="max-w-md mx-auto w-full py-3.5 rounded-2xl text-white font-semibold shadow-lg flex items-center justify-between px-5 active:scale-[0.99] transition"
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
              <h3 className="text-lg font-bold text-gray-900">Your order</h3>
              <button onClick={() => setShowCart(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><X className="w-4 h-4 text-gray-500" /></button>
            </div>

            <div className="space-y-3">
              {cartLines.map(l => (
                <div key={l.item.id} className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{l.item.name}</p>
                    <p className="text-xs text-gray-500">{sym}{l.item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button onClick={() => setQty(l.item.id, -1)} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center"><Minus className="w-4 h-4" /></button>
                    <span className="text-sm font-bold w-4 text-center">{l.qty}</span>
                    <button onClick={() => setQty(l.item.id, +1)} className="w-7 h-7 rounded-full text-white flex items-center justify-center" style={{ background: accent }}><Plus className="w-4 h-4" /></button>
                  </div>
                  <span className="text-sm font-semibold w-16 text-right text-gray-700">{sym}{(l.item.price * l.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 mt-4 pt-4 space-y-3">
              <input
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                placeholder="Your name (optional)"
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none focus:border-orange-300"
              />
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Special requests (optional)"
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none focus:border-orange-300 resize-none"
              />
            </div>

            {error && <p className="text-sm text-red-500 mt-3 flex items-center gap-1.5"><AlertCircle className="w-4 h-4" /> {error}</p>}

            <div className="flex justify-between font-bold text-gray-900 mt-4 mb-3">
              <span>Total</span><span>{sym}{cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={placeOrder}
              disabled={submitting || !table}
              className="w-full py-3.5 rounded-2xl text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
              style={{ background: accent }}
            >
              {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Placing…</> : <>Place order</>}
            </button>
            {!table && <p className="text-xs text-red-500 text-center mt-2">Rescan the QR code on your table to order.</p>}
          </div>
        </div>
      )}
    </div>
  )
}
