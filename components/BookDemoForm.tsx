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

export default function BookDemoForm({ product }: { product: string }) {
  const [name, setName]     = useState("")
  const [email, setEmail]   = useState("")
  const [phone, setPhone]   = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone]     = useState(false)
  const [error, setError]   = useState("")

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

  const productLabel = PRODUCT_LABELS[product] || product

  return (
    <section id="book-demo" className="bg-slate-50 py-16 px-6">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
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
              <CheckCircle2 className="w-12 h-12 text-green-500" />
              <p className="text-lg font-semibold text-slate-800">You&apos;re all set!</p>
              <p className="text-sm text-slate-500">
                We&apos;ll reach out to you shortly to schedule your demo for <span className="font-medium text-slate-700">{productLabel}</span>.
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition"
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
                className="w-full mt-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition shadow-sm flex items-center justify-center gap-2 text-sm"
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
