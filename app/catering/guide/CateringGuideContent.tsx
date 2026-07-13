"use client"

import { useState, useEffect, useRef } from "react"
import InternalLinks from "@/components/InternalLinks"
import {
  BookOpen, ChefHat, Users, CalendarDays, Banknote,
  FlaskConical, UserCheck, BarChart3, CheckCircle2, ChevronRight,
  Menu, X, Clock, Lightbulb, AlertTriangle, Shield, ArrowLeft,
} from "lucide-react"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CATERING&plan=FREE`

const SECTIONS = [
  {
    id: "setup",
    icon: ChefHat,
    title: "1. Set Up Your Catering Account",
    steps: [
      { title: "Create your Smapey account", desc: "Sign up at smapey.com and select Catering Manager as your product. Your private catering workspace is created instantly - no credit card required on the free plan." },
      { title: "Build your package catalog", desc: "Go to Catering → Packages and click Add Package. Enter the package name (e.g. Basic Buffet, Premium Set Menu), a short description, and the price per head. Build out all your standard packages here - you'll attach them to bookings later instead of re-quoting every time." },
      { title: "Set up your supply catalog", desc: "Go to Catering → Supply Catalog and click Add Ingredient. Enter the ingredient name, unit type (KG, Grams, Liters, ML, Pieces, Packs, Boxes), cost per unit, and any notes (e.g. preferred supplier). Use this as your master procurement reference." },
      { title: "Invite your team", desc: "Go to Settings → Team and invite team members by email. Assign Admin or Member roles based on their access level. Team members can log in with their own account and see the live dashboard, bookings, and clients." },
      { title: "Configure your currency symbol", desc: "In Settings → Organization, confirm your currency symbol (₱ for Philippine Peso). This appears on all payment milestones and the revenue dashboard." },
    ],
  },
  {
    id: "clients",
    icon: Users,
    title: "2. Manage Clients",
    steps: [
      { title: "Open the Clients page", desc: "Navigate to Catering → Clients from the sidebar. This is where all your client profiles live - register a client once and reuse their details on every booking." },
      { title: "Add a new client", desc: "Click Add Client. Enter the client's full name, contact number, and email address. Add any notes that are useful to keep on file (e.g. dietary preferences, how they found you). Click Save." },
      { title: "View a client's profile", desc: "Click View on any client to see their full record - contact details, all bookings ever made under their name, and their booking history at a glance. Returning clients are already in the system, so you don't re-enter their information for new bookings." },
      { title: "Edit or delete a client", desc: "Click Edit on any client to update their contact details or notes. Clients with existing bookings can be edited but not deleted - this protects your booking history." },
    ],
  },
  {
    id: "bookings",
    icon: CalendarDays,
    title: "3. Create and Manage Bookings",
    steps: [
      { title: "Open the Bookings page", desc: "Navigate to Catering → Bookings from the sidebar. This is your master event list - every booking is shown here with its status, event date, client, and guest count." },
      { title: "Create a new booking", desc: "Click New Booking. Select or create the client, enter the event date, venue, expected guest count, and set the initial status (usually Pending for new inquiries, Confirmed for locked-in events). Add internal notes if needed. Click Save." },
      { title: "Attach packages to a booking", desc: "Open the booking and scroll to the Packages section. Click Add Package, select from your package catalog, and enter the number of guests for that package. Add multiple packages to one booking if the client is taking both a food package and a drinks package, for example." },
      { title: "Update booking status", desc: "Click Change Status on any booking to move it through the lifecycle: Pending → Confirmed → Completed, or Pending/Confirmed → Cancelled. When you mark a booking as Completed, all outstanding payment milestones are automatically settled - because the event happened and the money is considered collected." },
      { title: "View booking details", desc: "Click View on any booking to see the full record - packages attached, payment milestones, assigned staff, and any notes. This is your one-stop view for everything related to an event." },
    ],
  },
  {
    id: "milestones",
    icon: Banknote,
    title: "4. Payment Milestones",
    steps: [
      { title: "What is a payment milestone?", desc: "A payment milestone is a scheduled partial payment tied to a specific booking. Instead of tracking a single lump sum, you break the booking's total into stages - for example: 30% reservation fee, 50% partial payment two weeks before the event, and the 20% balance on event day." },
      { title: "Add a milestone to a booking", desc: "Open the booking and scroll to the Payment Milestones section. Click Add Milestone. Enter the milestone name (e.g. Reservation Fee), the amount, and the due date. Click Save. Repeat for each payment stage." },
      { title: "Record a payment", desc: "Click Mark as Paid on any pending or overdue milestone. Select the payment method: Cash, GCash, Maya, Card, or Bank Transfer. Enter the date collected. The milestone is marked Paid and the revenue dashboard updates immediately." },
      { title: "Handle partial collections", desc: "If a client pays only part of a milestone, record the amount actually collected. The milestone status will reflect the partial collection and the outstanding balance is tracked automatically. The dashboard will flag this as a pending collection." },
      { title: "Overdue milestones", desc: "Any milestone past its due date that hasn't been fully paid is automatically flagged as Overdue on the dashboard. Check the Overdue Milestones panel regularly - the earlier you follow up, the easier it is to collect." },
    ],
  },
  {
    id: "supply",
    icon: FlaskConical,
    title: "5. Supply Catalog",
    steps: [
      { title: "Open the Supply Catalog", desc: "Navigate to Catering → Supply Catalog from the sidebar. This is your ingredient and materials reference - not an inventory tracker, but a cost reference you can use when planning procurement for each event." },
      { title: "Add an ingredient or supply", desc: "Click Add Ingredient. Enter the name (e.g. Chicken, Jasmine Rice, Cooking Oil), select the unit type (KG, Grams, Liters, ML, Pieces, Packs, Boxes, or Other), and enter the cost per unit. Add a notes field for supplier name, brand preference, or buying notes." },
      { title: "Use the catalog for procurement planning", desc: "Before each event, refer to the supply catalog to estimate what needs to be procured and at what cost. If you're serving a package that requires 2 kg of chicken per 10 guests, you can quickly calculate the total quantity and cost using the catalog's per-unit pricing." },
      { title: "Keep costs updated", desc: "Edit ingredient costs whenever your supplier prices change. Keeping the catalog up to date ensures your procurement estimates stay accurate and your package pricing remains profitable." },
    ],
  },
  {
    id: "staff",
    icon: UserCheck,
    title: "6. Staff Assignment",
    steps: [
      { title: "Assign staff to a booking", desc: "Open any booking and scroll to the Staff section. Click Assign Staff, then select the team members who will be working this event. Each assigned staff member is listed under the booking - so the whole team knows their roster without needing a separate group chat message." },
      { title: "Assign different roles per booking", desc: "You can assign multiple staff to one booking - head cook, servers, coordinator, driver. The system lists each person's name under the booking. There's no role label per assignment, so add notes in the booking's notes field if you need to specify who does what." },
      { title: "Remove a staff assignment", desc: "Click the remove icon next to any staff name on the booking to unassign them. This is useful if a team member becomes unavailable and you need to reassign the slot." },
    ],
  },
  {
    id: "dashboard",
    icon: BarChart3,
    title: "7. Dashboard & Analytics",
    steps: [
      { title: "Open the Dashboard", desc: "Navigate to Catering → Dashboard from the sidebar. This is your home screen - it shows the full financial and operational picture of your catering business at a glance." },
      { title: "Read the stat cards", desc: "The top row shows key numbers: Upcoming Events (confirmed bookings not yet completed), Revenue This Month (collected milestones this month), Payments Collected (total paid-out milestones), and Pending Payments (milestones not yet collected). These update in real time." },
      { title: "Monitor overdue milestones", desc: "The Overdue Milestones panel lists every milestone that is past its due date and unpaid - client name, booking, amount, and days overdue. Use this panel to prioritize your follow-up calls and messages." },
      { title: "Check upcoming events", desc: "The Upcoming Events list shows all confirmed bookings in date order - event date, client name, venue, and guest count. This is your operations forward-look: what events are coming up this week and next, and are they fully prepared." },
      { title: "Review the monthly revenue trend", desc: "The revenue chart shows your monthly collections over time. Use this to spot your peak catering season (typically April–May and October–December for Philippine events), track whether revenue is growing, and set realistic targets for the next quarter." },
    ],
  },
]

const TIPS = [
  { icon: Clock, tip: "Build your full package catalog before taking your first booking. This saves time on every inquiry, just select and attach, no re-quoting." },
  { icon: Lightbulb, tip: "Create payment milestones at the same time you confirm a booking. Don't wait until payment is due, setting them early gives you a clear picture of expected cash flow." },
  { icon: AlertTriangle, tip: "Check the Overdue Milestones panel at least twice a week. Philippine catering clients often pay late, early follow-up before an event is far more effective than chasing after it." },
  { icon: Shield, tip: "Always mark a booking as Completed only after the event is done and you're satisfied. Marking Complete auto-settles all outstanding milestones, so do it only when the event actually happened." },
]

const WORKFLOW = [
  { step: "1st", title: "Review upcoming events", desc: "Check all confirmed bookings for the month - verify packages attached, milestones created, and staff assigned for each event." },
  { step: "2nd", title: "Follow up overdue milestones", desc: "Check the Overdue Milestones panel on the dashboard and contact clients with outstanding balances before their event date." },
  { step: "3rd", title: "Plan procurement", desc: "Use the supply catalog to estimate ingredient quantities and costs for each upcoming event. Place supplier orders with enough lead time." },
  { step: "4th", title: "Record all collections", desc: "As payments come in, mark milestones as paid with the correct method and date. Keep the dashboard accurate in real time." },
  { step: "5th", title: "Mark completed events", desc: "After each event, update the booking status to Completed. This auto-settles any outstanding milestones and feeds the revenue dashboard." },
  { step: "6th", title: "Review revenue trend", desc: "Check the monthly revenue chart to see if collections are growing and identify your busiest months for forward planning." },
]

const accentFor = (i: number) => (i % 2 === 0 ? BLUE : AMBER)
const onAccent = (c: string) => (c === AMBER ? INK : "#fff")

function useFont() {
  useEffect(() => {
    const id = "smapey-pop-fonts"
    if (!document.getElementById(id)) {
      const l = document.createElement("link"); l.id = id; l.rel = "stylesheet"
      l.href = "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap"
      document.head.appendChild(l)
    }
  }, [])
}

function useInView(opts?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null); const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.1, ...opts })
    obs.observe(el); return () => obs.disconnect()
  }, []); return { ref, inView }
}

function Animate({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView()
  return <div ref={ref} className={className} style={{ transitionProperty: "opacity, transform", transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDelay: `${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)" }}>{children}</div>
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { href: "/catering#features", label: "Features" },
    { href: "/catering#how-it-works", label: "How it Works" },
    { href: "/catering#pricing", label: "Pricing" },
    { href: "/catering#faq", label: "FAQ" },
    { href: "/catering/guide", label: "Guide" },
  ]
  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/catering" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey Catering" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey Catering</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (<a key={l.label} href={l.href} className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>{l.label}</a>))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm font-semibold hover:opacity-60 transition-opacity px-2 py-2" style={{ color: INK }}>Sign in</a>
          <a href={REGISTER_URL} className="text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>Try it free</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: INK }}>{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
          {links.map((l) => (<a key={l.label} href={l.href} className="text-sm font-semibold" style={{ color: INK }}>{l.label}</a>))}
          <a href={REGISTER_URL} className="text-sm font-bold px-4 py-2.5 rounded-full border-2 text-center" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>Try it free</a>
        </div>
      )}
    </nav>
  )
}

