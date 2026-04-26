"use client"

import { useState } from "react"
import { Check, CreditCard, Loader2, X, ArrowRight, Zap } from "lucide-react"

interface Props {
  title: string
  price: string
  description: string
  features: string[]
  plan: string
  product: string
  popular?: boolean
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  plan,
  product,
  popular,
}: Props) {
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null

  const checkout = async () => {
    try {
      setLoading(true)
      let endpoint = ""
      let payload: any = {}

      if (token) {
        endpoint = "/api/billing/subscribe/paypal"
        payload = { product, plan }
      } else {
        if (!name || !email) {
          alert("Name and email required")
          return
        }
        endpoint = "/api/billing/newaccount/paypal"
        payload = { name, email, product: "INVOICE", plan }
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      const redirectUrl = data.approveUrl || data.checkoutUrl
      if (!redirectUrl) throw new Error("No URL")
      window.location.href = redirectUrl
    } catch (err) {
      console.error(err)
      alert("Checkout failed")
    } finally {
      setLoading(false)
    }
  }

  const handleClick = () => {
    if (plan === "FREE") {
      window.location.href = `/register?product=${product}&plan=FREE`
      return
    }
    if (token) {
      checkout()
      return
    }
    setShowModal(true)
  }

  const isFree = plan === "FREE"

  return (
    <>
      {/* ─── CARD ─────────────────────────────────────────── */}
      <div className={`relative group flex flex-col w-full max-w-sm ${popular ? "scale-[1.03]" : ""}`}>

        {/* Ambient glow — popular only */}
        {popular && (
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-blue-500 to-indigo-600 opacity-100 blur-sm" />
        )}

        <div
          className={`
            relative flex flex-col flex-1 rounded-3xl overflow-hidden
            transition-all duration-300 group-hover:-translate-y-1
            ${popular
              ? "bg-[#060D1F] border border-blue-500/40 shadow-[0_0_60px_-10px_rgba(59,130,246,0.4)]"
              : "bg-white border border-gray-200 shadow-sm hover:shadow-xl"
            }
          `}
        >

          {/* POPULAR BADGE */}
          {popular && (
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          )}

          {/* TOP SECTION */}
          <div className={`px-8 pt-8 pb-6 ${popular ? "border-b border-white/[0.06]" : "border-b border-gray-100"}`}>

            {popular && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.12em] uppercase text-blue-400 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Most Popular
              </span>
            )}

            <h2 className={`text-lg font-semibold mb-1 ${popular ? "text-white" : "text-gray-900"}`}>
              {title}
            </h2>

            <p className={`text-sm leading-relaxed mb-6 ${popular ? "text-gray-400" : "text-gray-500"}`}>
              {description}
            </p>

            {/* PRICE */}
            <div className="flex items-end gap-2">
              <span className={`text-5xl font-extrabold tracking-tight leading-none ${popular ? "text-white" : "text-gray-900"}`}>
                {price}
              </span>
              {!isFree && (
                <div className="flex flex-col mb-1.5">
                  <span className={`text-xs leading-tight ${popular ? "text-gray-400" : "text-gray-400"}`}>per</span>
                  <span className={`text-xs font-medium leading-tight ${popular ? "text-gray-300" : "text-gray-500"}`}>month</span>
                </div>
              )}
            </div>

            {isFree && (
              <p className={`text-xs mt-1.5 ${popular ? "text-gray-500" : "text-gray-400"}`}>
                No credit card required
              </p>
            )}

          </div>

          {/* FEATURES */}
          <div className="px-8 py-6 flex-1">
            <p className={`text-[11px] font-semibold uppercase tracking-widest mb-4 ${popular ? "text-gray-500" : "text-gray-400"}`}>
              What&apos;s included
            </p>

            <ul className="space-y-3.5">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`
                    mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center
                    ${popular
                      ? "bg-blue-500/15 ring-1 ring-blue-500/30"
                      : "bg-green-50 ring-1 ring-green-200"
                    }
                  `}>
                    <Check className={`w-3 h-3 ${popular ? "text-blue-400" : "text-green-600"}`} strokeWidth={2.5} />
                  </span>
                  <span className={`text-sm leading-relaxed ${popular ? "text-gray-300" : "text-gray-600"}`}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="px-8 pb-8">
            <button
              onClick={handleClick}
              disabled={loading}
              className={`
                relative w-full py-3.5 rounded-2xl font-semibold text-sm
                flex items-center justify-center gap-2
                transition-all duration-200 overflow-hidden
                ${popular
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-400 hover:to-indigo-500 shadow-lg shadow-blue-500/30"
                  : isFree
                  ? "bg-gray-900 text-white hover:bg-gray-700"
                  : "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20"
                }
              `}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Redirecting…
                </>
              ) : isFree ? (
                <>
                  <Zap className="w-4 h-4" />
                  Get started free
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  Continue with PayPal
                </>
              )}
            </button>

            {!isFree && (
              <p className={`text-center text-[11px] mt-3 ${popular ? "text-gray-600" : "text-gray-400"}`}>
                Secure checkout · Cancel anytime
              </p>
            )}
          </div>

        </div>
      </div>

      {/* ─── MODAL ────────────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setShowModal(false)}
          />

          {/* Sheet */}
          <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">

            {/* Dark header */}
            <div className="bg-[#060D1F] px-8 py-7 border-b border-white/[0.06]">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">Create your account</h3>
                  <p className="text-sm text-gray-400 mt-1">Enter your details to continue to checkout</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-white transition mt-0.5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="bg-white px-8 py-7 space-y-4">

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Full name</label>
                <input
                  type="text"
                  placeholder="John Smith"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email address</label>
                <input
                  type="email"
                  placeholder="john@company.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                onClick={checkout}
                disabled={loading}
                className="w-full mt-2 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Redirecting…
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    Continue to PayPal
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 pt-1">
                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                  <svg className="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                  Secure checkout
                </span>
                <span className="text-gray-200">·</span>
                <span className="text-[11px] text-gray-400">Cancel anytime</span>
                <span className="text-gray-200">·</span>
                <span className="text-[11px] text-gray-400">No hidden fees</span>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}
