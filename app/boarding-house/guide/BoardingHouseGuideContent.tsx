"use client"

import { useState, useEffect, useRef } from "react"
import InternalLinks from "@/components/InternalLinks"
import {
  BookOpen, Building2, Users, BedDouble, CheckCircle2, ChevronRight,
  Menu, X, Banknote, Zap, BarChart3, Clock, Lightbulb, Shield, AlertTriangle, ArrowLeft,
  Wrench,
} from "lucide-react"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOARDING_HOUSE&plan=FREE`

const SECTIONS = [
  {
    id: "setup",
    icon: Building2,
    title: "1. Set Up Your Boarding House",
    steps: [
      { title: "Create your Smapey account", desc: "Sign up at smapey.com and select Boarding House Manager as your product. Your private workspace is created instantly — no credit card required on the free plan." },
      { title: "Add your rooms", desc: "Go to the Rooms page and click Add Room. Enter the room name (e.g. Room 101), the type — Bedspace, Shared Room, or Private Room — the floor, and the monthly rate. Each room appears as a card showing who's inside and which slots are free." },
      { title: "Add beds to bedspace rooms", desc: "On a Bedspace room card, click Add Bed to name each bed (e.g. Lower A, Upper A) and optionally set a different rate per bed — handy when lower decks cost more. A bed without its own rate uses the room's default. The room's capacity is simply its number of beds." },
      { title: "Invite your team", desc: "Go to Settings → Team and invite a co-owner or assistant by email. They can log in with their own account and access the same live system. Assign Admin or Member roles based on their level of access." },
      { title: "Configure your currency symbol", desc: "In Settings → Organization, confirm your currency symbol (₱ for Philippine Peso). This appears on all bills and the revenue dashboard." },
    ],
  },
  {
    id: "tenants",
    icon: Users,
    title: "2. Register Tenants",
    steps: [
      { title: "Open the Tenants page", desc: "Navigate to Boarding House → Tenants from the sidebar. This is where all your tenant records live." },
      { title: "Click Add Tenant", desc: "Enter the tenant's full name, contact number, and email address. Add an emergency contact name and phone number — important if you ever need to reach someone on their behalf." },
      { title: "Add ID information", desc: "Record the tenant's government ID type and ID number for verification purposes. This stays stored in their profile and is useful for move-out documentation or disputes." },
      { title: "Open a tenant's ledger", desc: "Click Ledger on any tenant for their full statement of account — original move-in date, deposit with paid/unpaid status, every stay and transfer they've made, and a month-by-month payment table with billed, paid, balance, and totals." },
    ],
  },
  {
    id: "tenancies",
    icon: BedDouble,
    title: "3. Move-ins, Move-outs & Stay History",
    steps: [
      { title: "Move a tenant in from the Rooms page", desc: "Click any vacant bed or slot on a room card and the move-in form opens with the room (and bed) already selected. Pick the tenant, set the move-in date, and confirm the rate — it defaults from the bed or room. Record the deposit amount and whether it's been paid." },
      { title: "Move a tenant out from the Rooms page", desc: "Click an occupied bed, avatar, or occupant on a room card to see their details — phone, move-in date, rate, and deposit status — then click Move Out. The bed or slot is freed instantly and the dashboard occupancy updates." },
      { title: "Transfer a tenant to another room or bed", desc: "In that same occupant popup, click Transfer. Pick the target room and bed, the date, and optionally a new rate — it defaults from the new spot. The old stay closes, a new one opens, and the deposit carries over automatically." },
      { title: "Swap two tenants", desc: "Want to trade an upper deck for a lower deck, or exchange two rooms, even with zero vacancy? In the Transfer dialog choose 'Swap With Another Tenant' — both tenants trade places in one step, each keeping their own deposit and taking their new spot's rate." },
      { title: "Review Stay History", desc: "Navigate to Boarding House → Stay History for the full ledger of stays. Filter by Active or Moved Out to see who lived in which room and bed, for how long, at what rate, and their deposit status. Your paper trail for disputes." },
      { title: "Fix a record", desc: "Click Edit on any row in Stay History to correct the move-in date, monthly rate, deposit amount or paid status, bed assignment, or notes. On moved-out records you can also fix the move-out date. Rate changes only affect future bills." },
    ],
  },
  {
    id: "rent",
    icon: Banknote,
    title: "4. Rent Billing",
    steps: [
      { title: "Open the Rent Bills page", desc: "Navigate to Boarding House → Rent Bills from the sidebar. This is where you create and manage all monthly rent bills." },
      { title: "Generate the month's bills in one click", desc: "Click Generate and pick the month — a bill is created for every active tenant, each due on their own move-in day of the month (or tick 'one due day for everyone'). Already-billed tenants and anyone who moved in later are skipped automatically." },
      { title: "Record a payment", desc: "Click Pay on any unpaid or partially paid bill. Enter the amount received and select the payment method: Cash, GCash, Maya, Card, or Bank Transfer. If the amount is less than the total, the bill is marked Partial and the remaining balance is tracked until it's settled." },
      { title: "Overdue is automatic", desc: "Any bill past its due date with an outstanding balance flips to Overdue on its own the moment you open the Rent Bills page or dashboard — no button to press. The dashboard's Overdue panel lists tenant, room, due date, and amount." },
      { title: "Fix mistakes safely", desc: "Created a bill by accident? Delete removes it — but only while no payment has been recorded. Once money is received, the bill becomes part of your records and can't be deleted, protecting your payment history." },
    ],
  },
  {
    id: "utilities",
    icon: Zap,
    title: "5. Utility Billing",
    steps: [
      { title: "Open the Utility Bills page", desc: "Navigate to Boarding House → Utility Bills from the sidebar. Utility bills are created separately from rent so tenants can clearly see what they owe for electricity, water, or internet." },
      { title: "Create a utility bill", desc: "Click New Utility Bill. Select the room, choose the utility type (Electricity, Water, Internet, or Other), enter the billing month and amount. Pick 'Other' and a Label field appears — name it Cable TV, Garbage, or Association dues and that name shows on the bill instead of a generic 'Other'." },
      { title: "Record utility payments", desc: "Same as rent — click Pay, enter the amount received, and select the payment method. Partial utility payments are tracked just like rent." },
      { title: "Review utility history", desc: "A tenant's profile shows all their utility bills alongside their rent bills in a single view — so you can see their full payment history at a glance without switching pages." },
    ],
  },
  {
    id: "maintenance",
    icon: Wrench,
    title: "6. Maintenance & QR Reporting",
    steps: [
      { title: "Report an issue", desc: "Navigate to Boarding House → Maintenance and click Report Issue. Enter a title (e.g. 'Leaking faucet in Room 2'), select the room, choose a category — Plumbing, Electrical, Appliance, Furniture, Pest Control, Cleaning, Structural, or Other — and a priority from Low to Urgent." },
      { title: "Work the request", desc: "Click Start when the repair begins — the request moves to In Progress. When it's fixed, click Resolve and optionally enter the repair cost. Resolved costs are summed on the dashboard so you know what maintenance costs you each month." },
      { title: "Print a QR poster for each room", desc: "On any room card, click the QR icon, then Print Poster, and stick it inside the room. Tenants scan it with their phone camera — no app or login — and fill in a short form: name, issue type, what's wrong, and up to 3 photos of the problem." },
      { title: "Receive reports instantly", desc: "QR reports land on your Maintenance page tagged 'Via QR' and you get an in-app notification the moment one is submitted. If the reporter's name matches a current tenant, the report links to their profile automatically." },
      { title: "Tenants see the room's report history", desc: "The report page also lists the room's recent reports — who reported what, when, and whether it's Open, In Progress, or Resolved. Tenants can see a fix is already on the way, so you don't get the same issue reported five times." },
      { title: "Cancel or reopen", desc: "Cancel requests that turn out to be non-issues. If a 'fixed' problem comes back, open the request and click Reopen — the full history stays intact." },
    ],
  },
  {
    id: "dashboard",
    icon: BarChart3,
    title: "7. Dashboard & Analytics",
    steps: [
      { title: "Open the Dashboard", desc: "Navigate to Boarding House → Dashboard from the sidebar. This is your home screen — it loads every time you open the app and gives you the full picture of your boarding house at a glance." },
      { title: "Read the stat cards", desc: "The top row shows: Total Rooms, Active Rooms, Active Tenants, Occupancy Rate (%), Overdue Bills count, Unpaid Bills count, Total Capacity (occupied / total), and Open Maintenance. These update in real time as you add rooms, tenants, and payments." },
      { title: "Check monthly revenue", desc: "Below the stat cards are three revenue cards for the current month: Rent Collected, Utilities Collected, and Total Collected (the combined sum). This tells you exactly how much cash came in this month and from which source." },
      { title: "Read the 6-month revenue chart", desc: "The stacked bar chart shows the last 6 months of collections — orange bars for rent, cyan bars for utilities, stacked per month. Hover on a bar to see the exact amounts. Use this to spot seasonal patterns and set rent collection targets." },
      { title: "Review overdue bills", desc: "The Overdue Rent Bills table shows every rent bill past its due date — tenant name, room, billing month, due date, and amount. Click through to the bill directly from this panel to record a payment." },
      { title: "Track open maintenance", desc: "The Open Maintenance panel lists unresolved repair issues sorted by priority, with an urgent counter — so the leaking faucet never gets forgotten. Resolved repair costs for the month are tracked alongside revenue." },
      { title: "Monitor move-ins and move-outs", desc: "The bottom section shows Recent Move-ins (active tenancies) and Recent Move-outs (tenancies ended this month) side by side — so you can track tenant turnover at a glance." },
    ],
  },
]

const TIPS = [
  { icon: Clock, tip: "Add rooms and their beds before moving tenants in — a bedspace room needs at least one bed before it can accept a move-in." },
  { icon: Lightbulb, tip: "Record a new move-in every time a tenant arrives, even a returning tenant. Past stays are never deleted, so your Stay History stays accurate for disputes." },
  { icon: Wrench, tip: "Print the QR poster for every room on day one. Tenants report issues the moment they spot them — before a small leak becomes a big repair bill." },
  { icon: AlertTriangle, tip: "Issue rent and utility bills as separate entries each month — this makes collections clearer and avoids arguments over what each payment was for." },
  { icon: Shield, tip: "Check the Overdue Rent Bills panel on the dashboard weekly. The sooner you follow up, the easier it is to collect — don't let overdue accounts accumulate." },
  { icon: Banknote, tip: "Always log the repair cost when resolving a maintenance request — the dashboard sums them monthly so you know your true operating expenses." },
]

const WORKFLOW = [
  { step: "1st", title: "Create rent bills", desc: "Issue a rent bill for every active tenant — amount, billing month, and due date." },
  { step: "2nd", title: "Create utility bills", desc: "Issue separate electricity and water bills per tenant based on meter readings or flat allocation." },
  { step: "3rd", title: "Record payments", desc: "As tenants pay throughout the month, record each payment — cash, GCash, or bank transfer." },
  { step: "4th", title: "Follow up overdue", desc: "Check the Overdue Bills panel on the dashboard and follow up with tenants who haven't paid." },
  { step: "5th", title: "Clear maintenance backlog", desc: "Work through open maintenance requests — start, resolve, and log repair costs so nothing stays broken for long." },
  { step: "6th", title: "Check revenue trend", desc: "Review the 6-month chart to see if rent collected is growing, flat, or declining — and act accordingly." },
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
    { href: "/boarding-house#features", label: "Features" },
    { href: "/boarding-house#how-it-works", label: "How it Works" },
    { href: "/boarding-house#pricing", label: "Pricing" },
    { href: "/boarding-house#faq", label: "FAQ" },
    { href: "/boarding-house/guide", label: "Guide" },
  ]
  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/boarding-house" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey Boarding House" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey BH</span>
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

export default function BoardingHouseGuideContent() {
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
          <a href="/boarding-house" className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors mb-8 hover:opacity-60" style={{ color: "#54514c" }}>
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Boarding House Manager
          </a>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-5" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
            <BookOpen className="w-3 h-3" /> User Guide
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-4" style={{ color: INK }}>
            Smapey Boarding House Manager <span style={{ color: BLUE }}>Guide</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "#54514c" }}>
            Everything you need to set up your rooms and beds, register tenants, handle move-ins and move-outs, issue rent and utility bills, track maintenance with QR reporting, and read the occupancy dashboard — step by step.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold" style={{ color: "#54514c" }}>
            {["5-minute setup", "No training required", "Free plan available"].map((t) => (
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
            <p className="text-sm mt-1" style={{ color: "#54514c" }}>Things that will save you time once you're up and running.</p>
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

      {/* WORKFLOW SUMMARY */}
      <section className="py-16" style={{ background: "#fff", borderTop: `2px solid ${INK}` }}>
        <div className="max-w-4xl mx-auto px-6">
          <Animate className="mb-10">
            <h2 className="text-xl sm:text-2xl font-extrabold" style={{ color: INK }}>Monthly workflow at a glance</h2>
            <p className="text-sm mt-1" style={{ color: "#54514c" }}>What to do at the start of each month to keep your boarding house running smoothly.</p>
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
              <p className="text-sm font-medium" style={{ color: "#5c4a28" }}>Create your free boarding house account and have your rooms and first rent bills set up today.</p>
            </div>
            <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5 shrink-0" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>
              Start for free <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <InternalLinks cluster="boarding-house" currentPath="/boarding-house/guide" />

      <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Smapey Boarding House Manager" className="w-6 h-6 rounded-md object-cover" />
            <span className="text-sm font-extrabold" style={{ color: INK }}>Boarding House Manager by Smapey</span>
          </div>
          <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
