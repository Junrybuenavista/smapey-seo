"use client"

import { useState, useEffect, useRef } from "react"
import {
  Droplets, Boxes, Truck, PackageOpen, Settings, MessageSquare,
  BarChart3, CreditCard, Lightbulb, ArrowRight, CheckCircle2, BookOpen,
  ChevronRight, Menu, X, ArrowLeft,
} from "lucide-react"
import InternalLinks from "@/components/InternalLinks"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=WATER_REFILLING&plan=FREE`
const LOGIN_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`

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

function useInView() {
  const ref = useRef<HTMLDivElement>(null); const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.1 })
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
    { href: "/water-refilling#features", label: "Features" },
    { href: "/water-refilling#how-it-works", label: "How it Works" },
    { href: "/water-refilling#pricing", label: "Pricing" },
    { href: "/water-refilling#faq", label: "FAQ" },
    { href: "/water-refilling/guide", label: "Guide" },
  ]
  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/water-refilling" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey Water" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey Water</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (<a key={l.label} href={l.href} className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>{l.label}</a>))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={LOGIN_URL} className="text-sm font-semibold hover:opacity-60 transition-opacity px-2 py-2" style={{ color: INK }}>Sign in</a>
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

function Callout({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="my-6 rounded-[16px] border-2 p-5" style={{ background: "#fff7e8", borderColor: INK }}>
      <div className="flex items-start gap-3">
        <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#b06c00" }} />
        <div>
          {title && <p className="font-extrabold mb-1" style={{ color: INK }}>{title}</p>}
          <div className="text-sm leading-relaxed" style={{ color: "#5c4a28" }}>{children}</div>
        </div>
      </div>
    </div>
  )
}

function Example({ children, title = "Quick example" }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="my-6 rounded-[16px] border-2 p-5" style={{ background: "#fff", borderColor: INK, boxShadow: `5px 5px 0 ${BLUE}` }}>
      <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: BLUE }}>{title}</p>
      <div className="text-sm leading-relaxed space-y-2" style={{ color: "#54514c" }}>{children}</div>
    </div>
  )
}

