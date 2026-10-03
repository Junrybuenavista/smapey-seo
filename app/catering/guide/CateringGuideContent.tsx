"use client"

import { useState, useEffect, useRef } from "react"
import InternalLinks from "@/components/InternalLinks"
import {
  BookOpen, ChefHat, Users, CalendarDays, Banknote,
  FlaskConical, UserCheck, BarChart3, CheckCircle2, ChevronRight,
  Menu, X, Clock, Lightbulb, AlertTriangle, Shield, ArrowLeft, FileText,
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
      { title: "Build your package catalog", desc: "Go to Catering → Packages and click Add Package. Enter the package name (e.g. Basic Buffet, Premium Set Menu), a short description, and the price per head. Then add the menu items. Build out all your standard packages here - you'll attach them to bookings later instead of re-quoting every time." },
      { title: "Set up your supply catalog", desc: "Go to Catering → Supply and click Add Ingredient. Enter the ingredient name, unit type (KG, Grams, Liters, ML, Pieces, Packs, Boxes), cost per unit, and any notes (e.g. preferred supplier). Your recipes are built from these items, so add the ingredients you cook with." },
      { title: "Add recipes for your dishes", desc: "Go to Catering → Recipes and click Add Recipe. Enter the dish (e.g. Chicken Adobo), how many servings one batch makes, and what that batch takes from your supply catalog (e.g. 2 kg chicken and 0.3 L soy sauce for 10 servings). Smapey shows the cost per serving from your catalog prices." },
      { title: "Invite your team", desc: "Go to Settings → Team and invite team members by email. Assign Admin or Member roles based on their access level. Team members can log in with their own account and see the live dashboard, bookings, and clients." },
      { title: "Configure your currency symbol", desc: "In Settings → Organization, confirm your currency symbol (₱ for Philippine Peso). This appears on payment milestones, quotes, and the revenue dashboard." },
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
      { title: "Create a new booking", desc: "Click New Booking. Select the client, then enter the event date, event type, venue, and expected guest count. Add internal notes if needed. New bookings start as Inquiry." },
      { title: "Attach packages to a booking", desc: "Open the booking and click Add Package on the Packages tab. Select from your package catalog and enter the number of guests. Add more than one package if the client is taking, for example, a food package and a drinks package. Click the pencil on an attached package to change its pax or price per pax." },
      { title: "Add other charges and discounts", desc: "Below the packages, click Add charge for anything else on the bill: transport, styling, extra staff. Tick 'This is a discount' to subtract an amount instead. The booking total updates automatically." },
      { title: "Update the final headcount", desc: "Click Edit details on the booking and change the pax count. Leave 'Also set the package to this pax' ticked to re-price the attached packages in the same step, then recalculate the market list on the Supply tab." },
      { title: "Update booking status", desc: "Use the buttons on the booking to move it through Inquiry → Confirmed → In Progress → Completed, or cancel it while it's still open. Marking a booking Completed never marks a payment as paid: any balance the client still owes stays open so you can record it when it arrives." },
      { title: "View booking details", desc: "Open any booking to see everything about the event in tabs: Packages, Quote, Supply, Payments, and Staff." },
    ],
  },
  {
    id: "quotes",
    icon: FileText,
    title: "4. Send Quotations",
    steps: [
      { title: "Create a quote", desc: "Open a booking that has at least one package and go to the Quote tab. Click Create quote, choose how long it's valid, and review your terms. Smapey remembers your terms, so the next quote starts from them." },
      { title: "Share it with your client", desc: "Tap Share with client to send the link through Messenger, Viber, or SMS, or tap Copy message for a ready-made message with the link. Your client opens it on their phone - no account or app needed." },
      { title: "What your client sees", desc: "The event details, each package with its menu, other charges, the total, the payment schedule, and your terms. They can also print it or save it as a PDF. Your notes, costs, and supply list are never shown." },
      { title: "Accept or request changes", desc: "Your client accepts by typing their name, which records who agreed and when, or asks for changes with a short message. You get a notification either way, and the Quote tab shows their answer. Once a quote is accepted, click Confirm booking." },
      { title: "Send a new version", desc: "If the booking changes, click Send new version. Older links forward to the newest version, and an accepted version stays on record as what the client agreed to. The Quote tab warns you when the booking total no longer matches the latest quote." },
      { title: "Preview before you send", desc: "Click Preview to see exactly what your client sees. Opening your own preview doesn't count as the client viewing the quote." },
    ],
  },
  {
    id: "milestones",
    icon: Banknote,
    title: "5. Payment Milestones",
    steps: [
      { title: "What is a payment milestone?", desc: "A payment milestone is a scheduled partial payment tied to a specific booking. Instead of tracking a single lump sum, you break the booking's total into stages - for example: 30% reservation fee, 50% partial payment two weeks before the event, and the 20% balance on event day." },
      { title: "Add a milestone to a booking", desc: "Open the booking and go to the Payments tab. Click Add Milestone and enter the milestone name (e.g. Reservation Fee), the amount, and the due date. Repeat for each payment stage. Your client sees this schedule on their quote." },
      { title: "Record a payment", desc: "Click Pay on any pending or overdue milestone and choose the payment method: Cash, GCash, Maya, Bank Transfer, Check, or Other. The milestone is marked Paid with today's date and the revenue dashboard updates immediately." },
      { title: "Collect balances after the event", desc: "Balances are often paid after the event. Completed bookings still accept payments, and the booking shows what's still unpaid until you record it." },
      { title: "Keep the schedule matching the total", desc: "When the pax or charges change, the Payments tab tells you how much of the total isn't in the schedule yet. To change an unpaid milestone, delete it and add it again with the new amount." },
      { title: "Overdue milestones", desc: "An unpaid milestone becomes Overdue the day after its due date, and the dashboard counts your overdue payments. Check it regularly - the earlier you follow up, the easier it is to collect." },
    ],
  },
  {
    id: "supply",
    icon: FlaskConical,
    title: "6. Supply, Recipes and Market List",
    steps: [
      { title: "Open the Supply Catalog", desc: "Navigate to Catering → Supply from the sidebar. This is your ingredient and materials reference - not an inventory tracker, but the prices and units your recipes and market lists are calculated from." },
      { title: "Add an ingredient or supply", desc: "Click Add Ingredient. Enter the name (e.g. Chicken, Jasmine Rice, Cooking Oil), select the unit type (KG, Grams, Liters, ML, Pieces, Packs, Boxes, or Other), and enter the cost per unit. Add a notes field for supplier name, brand preference, or buying notes." },
      { title: "Build recipes from your catalog", desc: "In Catering → Recipes, list what one batch of a dish takes and how many servings it makes. Quantities use each supply item's own unit (kg, L, pcs), so there's nothing to convert." },
      { title: "Link recipes to package items", desc: "In Catering → Packages, expand a package and click Link a recipe under each dish, or pick the recipe when you add the item. Each package then shows its food cost per guest and what percent of the price that is." },
      { title: "Calculate the market list", desc: "Open a booking, go to the Supply tab, and click Calculate from recipes. Smapey multiplies every recipe by the booking's pax, combines the same ingredient across dishes (chicken for adobo and for lumpia becomes one line), and adds an optional buffer for spillage. Click Update supply list to save it. Dishes without a recipe are flagged so you know the list is incomplete." },
      { title: "Recalculate after headcount changes", desc: "When the final headcount changes, calculate again. Quantities update in place, items you've already marked bought keep their actual quantity and cost, and items you added by hand stay." },
      { title: "Share the list and track spending", desc: "Tap Copy list to paste the market list into Messenger for whoever does the market run. As you buy, record the actual quantity and cost - the Supply tab shows estimated vs. actual spend and food cost as a percent of the booking total." },
      { title: "Keep costs updated", desc: "Edit ingredient costs whenever your supplier prices change. Recipe costs, package food costs, and new market lists use the updated prices." },
    ],
  },
  {
    id: "staff",
    icon: UserCheck,
    title: "7. Staff Assignment",
    steps: [
      { title: "Assign staff to a booking", desc: "Open any booking and go to the Staff tab. Click Assign Staff and enter each person's name, so the whole team knows the roster without a separate group chat message." },
      { title: "Set roles and confirm attendance", desc: "Pick a role for each person (Head Cook, Assistant Cook, Waiter, Server, Coordinator, Driver, or Other) and add their phone number and notes. Mark each person Confirmed once they've said yes, so you can see who's still unconfirmed." },
      { title: "Remove a staff assignment", desc: "Click the remove icon next to any staff name on the booking to unassign them. This is useful if a team member becomes unavailable and you need to reassign the slot." },
    ],
  },
  {
    id: "dashboard",
    icon: BarChart3,
    title: "8. Dashboard & Analytics",
    steps: [
      { title: "Open the Dashboard", desc: "Navigate to Catering → Dashboard from the sidebar. This is your home screen - it shows the financial and operational picture of your catering business at a glance." },
      { title: "Read the stat cards", desc: "The cards show total, upcoming, and completed bookings; your clients and active packages; how many payments are overdue or still pending; and the revenue you collected this month." },
      { title: "Follow up overdue payments", desc: "When the Overdue Payments card isn't zero, open your upcoming bookings' Payments tabs and contact those clients. Following up before the event is far easier than chasing after it." },
      { title: "Check upcoming events", desc: "The Upcoming Events list shows confirmed and in-progress bookings in the next 30 days - event date, client, packages, and staff. This is your operations forward-look: what's coming up and whether it's ready." },
      { title: "Review the monthly revenue trend", desc: "The revenue chart shows your collections for the last six months. Use it to spot your peak catering season (typically April-May and October-December for Philippine events), track whether revenue is growing, and set realistic targets." },
    ],
  },
]

