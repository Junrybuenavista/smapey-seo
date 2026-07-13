"use client"

import { useState, useEffect, useRef } from "react"
import { CheckCircle2, Home, Users, CalendarRange, CalendarDays, Banknote, BedDouble, Sparkles, BarChart3, ChevronRight, Menu, X, ArrowLeft, BookOpen } from "lucide-react"
import InternalLinks from "@/components/InternalLinks"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=AIRBNB&plan=FREE`

const SECTIONS = [
  {
    icon: Home,
    title: "1. Add your properties",
    body: [
      "Open Properties in the dashboard and click Add Property. Fill in the name, property type (Apartment, House, Condo, Villa, Room, Studio, or Cabin), address, and description.",
      "Set the number of bedrooms, bathrooms, maximum guests, nightly rate, and cleaning fee. The cleaning fee is automatically added to the reservation total.",
      "Upload a cover photo for each property, your properties display as photo cards with the nightly rate, beds, baths, and max guests at a glance. Toggle properties active or inactive; only active properties can take new bookings.",
    ],
  },
  {
    icon: Users,
    title: "2. Build your guest profiles",
    body: [
      "Open Guests and add each guest's full name, phone number, email, and any notes. Guest profiles are reusable, you create them once and attach them to any number of reservations.",
      "The dashboard automatically tracks each guest's total stays, total amount spent, and last stay date, updated every time a reservation reaches Checked Out status.",
      "Mark guests inactive if they should no longer appear in the reservation guest picker, without losing their history.",
    ],
  },
  {
    icon: CalendarRange,
    title: "3. Create reservations",
    body: [
      "Open Reservations and click New Reservation. Select a property and a guest, then set the check-in and check-out date. The number of nights, nightly cost, cleaning fee, and total are calculated automatically.",
      "Add extra charges if needed (airport pick-up, early check-in fee, etc.) and enter a deposit amount. Tick Deposit Paid when the guest has settled it.",
      "Set the booking source, Airbnb, Booking.com, Agoda, Direct, Facebook, Referral, or Other, and the number of guests. The system checks for date conflicts on that property before saving.",
    ],
  },
  {
    icon: CalendarDays,
    title: "4. See everything on the calendar",
    body: [
      "Open Calendar to see the whole month for every property at once, each property is a row, each day a column, and every stay appears as a color-coded bar: blue for Booked, amber for Checked In, green for Checked Out.",
      "Click any empty day to create a booking for that property with the date already filled in, the fastest way to take a booking over the phone or from a Facebook message.",
      "Click a reservation bar to see the guest, dates, and total, and check them in or out right from the calendar. Use the arrows to move between months; Today jumps you back.",
    ],
  },
  {
    icon: BedDouble,
    title: "5. Manage check-ins and check-outs",
    body: [
      "When a guest arrives, open the reservation and click Check In. The status moves from Booked → Checked In.",
      "When the guest leaves, click Check Out. Status moves to Checked Out and the guest's total stay count and spend are updated immediately.",
      "If a booking falls through, use Cancel or No Show. Cancelled and No-Show reservations are excluded from revenue totals but kept in history.",
    ],
  },
  {
    icon: Banknote,
    title: "6. Record payments as they come in",
    body: [
      "Every reservation has a payment ledger. Click Payments on any booking to see the total, what's been paid, and the remaining balance.",
      "Record each payment with its amount, method (Cash, GCash, Maya, or Bank), date, and an optional note, for example a ₱1,000 GCash deposit today and the cash balance at check-in.",
      "The payment status updates itself: Unpaid until the first payment, Partial while a balance remains, and Paid the moment the ledger covers the total. No more guessing who still owes you.",
    ],
  },
  {
    icon: Sparkles,
    title: "7. Track cleaning between stays",
    body: [
      "After a guest checks out, the property is available for the next booking. Use the Staff Notes field on the reservation to log cleaning instructions or turnaround requirements.",
      "Filter the reservation list by Checked Out status to see which properties need a turnover. Sort by checkout date to prioritize upcoming same-day or next-day arrivals.",
      "The dashboard shows upcoming check-ins so you always know which properties need to be guest-ready within the next 24–48 hours.",
    ],
  },
  {
    icon: BarChart3,
    title: "8. Monitor revenue and occupancy",
    body: [
      "The dashboard shows monthly revenue, occupancy rate, total reservations, average nightly rate, and pending check-ins, all updated in real time.",
      "Revenue totals pull from Checked Out and Checked In reservations with Paid or Partial payment status, giving you an accurate picture of earned income.",
      "Use the source tracking to see whether Airbnb, Booking.com, Direct, or another channel is generating the most revenue, and decide where to focus your marketing.",
    ],
  },
]

function useFont() {
  useEffect(() => {
    const id = "smapey-pop-fonts"
    if (!document.getElementById(id)) {
      const l = document.createElement("link")
      l.id = id; l.rel = "stylesheet"
      l.href = "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap"
      document.head.appendChild(l)
    }
  }, [])
}

function useInView() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } }, { threshold: 0.15 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, inView }
}

function Animate({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className={className} style={{ transitionProperty: "opacity, transform", transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDelay: `${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)" }}>
      {children}
    </div>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { href: "/airbnb#features", label: "Features" },
    { href: "/airbnb#how-it-works", label: "How it Works" },
    { href: "/airbnb#pricing", label: "Pricing" },
    { href: "/airbnb#faq", label: "FAQ" },
    { href: "/airbnb/guide", label: "Guide" },
  ]
  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/airbnb" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey Airbnb</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (<a key={l.label} href={l.href} className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>{l.label}</a>))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm font-semibold hover:opacity-60 transition-opacity px-2 py-2" style={{ color: INK }}>Sign in</a>
          <a href={REGISTER_URL} className="text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>Get started</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: INK }}>{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
          {links.map((l) => (<a key={l.label} href={l.href} className="text-sm font-semibold" style={{ color: INK }}>{l.label}</a>))}
          <a href={REGISTER_URL} className="text-sm font-bold px-4 py-2.5 rounded-full border-2 text-center" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>Get started</a>
        </div>
      )}
    </nav>
  )
}

