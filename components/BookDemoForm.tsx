"use client"

import { useState } from "react"
import { CalendarCheck, Loader2, CheckCircle2 } from "lucide-react"

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
  GYM:            { section: "bg-amber-50/50",     badge: "bg-amber-50 text-amber-600 border border-amber-200",        button: "bg-amber-500 hover:bg-amber-400 shadow-amber-500/25",       inputFocus: "focus:ring-amber-400/40 focus:border-amber-400",   icon: "text-amber-500"   },
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

export default function BookDemoForm({ product }: { product: string }) {
  const [name, setName]       = useState("")
  const [email, setEmail]     = useState("")
  const [phone, setPhone]     = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone]       = useState(false)
  const [error, setError]     = useState("")

  const theme        = THEMES[product] ?? DEFAULT_THEME
  const productLabel = PRODUCT_LABELS[product] || product

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
            Leave your details and we&apos;ll walk you through the product personally — no pressure, no commitment.
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
