"use client"

import { useState, useEffect } from "react"
import { Check, Loader2, X, ArrowRight, Zap, ArrowLeft } from "lucide-react"

interface Props {
  title: string
  price: string
  description: string
  features: string[]
  plan: string
  product: string
  popular?: boolean
  isPhilippines?: boolean
}

type Step = "details" | "payment"
type PaymentMethod = "paypal" | "paymongo"

export default function PricingCard({
  title,
  price,
  description,
  features,
  plan,
  product,
  popular,
  isPhilippines = false,
}: Props) {
  const [showModal, setShowModal]   = useState(false)
  const [step, setStep]             = useState<Step>("details")
  const [name, setName]             = useState("")
  const [email, setEmail]           = useState("")
  const [loading, setLoading]       = useState<PaymentMethod | null>(null)
  const [token, setToken]           = useState<string | null>(null)

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"))
  }, [])

  const checkout = async (method: PaymentMethod) => {
    try {
      setLoading(method)

      let endpoint = ""
      let payload: any = {}

      if (token) {
        endpoint = method === "paypal"
          ? "/api/billing/subscribe/paypal"
          : "/api/billing/subscribe/paymongo"
        payload = { product, plan }
      } else {
        endpoint = method === "paypal"
          ? "/api/billing/newaccount/paypal"
          : "/api/billing/newaccount/paymongo"
        payload = { name, email, product, plan }
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
      if (!redirectUrl) throw new Error("No redirect URL returned")
      window.location.href = redirectUrl
    } catch (err) {
      console.error(err)
      alert("Checkout failed. Please try again.")
    } finally {
      setLoading(null)
    }
  }

  const handleClick = () => {
    if (plan === "FREE") {
      window.location.href = `/register?product=${product}&plan=FREE`
      return
    }
    if (!isPhilippines) {
      // International: go straight to PayPal, no picker needed
      if (token) {
        checkout("paypal")
      } else {
        setStep("details")
        setShowModal(true)
      }
      return
    }
    // PH: show payment picker
    setStep(token ? "payment" : "details")
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setStep("details")
    setName("")
    setEmail("")
  }

  const isFree = plan === "FREE"

  return (
    <>
      {/* ─── CARD ─────────────────────────────────────────── */}
      <div className={`relative group flex flex-col w-full max-w-sm ${popular ? "scale-[1.03]" : ""}`}>

        {popular && (
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-blue-500 to-indigo-600 opacity-100 blur-sm" />
        )}

        <div className={`
          relative flex flex-col flex-1 rounded-3xl overflow-hidden
          transition-all duration-300 group-hover:-translate-y-1
          ${popular
            ? "bg-[#060D1F] border border-blue-500/40 shadow-[0_0_60px_-10px_rgba(59,130,246,0.4)]"
            : "bg-white border border-gray-200 shadow-sm hover:shadow-xl"
          }
        `}>

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
                    ${popular ? "bg-blue-500/15 ring-1 ring-blue-500/30" : "bg-green-50 ring-1 ring-green-200"}
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
              className={`
                w-full py-3.5 rounded-2xl font-semibold text-sm
                flex items-center justify-center gap-2
                transition-all duration-200
                ${popular
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-400 hover:to-indigo-500 shadow-lg shadow-blue-500/30"
                  : isFree
                  ? "bg-gray-900 text-white hover:bg-gray-700"
                  : "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20"
                }
              `}
            >
              {isFree ? (
                <>
                  <Zap className="w-4 h-4" />
                  Get started free
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </>
              ) : (
                <>
                  Get started
                  <ArrowRight className="w-4 h-4" />
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

          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={closeModal}
          />

          <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">

            {/* Header */}
            <div className="bg-[#060D1F] px-8 py-7 border-b border-white/[0.06]">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {step === "payment" && !token && (
                    <button
                      onClick={() => setStep("details")}
                      className="text-gray-500 hover:text-white transition"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {step === "details" ? "Create your account" : "Choose payment method"}
                    </h3>
                    <p className="text-sm text-gray-400 mt-0.5">
                      {step === "details"
                        ? "Enter your details to continue"
                        : `${title} plan · ${price}`}
                    </p>
                  </div>
                </div>
                <button onClick={closeModal} className="text-gray-500 hover:text-white transition mt-0.5">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="bg-white px-8 py-7 space-y-4">

              {/* STEP 1: name + email (new users only) */}
              {step === "details" && (
                <>
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
                    onClick={() => {
                      if (!name || !email) { alert("Name and email are required"); return }
                      if (!isPhilippines) {
                        checkout("paypal")
                      } else {
                        setStep("payment")
                      }
                    }}
                    disabled={loading !== null}
                    className="w-full mt-2 bg-gray-900 hover:bg-gray-700 text-white py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Continue <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </>
              )}

              {/* STEP 2: payment method picker */}
              {step === "payment" && (
                <>
                  {/* PH users see PayMongo first */}
                  {isPhilippines && (
                    <button
                      onClick={() => checkout("paymongo")}
                      disabled={loading !== null}
                      className="w-full flex items-center gap-4 px-5 py-4 border-2 border-gray-200 rounded-2xl hover:border-green-500 hover:bg-green-50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                          <path d="M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z"/>
                        </svg>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-green-700">QR Ph / GCash / Card</p>
                        <p className="text-xs text-gray-400">Philippine payment methods</p>
                      </div>
                      {loading === "paymongo" ? (
                        <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-green-500 transition" />
                      )}
                    </button>
                  )}

                  {/* PayPal */}
                  <button
                    onClick={() => checkout("paypal")}
                    disabled={loading !== null}
                    className="w-full flex items-center gap-4 px-5 py-4 border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#003087] flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c1.379 8.883-5.43 11.61-10.377 11.61H8.23l-1.133 7.184h3.78c.458 0 .848-.332.92-.783l.038-.196.728-4.617.047-.252a.93.93 0 0 1 .919-.784h.578c3.746 0 6.678-1.522 7.534-5.927.358-1.833.173-3.363-.42-4.494z"/>
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">PayPal</p>
                      <p className="text-xs text-gray-400">Pay with your PayPal account</p>
                    </div>
                    {loading === "paypal" ? (
                      <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition" />
                    )}
                  </button>

                </>
              )}

              <div className="flex items-center justify-center gap-4 pt-1">
                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
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
