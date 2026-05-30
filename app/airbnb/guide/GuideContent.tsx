"use client"

import Link from "next/link"
import { Home, Users, CalendarRange, BedDouble, Sparkles, BarChart3, ChevronRight } from "lucide-react"

const SECTIONS = [
  {
    icon: Home,
    title: "1. Add your properties",
    body: [
      "Open Properties in the dashboard and click Add Property. Fill in the name, property type (Apartment, House, Condo, Villa, Room, Studio, or Cabin), address, and description.",
      "Set the number of bedrooms, bathrooms, maximum guests, nightly rate, and cleaning fee. The cleaning fee is automatically added to the reservation total.",
      "Upload a cover photo for each property. Toggle properties active or inactive — only active properties appear in the reservation form.",
    ],
  },
  {
    icon: Users,
    title: "2. Build your guest profiles",
    body: [
      "Open Guests and add each guest's full name, phone number, email, and any notes. Guest profiles are reusable — you create them once and attach them to any number of reservations.",
      "The dashboard automatically tracks each guest's total stays, total amount spent, and last stay date — updated every time a reservation reaches Checked Out status.",
      "Mark guests inactive if they should no longer appear in the reservation guest picker, without losing their history.",
    ],
  },
  {
    icon: CalendarRange,
    title: "3. Create reservations",
    body: [
      "Open Reservations and click New Reservation. Select a property and a guest, then set the check-in and check-out date. The number of nights, nightly cost, cleaning fee, and total are calculated automatically.",
      "Add extra charges if needed (airport pick-up, early check-in fee, etc.) and enter a deposit amount. Tick Deposit Paid when the guest has settled it.",
      "Set the booking source — Airbnb, Booking.com, Agoda, Direct, Facebook, Referral, or Other — and the number of guests. The system checks for date conflicts on that property before saving.",
    ],
  },
  {
    icon: BedDouble,
    title: "4. Manage check-ins and check-outs",
    body: [
      "When a guest arrives, open the reservation and click Check In. The status moves from Booked → Checked In.",
      "When the guest leaves, click Check Out. Status moves to Checked Out and the guest's total stay count and spend are updated immediately.",
      "If a booking falls through, use Cancel or No Show. Cancelled and No-Show reservations are excluded from revenue totals but kept in history.",
    ],
  },
  {
    icon: Sparkles,
    title: "5. Track cleaning between stays",
    body: [
      "After a guest checks out, the property is available for the next booking. Use the Staff Notes field on the reservation to log cleaning instructions or turnaround requirements.",
      "Filter the reservation list by Checked Out status to see which properties need a turnover. Sort by checkout date to prioritize upcoming same-day or next-day arrivals.",
      "The dashboard shows upcoming check-ins so you always know which properties need to be guest-ready within the next 24–48 hours.",
    ],
  },
  {
    icon: BarChart3,
    title: "6. Monitor revenue and occupancy",
    body: [
      "The dashboard shows monthly revenue, occupancy rate, total reservations, average nightly rate, and pending check-ins — all updated in real time.",
      "Revenue totals pull from Checked Out and Checked In reservations with Paid or Partial payment status, giving you an accurate picture of earned income.",
      "Use the source tracking to see whether Airbnb, Booking.com, Direct, or another channel is generating the most revenue — and decide where to focus your marketing.",
    ],
  },
]

export default function GuideContent() {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="bg-gradient-to-br from-sky-50 via-white to-blue-50 border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 mb-5">
            <a href="/airbnb" className="text-sm text-sky-600 hover:text-sky-700 font-medium transition-colors">Airbnb / Rentals</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-sm text-slate-500">Guide</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-400 flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-sky-600 uppercase tracking-wider">Complete Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
            How to manage your Airbnb with Smapey
          </h1>
          <p className="text-slate-500 leading-relaxed text-lg mb-8">
            A step-by-step walkthrough covering properties, guests, reservations, check-ins, cleaning coordination, and revenue analytics.
          </p>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=AIRBNB&plan=FREE`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm transition-all shadow-lg shadow-sky-500/20">
            Start free <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* GUIDE SECTIONS */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-14">
          {SECTIONS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col sm:flex-row gap-6">
              <div className="shrink-0">
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-sky-600" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-4">{title}</h2>
                <ul className="space-y-3">
                  {body.map((line, i) => (
                    <li key={i} className="flex gap-3 text-slate-600 leading-relaxed text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 mt-2" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-sky-50 to-blue-50 border-t border-slate-100 py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-extrabold text-slate-800 mb-3">Ready to get started?</h2>
          <p className="text-slate-500 mb-6 text-sm">Free plan — 3 properties, 20 reservations/month. No credit card required.</p>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=AIRBNB&plan=FREE`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm transition-all shadow-lg shadow-sky-500/20">
            Start free <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-800 border-t border-slate-700 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" />
            <span className="text-white/60 text-sm font-semibold">Airbnb / Rentals by Smapey</span>
          </div>
          <div className="flex items-center gap-5 text-white/40 text-xs">
            <a href="/airbnb" className="hover:text-white/70 transition">Home</a>
            <a href="/privacy-policy" className="hover:text-white/70 transition">Privacy</a>
            <a href="/terms-and-conditions" className="hover:text-white/70 transition">Terms</a>
          </div>
          <p className="text-white/20 text-xs">© {new Date().getFullYear()} Smapey</p>
        </div>
      </footer>

    </div>
  )
}