function Steps({ items }: { items: { t: string; d: string }[] }) {
  return (
    <ol className="my-6 space-y-4">
      {items.map((s, i) => (
        <li key={i} className="flex gap-4">
          <span className="shrink-0 w-8 h-8 rounded-full border-2 text-sm font-bold flex items-center justify-center" style={{ background: BLUE, color: "#fff", borderColor: INK }}>{i + 1}</span>
          <div className="pt-0.5">
            <p className="font-bold" style={{ color: INK }}>{s.t}</p>
            <p className="text-sm leading-relaxed mt-0.5" style={{ color: "#54514c" }}>{s.d}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function H2({ id, icon: Icon, accent = BLUE, children }: { id: string; icon: any; accent?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 flex items-center gap-3 text-2xl sm:text-3xl font-extrabold tracking-tight mt-16 mb-4" style={{ color: INK }}>
      <span className="w-10 h-10 rounded-[12px] border-2 flex items-center justify-center shrink-0" style={{ background: accent, borderColor: INK }}>
        <Icon className="w-5 h-5" style={{ color: accent === AMBER ? INK : "#fff" }} />
      </span>
      {children}
    </h2>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="leading-relaxed my-4" style={{ color: "#54514c" }}>{children}</p>
}

const TOC = [
  { id: "big-idea", label: "The big idea (read this first)" },
  { id: "setup", label: "1. Set up your station" },
  { id: "deliveries", label: "2. Take a delivery order" },
  { id: "containers", label: "3. Container deposits explained" },
  { id: "returns", label: "4. Record returned empties" },
  { id: "inventory", label: "5. Inventory & refills" },
  { id: "payments", label: "6. Payments" },
  { id: "sms", label: "7. SMS notifications" },
  { id: "dashboard", label: "8. The dashboard" },
  { id: "glossary", label: "Glossary" },
]

function CTA() {
  return (
    <section className="py-16 px-6" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto">
        <div className="rounded-[28px] border-2 p-10 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
          <div>
            <h3 className="text-2xl font-extrabold mb-2" style={{ color: INK }}>Ready to run your station smarter?</h3>
            <p className="text-sm font-medium" style={{ color: "#5c4a28" }}>The free plan is enough to run a small station. No credit card, set up in five minutes.</p>
          </div>
          <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5 shrink-0" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>
            Get started for free <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Smapey Water" className="w-6 h-6 rounded-md object-cover" />
          <span className="text-sm font-extrabold" style={{ color: INK }}>Water Refilling by Smapey</span>
        </div>
        <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
      </div>
    </footer>
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
          <a href="/water-refilling" className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors mb-8 hover:opacity-60" style={{ color: "#54514c" }}>
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Water Refilling
          </a>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-5" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
            <BookOpen className="w-3 h-3" /> Step-by-step guide
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-6" style={{ color: INK }}>
            How to run your water refilling station with Smapey
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#54514c" }}>
            This app does a lot — so we wrote this guide in plain language. No jargon. Just follow it top to bottom
            and you&apos;ll understand the whole system, including the part everyone finds confusing: tracking who is holding your bottles.
          </p>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-6 py-16">

        {/* TOC */}
        <div className="rounded-[20px] border-2 p-6 mb-4" style={{ background: "#fff", borderColor: INK, boxShadow: `6px 6px 0 ${AMBER}` }}>
          <p className="flex items-center gap-2 text-sm font-extrabold mb-4" style={{ color: INK }}>
            <BookOpen className="w-4 h-4" style={{ color: BLUE }} /> What&apos;s in this guide
          </p>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {TOC.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="text-sm transition-colors flex items-center gap-1.5 hover:opacity-60" style={{ color: "#54514c" }}>
                  <ArrowRight className="w-3 h-3" style={{ color: BLUE }} /> {t.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* THE BIG IDEA */}
        <Animate>
          <H2 id="big-idea" icon={Droplets}>The big idea (read this first)</H2>
          <P>
            A water refilling station has to keep track of <strong>two completely different things</strong>. Once these
            click, the whole app makes sense:
          </P>
          <div className="grid sm:grid-cols-2 gap-4 my-6">
            <div className="rounded-[18px] border-2 p-5" style={{ background: "#fff", borderColor: INK, boxShadow: `5px 5px 0 ${BLUE}` }}>
              <div className="w-10 h-10 rounded-[12px] border-2 flex items-center justify-center mb-3" style={{ background: BLUE, borderColor: INK }}>
                <Boxes className="w-5 h-5 text-white" />
              </div>
              <p className="font-extrabold mb-1" style={{ color: INK }}>1. The water you sell</p>
              <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>
                Filled gallons sitting at your station, ready to sell. This is your <strong>inventory / stock</strong>.
                It goes up when you refill, and down when you deliver.
              </p>
            </div>
            <div className="rounded-[18px] border-2 p-5" style={{ background: "#fff", borderColor: INK, boxShadow: `5px 5px 0 ${AMBER}` }}>
              <div className="w-10 h-10 rounded-[12px] border-2 flex items-center justify-center mb-3" style={{ background: AMBER, borderColor: INK }}>
                <PackageOpen className="w-5 h-5" style={{ color: INK }} />
              </div>
              <p className="font-extrabold mb-1" style={{ color: INK }}>2. The bottles you lend out</p>
              <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>
                The physical containers customers borrow. This is the <strong>container deposit</strong>. You need to
                know who is holding how many of your bottles so they come back.
              </p>
            </div>
          </div>
          <Callout title="Think of it like a library">
            The <strong>water</strong> is like the knowledge inside a book — you &quot;sell&quot; it. The <strong>bottle</strong> is
            like the physical book — you lend it and expect it back. Smapey tracks both separately, because a returned
            empty bottle is <em>not</em> the same as sellable water. It has to be refilled first.
          </Callout>
        </Animate>

        {/* SETUP */}
        <Animate>
          <H2 id="setup" icon={Settings} accent={AMBER}>1. Set up your station</H2>
          <P>Do this once, in this order, and everything afterwards is faster.</P>
          <Steps items={[
            { t: "Open Settings and set your defaults", d: "Go to Water Refilling → Settings. Set your default price per gallon (e.g. ₱25), default container deposit (e.g. ₱0 or ₱150 per bottle), and a low-stock threshold (the number where Smapey warns you to refill)." },
            { t: "Add your delivery routes", d: "Go to Routes and add the areas you serve — e.g. 'Barangay San Jose' or 'Downtown'. This lets you group customers and plan a delivery run." },
            { t: "Add your customers", d: "Go to Customers → New Customer. Just the name is required. Leave the price blank to use your station default, or set a special price for that customer. Assign them to a route if you deliver." },
          ]} />
          <Callout title="You only set the price once">
            Because new customers automatically inherit your default price and deposit, you don&apos;t have to type ₱25 over
            and over. Only change it for the rare customer who pays a different rate.
          </Callout>
        </Animate>

        {/* DELIVERIES */}
        <Animate>
          <H2 id="deliveries" icon={Truck}>2. Take a delivery order</H2>
          <P>Every time you sell water — walk-in or delivery — you create an order.</P>
          <Steps items={[
            { t: "Go to Orders → New Delivery Order", d: "Pick the customer. Their price fills in automatically." },
            { t: "Enter 'Gallons to Deliver'", d: "How many filled gallons the customer is taking today, e.g. 5." },
            { t: "Enter 'Empty Returned' (if any)", d: "If they hand back empty bottles at the same time, type the number here. Leave it 0 if they didn't bring any back." },
            { t: "Create the order", d: "It starts as Pending. As the delivery happens you move it Pending → Out for Delivery → Delivered." },
            { t: "Mark it Delivered", d: "When you confirm delivery, Smapey automatically subtracts those gallons from your stock and records the sale." },
          ]} />
          <Callout title="Why status matters">
            Gallons on Pending / Out-for-Delivery orders are shown as <strong>Reserved</strong> in inventory — they&apos;re
            promised but not gone yet. They only leave your stock when the order is marked <strong>Delivered</strong>.
          </Callout>
        </Animate>

        {/* CONTAINERS */}
        <Animate>
          <H2 id="containers" icon={PackageOpen} accent={AMBER}>3. Container deposits explained</H2>
          <P>
            This is the part that confuses everyone, so let&apos;s go slow. For every customer, Smapey keeps a simple running count:
          </P>
          <div className="my-6 rounded-[18px] border-2 p-6 text-center" style={{ background: INK, borderColor: INK }}>
            <p className="text-sm" style={{ color: "rgba(255,255,255,.65)" }}>
              <span className="font-bold" style={{ color: "#7ea8ff" }}>Bottles you&apos;ve lent out</span>
              {"  −  "}
              <span className="font-bold" style={{ color: AMBER }}>Bottles they&apos;ve returned</span>
            </p>
            <p className="text-lg font-bold mt-2 text-white">= Containers the customer is still holding</p>
          </div>
          <P>
            Every time you deliver gallons, the &quot;lent out&quot; number goes up. Every time they return empties, the &quot;returned&quot;
            number goes up. The difference is what they still owe you in physical bottles.
          </P>
          <Example title="Example: Juan">
            <p>• Juan orders 10 gallons over the month → he&apos;s now holding <strong>10</strong> of your bottles.</p>
            <p>• Next visit, Juan hands back 8 empties → he&apos;s now holding <strong>2</strong>.</p>
            <p>• Smapey shows Juan&apos;s &quot;outstanding containers&quot; as <strong>2</strong> — no notebook needed.</p>
          </Example>
        </Animate>

        {/* RETURNS */}
        <Animate>
          <H2 id="returns" icon={PackageOpen}>4. Record returned empties</H2>
          <P>There are two situations, and Smapey handles both.</P>
          <P><strong>A) Empties come back during a delivery.</strong> Just type the number in the &quot;Empty Returned&quot; field on the order (see step 2). Done.</P>
          <P><strong>B) A customer just drops by to return empties — no purchase.</strong> Use the dedicated Returns page:</P>
          <Steps items={[
            { t: "Go to Returns → Record Return", d: "Pick the customer. Smapey shows how many bottles they're currently holding." },
            { t: "Enter how many empties they returned", d: "For example, 8. Add a note if you like." },
            { t: "Save", d: "Their outstanding container count drops immediately, and the return is logged with the date and who recorded it." },
          ]} />
          <Callout title="Important: returned empties are NOT sellable yet">
            When a bottle comes back empty, it lowers the customer&apos;s count — but you can&apos;t sell it until you refill it.
            That&apos;s what the next section is about.
          </Callout>
        </Animate>

        {/* INVENTORY */}
        <Animate>
          <H2 id="inventory" icon={Boxes} accent={AMBER}>5. Inventory &amp; refills</H2>
          <P>The Inventory page shows four numbers:</P>
          <ul className="my-4 space-y-2">
            {[
              ["Total Stock", "Filled gallons you can sell right now."],
              ["Reserved (pending)", "Gallons promised to orders that aren't delivered yet."],
              ["Available (after pending)", "Stock minus reserved — what's truly free to sell."],
              ["Empties on Hand", "Returned empty bottles waiting to be refilled."],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3 text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: BLUE }} />
                <span style={{ color: "#54514c" }}><strong style={{ color: INK }}>{t}:</strong> {d}</span>
              </li>
            ))}
          </ul>
          <P>There are three buttons:</P>
          <Steps items={[
            { t: "Restock — water from a supplier", d: "Got filled gallons delivered from a bulk supplier? Enter the amount. Stock goes up." },
            { t: "Refill Empties — turn returned bottles into stock", d: "After you refill the empties customers returned, enter the number here. Stock goes up and 'Empties on Hand' goes down. This is the step that closes the loop." },
            { t: "Manual Adjustment — fix mistakes", d: "Use + or − to correct stock after a physical count, or to write off broken bottles." },
          ]} />
          <Example title="Example: the full loop">
            <p>• You start the day with <strong>38</strong> filled gallons in stock.</p>
            <p>• Juan returns <strong>12</strong> empties → Empties on Hand shows <strong>12</strong>. Stock is still 38 (empties aren&apos;t sellable).</p>
            <p>• You refill those 12 bottles, then click <strong>Refill Empties → 12</strong>.</p>
            <p>• Now Stock = <strong>50</strong>, Empties on Hand = <strong>0</strong>. The loop is closed. 🎉</p>
          </Example>
        </Animate>

        {/* PAYMENTS */}
        <Animate>
          <H2 id="payments" icon={CreditCard}>6. Payments</H2>
          <P>
            Every order is Unpaid until you mark it Paid. Open the order and choose how they paid — Cash, GCash, Maya,
            or Bank Transfer. Your dashboard then shows today&apos;s revenue and any unpaid balances so you always know who still owes you.
          </P>
        </Animate>

        {/* SMS */}
        <Animate>
          <H2 id="sms" icon={MessageSquare} accent={AMBER}>7. SMS notifications</H2>
          <P>
            Smapey can automatically text a customer when their delivery is on the way. It&apos;s an <strong>optional toggle</strong> —
            turn it on when you want the heads-up texts going out, and off when you don&apos;t. Customers don&apos;t need any app;
            the message goes to their phone number.
          </P>
        </Animate>

        {/* DASHBOARD */}
        <Animate>
          <H2 id="dashboard" icon={BarChart3}>8. The dashboard</H2>
          <P>Your home screen answers the questions you ask every day:</P>
          <ul className="my-4 space-y-2">
            {[
              "How many orders today, and how many are still pending delivery?",
              "How much did I collect today and this month?",
              "Who hasn't paid yet, and how much?",
              "How much stock do I have, and am I running low?",
              "How many of my containers are still out with customers?",
            ].map((t) => (
              <li key={t} className="flex gap-3 text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: BLUE }} />
                <span style={{ color: "#54514c" }}>{t}</span>
              </li>
            ))}
          </ul>
        </Animate>

        {/* GLOSSARY */}
        <Animate>
          <H2 id="glossary" icon={BookOpen} accent={AMBER}>Glossary</H2>
          <dl className="my-4 space-y-4">
            {[
              ["Stock / Inventory", "Filled gallons you can sell right now."],
              ["Reserved", "Gallons promised to orders not yet delivered."],
              ["Container deposit", "The bottles a customer is holding, lent out against a deposit."],
              ["Outstanding containers", "Bottles a customer still has = lent out − returned."],
              ["Empties on hand", "Returned empty bottles waiting to be refilled into stock."],
              ["Refill", "Turning empties back into sellable stock with one click."],
            ].map(([t, d]) => (
              <div key={t} className="pl-4" style={{ borderLeft: `3px solid ${BLUE}` }}>
                <dt className="font-extrabold" style={{ color: INK }}>{t}</dt>
                <dd className="text-sm" style={{ color: "#54514c" }}>{d}</dd>
              </div>
            ))}
          </dl>
        </Animate>

        {/* INLINE CTA */}
        <Animate>
          <div className="mt-16 rounded-[24px] border-2 p-8 text-center" style={{ background: BLUE, borderColor: INK, boxShadow: `8px 8px 0 ${INK}` }}>
            <Droplets className="w-8 h-8 mx-auto mb-3 text-white" />
            <h3 className="text-2xl font-extrabold mb-2 text-white">Ready to try it on your own station?</h3>
            <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "rgba(255,255,255,.8)" }}>
              The free plan is enough to run a small station. No credit card, set up in five minutes.
            </p>
            <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>
              Create your free account <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </Animate>
      </article>

      <CTA />
      <InternalLinks cluster="water-refilling" currentPath="/water-refilling/guide" />
      <Footer />
    </main>
  )
}
