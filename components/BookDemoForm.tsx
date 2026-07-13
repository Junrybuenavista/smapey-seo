"use client"

import { useState } from "react"
import { CalendarCheck, Loader2, CheckCircle2, ChevronRight } from "lucide-react"

const PRODUCT_LABELS: Record<string, string> = {
  RESTAURANT:     "Food Ordering Manager",
  GYM:            "Gym Management",
  SALON:          "Salon Manager",
  LAUNDRY:        "Laundry Management",
  AIRBNB:         "Airbnb / Short-term Rental",
  BOOKING:        "Booking & Appointments",
  CAR_RENTAL:     "Car Rental",
  LENDING:        "Lending Manager",
  STORE:          "Store Manager",
  CLINIC:         "Clinic Manager",
  VET_CLINIC:     "Vet Clinic Manager",
  BOARDING_HOUSE: "Boarding House Manager",
  CATERING:       "Catering Manager",
  WATER_REFILLING:"Water Refilling",
  SCHOOL_DESK:    "School Desk",
  MASSAGE:        "Massage Manager",
  ESSAY:          "Essay Feedback",
  INVOICE:        "Invoice Manager",
}

type Theme = {
  section:  string   // section background
  badge:    string   // badge pill
  button:   string   // submit button
  inputFocus: string // input focus ring + border
  icon:     string   // success checkmark
}