export default function GuideContent() {
  useFont()
  return (
    <main style={{ fontFamily: display.fontFamily }}>
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden pt-16" style={{ background: CREAM }}>
        <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
          <div className="absolute rounded-[22px] border-2" style={{ top: "28%", right: "-70px", width: 280, height: 78, background: BLUE, borderColor: INK, transform: "rotate(8deg)", boxShadow: "5px 5px 0 rgba(22,22,22,.12)" }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 pt-12 pb-14 text-center">
          <a href="/airbnb" className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors mb-8 hover:opacity-60" style={{ color: "#54514c" }}>
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Airbnb / Rentals
          </a>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-5" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
            <BookOpen className="w-3 h-3" /> User Guide
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>
            How to manage your Airbnb with Smapey
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#54514c" }}>
            A step-by-step walkthrough covering properties, guests, reservations, the availability calendar, check-ins, payments, cleaning coordination, and revenue analytics.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold mt-8" style={{ color: "#54514c" }}>
            {["5-minute setup", "No training required", "Free plan available"].map((t) => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />{t}</span>
            ))}
          </div>
        </div>
      </section>
      {/* JUMP TO SECTION */}
      <section className="py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}`, borderBottom: `2px solid ${INK}` }}>
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#9a948b" }}>Jump to section</p>
          <div className="flex flex-wrap gap-2.5">
            {SECTIONS.map(({ icon: Icon, title }, i) => {
              const c = i % 2 === 0 ? BLUE : AMBER
              return (
                <a key={i} href={`#s${i}`} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border-2 text-xs font-bold transition-transform hover:-translate-y-0.5" style={{ color: INK, borderColor: INK }}>
                  <span className="w-4 h-4 rounded-[5px] border flex items-center justify-center" style={{ background: c, borderColor: INK }}>
                    <Icon className="w-2.5 h-2.5" style={{ color: c === AMBER ? INK : "#fff" }} />
                  </span>
                  {title.replace(/^\d+\.\s*/, "")}
                </a>
              )
            })}
          </div>
        </div>
      </section>


      {/* SECTIONS */}
      <section className="py-16" style={{ background: CREAM }}>
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          {SECTIONS.map(({ icon: Icon, title, body }, idx) => {
            const c = idx % 2 === 0 ? BLUE : AMBER
            return (
              <Animate key={title}>
                <div id={`s${idx}`} className="rounded-[20px] border-2 overflow-hidden scroll-mt-24" style={{ background: "#fff", borderColor: INK, boxShadow: `6px 6px 0 ${c}` }}>
                  <div className="flex items-center gap-4 px-6 py-5" style={{ borderBottom: `2px solid ${INK}`, background: CREAM }}>
                    <div className="w-10 h-10 rounded-[12px] border-2 flex items-center justify-center shrink-0" style={{ background: c, borderColor: INK }}>
                      <Icon className="w-5 h-5" style={{ color: c === AMBER ? INK : "#fff" }} />
                    </div>
                    <h2 className="text-lg font-extrabold" style={{ color: INK }}>{title}</h2>
                  </div>
                  <ul className="px-6 py-5 space-y-3">
                    {body.map((line, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: "#54514c" }}>
                        <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" style={{ background: c }} />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </Animate>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[28px] border-2 p-10 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
            <div>
              <h3 className="text-2xl font-extrabold mb-2" style={{ color: INK }}>Ready to get started?</h3>
              <p className="text-sm font-medium" style={{ color: "#5c4a28" }}>Free plan, 2 properties, 10 reservations/month. No credit card required.</p>
            </div>
            <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5 shrink-0" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>
              Start free <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <InternalLinks cluster="airbnb" currentPath="/airbnb/guide" />

      <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" />
            <span className="text-sm font-extrabold" style={{ color: INK }}>Airbnb / Rentals by Smapey</span>
          </div>
          <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