const TIPS = [
  { icon: Clock, tip: "Build your full package catalog before taking your first booking. This saves time on every inquiry, just select and attach, no re-quoting." },
  { icon: Lightbulb, tip: "Create payment milestones at the same time you confirm a booking. Don't wait until payment is due, setting them early gives you a clear picture of expected cash flow." },
  { icon: AlertTriangle, tip: "Check the Overdue Payments count on the dashboard at least twice a week. Philippine catering clients often pay late, early follow-up before an event is far more effective than chasing after it." },
  { icon: Shield, tip: "Marking a booking Completed doesn't mark any payment as paid. If the client still owes a balance after the event, it stays open on the booking until you record the payment." },
]

const WORKFLOW = [
  { step: "1st", title: "Review upcoming events", desc: "Check all confirmed bookings for the month - verify packages attached, milestones created, and staff assigned for each event." },
  { step: "2nd", title: "Follow up overdue milestones", desc: "Check the Overdue Payments count on the dashboard and contact clients with outstanding balances before their event date." },
  { step: "3rd", title: "Plan procurement", desc: "Calculate each upcoming event's market list from recipes on the Supply tab, copy it to whoever does the market run, and order with enough lead time." },
  { step: "4th", title: "Record all collections", desc: "As payments come in, mark milestones as paid with the correct method and date. Keep the dashboard accurate in real time." },
  { step: "5th", title: "Mark completed events", desc: "After each event, update the booking status to Completed. Any balance the client still owes stays open on the booking until you record the payment." },
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