export default function CateringGuideContent() {
  useFont()
  return (
    <main style={{ fontFamily: display.fontFamily }}>
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden pt-16" style={{ background: CREAM }}>
        <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
          <div className="absolute rounded-[22px] border-2" style={{ top: "28%", right: "-70px", width: 280, height: 78, background: BLUE, borderColor: INK, transform: "rotate(8deg)", boxShadow: "5px 5px 0 rgba(22,22,22,.12)" }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 pt-12 pb-14 text-center">
          <a href="/catering" className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors mb-8 hover:opacity-60" style={{ color: "#54514c" }}>
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Catering Manager
          </a>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-5" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
            <BookOpen className="w-3 h-3" /> User Guide
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-4" style={{ color: INK }}>
            Smapey Catering Manager <span style={{ color: BLUE }}>Guide</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "#54514c" }}>
            Everything you need to set up packages, register clients, create bookings, track payment milestones, manage your supply catalog, assign staff, and read the revenue dashboard, step by step.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold" style={{ color: "#54514c" }}>
            {["10-minute setup", "No training required", "Free plan available"].map((t) => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* TOC */}
      <section className="py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}`, borderBottom: `2px solid ${INK}` }}>
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#9a948b" }}>Jump to section</p>
          <div className="flex flex-wrap gap-2.5">
            {SECTIONS.map((s, i) => {
              const c = accentFor(i)
              return (
                <a key={s.id} href={`#${s.id}`} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border-2 text-xs font-bold transition-transform hover:-translate-y-0.5" style={{ color: INK, borderColor: INK }}>
                  <span className="w-4 h-4 rounded-[5px] border flex items-center justify-center" style={{ background: c, borderColor: INK }}>
                    <s.icon className="w-2.5 h-2.5" style={{ color: onAccent(c) }} />
                  </span>
                  {s.title.replace(/^\d+\.\s/, "")}
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* GUIDE SECTIONS */}
      {SECTIONS.map((section, si) => {
        const c = accentFor(si)
        return (
          <section key={section.id} id={section.id} className="py-16 scroll-mt-20" style={{ background: si % 2 === 0 ? "#fff" : CREAM }}>
            <div className="max-w-4xl mx-auto px-6">
              <Animate>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-[14px] border-2 flex items-center justify-center" style={{ background: c, borderColor: INK }}>
                    <section.icon className="w-6 h-6" style={{ color: onAccent(c) }} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold" style={{ color: INK }}>{section.title}</h2>
                </div>
              </Animate>
              <div className="rounded-[20px] border-2 overflow-hidden" style={{ background: "#fff", borderColor: INK, boxShadow: `6px 6px 0 ${c}` }}>
                {section.steps.map((step, i) => (
                  <div key={step.title} className="flex gap-4 p-5" style={i < section.steps.length - 1 ? { borderBottom: "1px solid rgba(22,22,22,.1)" } : undefined}>
                    <span className="w-7 h-7 rounded-full border-2 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5" style={{ background: c, color: onAccent(c), borderColor: INK }}>{i + 1}</span>
                    <div>
                      <h3 className="font-bold mb-1 text-sm" style={{ color: INK }}>{step.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* TIPS */}
      <section className="py-16" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-4xl mx-auto px-6">
          <Animate className="mb-8">
            <h2 className="text-xl sm:text-2xl font-extrabold" style={{ color: INK }}>Quick Tips</h2>
            <p className="text-sm mt-1" style={{ color: "#54514c" }}>Things that will save you time and headaches once you're up and running.</p>
          </Animate>
          <div className="grid sm:grid-cols-2 gap-4">
            {TIPS.map(({ icon: Icon, tip }, i) => {
              const c = accentFor(i)
              return (
                <Animate key={i} delay={i * 80}>
                  <div className="flex items-start gap-3 rounded-[16px] p-4 border-2 h-full" style={{ background: "#fff", borderColor: INK, boxShadow: `5px 5px 0 ${c}` }}>
                    <div className="w-8 h-8 rounded-[10px] border-2 flex items-center justify-center shrink-0" style={{ background: c, borderColor: INK }}>
                      <Icon className="w-4 h-4" style={{ color: onAccent(c) }} />
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{tip}</p>
                  </div>
                </Animate>
              )
            })}
          </div>
        </div>
      </section>

      {/* MONTHLY WORKFLOW */}
      <section className="py-16" style={{ background: "#fff", borderTop: `2px solid ${INK}` }}>
        <div className="max-w-4xl mx-auto px-6">
          <Animate className="mb-10">
            <h2 className="text-xl sm:text-2xl font-extrabold" style={{ color: INK }}>Monthly workflow at a glance</h2>
            <p className="text-sm mt-1" style={{ color: "#54514c" }}>What to do each month to keep your catering business running smoothly.</p>
          </Animate>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {WORKFLOW.map(({ step, title, desc }, i) => {
              const c = accentFor(i)
              return (
                <Animate key={title} delay={i * 60}>
                  <div className="rounded-[16px] p-5 border-2 h-full" style={{ background: CREAM, borderColor: INK, boxShadow: `5px 5px 0 ${c}` }}>
                    <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: c === AMBER ? "#b06c00" : BLUE }}>{step}</span>
                    <h3 className="font-extrabold text-sm mt-1 mb-1" style={{ color: INK }}>{title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "#54514c" }}>{desc}</p>
                  </div>
                </Animate>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6" style={{ background: "#fff", borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[28px] border-2 p-10 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
            <div>
              <h3 className="text-2xl font-extrabold mb-2" style={{ color: INK }}>Ready to get started?</h3>
              <p className="text-sm font-medium" style={{ color: "#5c4a28" }}>Create your free catering account and have your packages, first client, and first booking set up in under 10 minutes.</p>
            </div>
            <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5 shrink-0" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>
              Start for free <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <InternalLinks cluster="catering" currentPath="/catering/guide" />

      <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Smapey Catering Manager" className="w-6 h-6 rounded-md object-cover" />
            <span className="text-sm font-extrabold" style={{ color: INK }}>Catering Manager by Smapey</span>
          </div>
          <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