const THEMES: Record<string, Theme> = {
  RESTAURANT:     { section: "bg-orange-50/50",   badge: "bg-orange-50 text-orange-600 border border-orange-200",    button: "bg-orange-500 hover:bg-orange-400 shadow-orange-500/25",   inputFocus: "focus:ring-orange-400/40 focus:border-orange-400", icon: "text-orange-500"  },
  SALON:          { section: "bg-pink-50/50",      badge: "bg-pink-50 text-pink-600 border border-pink-200",           button: "bg-pink-600 hover:bg-pink-500 shadow-pink-500/20",          inputFocus: "focus:ring-pink-400/40 focus:border-pink-400",     icon: "text-pink-500"    },
  LAUNDRY:        { section: "bg-sky-50/50",       badge: "bg-sky-50 text-sky-600 border border-sky-200",              button: "bg-sky-600 hover:bg-sky-500 shadow-sky-500/20",             inputFocus: "focus:ring-sky-400/40 focus:border-sky-400",       icon: "text-sky-500"     },
  AIRBNB:         { section: "bg-sky-50/50",       badge: "bg-sky-50 text-sky-600 border border-sky-200",              button: "bg-sky-600 hover:bg-sky-500 shadow-sky-500/20",             inputFocus: "focus:ring-sky-400/40 focus:border-sky-400",       icon: "text-sky-500"     },
  BOOKING:        { section: "bg-teal-50/50",      badge: "bg-teal-50 text-teal-600 border border-teal-200",           button: "bg-teal-600 hover:bg-teal-500 shadow-teal-500/20",          inputFocus: "focus:ring-teal-400/40 focus:border-teal-400",     icon: "text-teal-500"    },
  CAR_RENTAL:     { section: "bg-orange-50/50",   badge: "bg-orange-50 text-orange-600 border border-orange-200",    button: "bg-orange-500 hover:bg-orange-400 shadow-orange-500/25",   inputFocus: "focus:ring-orange-400/40 focus:border-orange-400", icon: "text-orange-500"  },
  LENDING:        { section: "bg-slate-100/60",    badge: "bg-slate-100 text-slate-600 border border-slate-300",       button: "bg-slate-700 hover:bg-slate-600 shadow-slate-500/20",       inputFocus: "focus:ring-slate-400/40 focus:border-slate-400",   icon: "text-slate-500"   },
  STORE:          { section: "bg-violet-50/50",    badge: "bg-violet-50 text-violet-600 border border-violet-200",    button: "bg-violet-600 hover:bg-violet-500 shadow-violet-500/20",   inputFocus: "focus:ring-violet-400/40 focus:border-violet-400", icon: "text-violet-500"  },
  CLINIC:         { section: "bg-blue-50/50",      badge: "bg-blue-50 text-blue-600 border border-blue-200",           button: "bg-blue-600 hover:bg-blue-500 shadow-blue-500/25",          inputFocus: "focus:ring-blue-400/40 focus:border-blue-400",     icon: "text-blue-500"    },
  VET_CLINIC:     { section: "bg-emerald-50/50",   badge: "bg-emerald-50 text-emerald-600 border border-emerald-200", button: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20", inputFocus: "focus:ring-emerald-400/40 focus:border-emerald-400",icon: "text-emerald-500" },
  BOARDING_HOUSE: { section: "bg-orange-50/50",   badge: "bg-orange-50 text-orange-600 border border-orange-200",    button: "bg-orange-500 hover:bg-orange-400 shadow-orange-500/25",   inputFocus: "focus:ring-orange-400/40 focus:border-orange-400", icon: "text-orange-500"  },
  CATERING:       { section: "bg-rose-50/50",      badge: "bg-rose-50 text-rose-600 border border-rose-200",           button: "bg-rose-600 hover:bg-rose-500 shadow-rose-500/20",          inputFocus: "focus:ring-rose-400/40 focus:border-rose-400",     icon: "text-rose-500"    },
  WATER_REFILLING:{ section: "bg-cyan-50/50",      badge: "bg-cyan-50 text-cyan-600 border border-cyan-200",           button: "bg-cyan-600 hover:bg-cyan-500 shadow-cyan-500/20",          inputFocus: "focus:ring-cyan-400/40 focus:border-cyan-400",     icon: "text-cyan-500"    },
  SCHOOL_DESK:    { section: "bg-indigo-50/50",    badge: "bg-indigo-50 text-indigo-600 border border-indigo-200",    button: "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20",   inputFocus: "focus:ring-indigo-400/40 focus:border-indigo-400", icon: "text-indigo-500"  },
  MASSAGE:        { section: "bg-emerald-50/50",   badge: "bg-emerald-50 text-emerald-600 border border-emerald-200", button: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20", inputFocus: "focus:ring-emerald-400/40 focus:border-emerald-400",icon: "text-emerald-500" },
  ESSAY:          { section: "bg-blue-50/50",      badge: "bg-blue-50 text-blue-600 border border-blue-200",           button: "bg-blue-600 hover:bg-blue-500 shadow-blue-500/25",          inputFocus: "focus:ring-blue-400/40 focus:border-blue-400",     icon: "text-blue-500"    },
  INVOICE:        { section: "bg-blue-50/50",      badge: "bg-blue-50 text-blue-600 border border-blue-200",           button: "bg-blue-600 hover:bg-blue-500 shadow-blue-500/25",          inputFocus: "focus:ring-blue-400/40 focus:border-blue-400",     icon: "text-blue-500"    },
}

const DEFAULT_THEME: Theme = {
  section:    "bg-slate-50",
  badge:      "bg-blue-50 text-blue-600 border border-blue-200",
  button:     "bg-blue-600 hover:bg-blue-500 shadow-blue-500/25",
  inputFocus: "focus:ring-blue-400/40 focus:border-blue-400",
  icon:       "text-blue-500",
}

// ── Layered Pop tokens (GYM) ──
const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const popDisplay = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

export default function BookDemoForm({ product }: { product: string }) {
  const [name, setName]       = useState("")
  const [email, setEmail]     = useState("")
  const [phone, setPhone]     = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone]       = useState(false)
  const [error, setError]     = useState("")

  const theme        = THEMES[product] ?? DEFAULT_THEME
  const productLabel = PRODUCT_LABELS[product] || product
  // Use the gym "Layered Pop" design on every product page
  const isPop        = true

  const inputClass = `w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 ${theme.inputFocus} transition`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/demo-bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, product }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || "Something went wrong")
      }
      setDone(true)
    } catch (err: any) {
      setError(err.message || "Failed to submit. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // ─────────────────────────────────────────────────────────────
  // LAYERED POP VARIANT (GYM)
  // ─────────────────────────────────────────────────────────────
  if (isPop) {
    const popInput = "w-full px-4 py-3 rounded-xl border-2 text-sm focus:outline-none transition"
    const popInputStyle = { borderColor: INK, color: INK, background: "#fff" } as React.CSSProperties

    const fields: { label: string; type: string; ph: string; val: string; set: (v: string) => void }[] = [
      { label: "Full Name", type: "text", ph: "Juan dela Cruz", val: name, set: setName },
      { label: "Email Address", type: "email", ph: "you@example.com", val: email, set: setEmail },
      { label: "Phone Number", type: "tel", ph: "+63 912 345 6789", val: phone, set: setPhone },
    ]

    return (
      <section id="book-demo" className="relative py-24 px-6 overflow-hidden" style={{ background: CREAM, fontFamily: popDisplay.fontFamily }}>
        {/* playful layered-bar accents */}
        <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
          <div className="absolute rounded-[22px] border-2" style={{ top: "12%", left: "-70px", width: 260, height: 76, background: AMBER, borderColor: INK, transform: "rotate(-9deg)" }} />
          <div className="absolute rounded-[22px] border-2" style={{ bottom: "12%", right: "-80px", width: 280, height: 80, background: BLUE, borderColor: INK, transform: "rotate(8deg)", boxShadow: "5px 5px 0 rgba(22,22,22,.12)" }} />
        </div>

        <div className="relative max-w-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full bg-white border-2 mb-5" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
              <CalendarCheck className="w-3.5 h-3.5" style={{ color: BLUE }} />
              Book a Free Demo
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: INK }}>
              See {productLabel} in action
            </h2>
            <p className="text-base mt-3 leading-relaxed" style={{ color: "#54514c" }}>
              Leave your details and we&apos;ll walk you through the product personally, no pressure, no commitment.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-[24px] border-2 p-8" style={{ background: "#fff", borderColor: INK, boxShadow: `10px 10px 0 ${AMBER}` }}>
            {done ? (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center" style={{ background: "#e9f9f0", borderColor: INK }}>
                  <CheckCircle2 className="w-8 h-8" style={{ color: "#0d9f6e" }} />
                </div>
                <p className="text-xl font-extrabold" style={{ color: INK }}>You&apos;re all set!</p>
                <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>
                  We&apos;ll reach out to you shortly to schedule your demo for{" "}
                  <span className="font-bold" style={{ color: INK }}>{productLabel}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {fields.map((f) => (
                  <div key={f.label} className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold" style={{ color: INK }}>{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.ph}
                      value={f.val}
                      onChange={(e) => f.set(e.target.value)}
                      required
                      className={popInput}
                      style={popInputStyle}
                    />
                  </div>
                ))}

                {error && (
                  <p className="text-sm font-semibold rounded-xl px-4 py-2.5 border-2" style={{ color: "#c01a3e", background: "#fdecec", borderColor: "#e11d48" }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-1 disabled:opacity-60 font-bold py-3.5 rounded-full border-2 transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm"
                  style={{ ...popDisplay, background: AMBER, color: INK, borderColor: INK, boxShadow: `4px 4px 0 ${INK}` }}
                >
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</> : <>Book My Free Demo <ChevronRight className="w-4 h-4" /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    )
  }

  // ─────────────────────────────────────────────────────────────
  // DEFAULT VARIANT (all other products, unchanged)
  // ─────────────────────────────────────────────────────────────
  return (
    <section id="book-demo" className={`${theme.section} py-16 px-6`}>
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 ${theme.badge}`}>
            <CalendarCheck className="w-3.5 h-3.5" />
            Book a Free Demo
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            See {productLabel} in action
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Leave your details and we&apos;ll walk you through the product personally, no pressure, no commitment.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          {done ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <CheckCircle2 className={`w-12 h-12 ${theme.icon}`} />
              <p className="text-lg font-semibold text-slate-800">You&apos;re all set!</p>
              <p className="text-sm text-slate-500">
                We&apos;ll reach out to you shortly to schedule your demo for{" "}
                <span className="font-medium text-slate-700">{productLabel}</span>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-600">Full Name</label>
                <input
                  type="text"
                  placeholder="Juan dela Cruz"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-600">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-600">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+63 912 345 6789"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full mt-1 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition shadow-lg flex items-center justify-center gap-2 text-sm ${theme.button}`}
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Submitting…" : "Book My Free Demo"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
