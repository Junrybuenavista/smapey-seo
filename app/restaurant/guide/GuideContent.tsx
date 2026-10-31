"use client"

import { useState, useEffect, useRef } from "react"
import { CheckCircle2, UtensilsCrossed, ShoppingBag, ChefHat, BarChart3, ChevronRight, QrCode, Banknote, Menu, X, ArrowLeft, BookOpen, Smartphone, Monitor } from "lucide-react"
import InternalLinks from "@/components/InternalLinks"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=RESTAURANT&plan=FREE`

const SECTIONS = [
  {
    icon: UtensilsCrossed,
    title: "1. Build your menu",
    body: [
      "Open Menu in the dashboard and start with Categories, like Rice Meals, Merienda and Drinks. Categories keep your menu organized for your staff and your customers.",
      "Inside each category, click Add Item. Give it a name, a description, a price, and optionally a photo (upload one or take it with the camera). Photos show on the cashier's order screen and on the customer's phone.",
      "Tap Hide on any item that sells out and it disappears from ordering right away; the kitchen can do this too, from the kitchen screen. Switching off a whole category hides every item in it. You can delete an item even if it was ordered before; past orders keep its name and price.",
    ],
  },
  {
    icon: QrCode,
    title: "2. Set up ordering and trays",
    body: [
      "Open QR Ordering. Choose a short name for your ordering link and turn on Accept online orders.",
      "Download or print your store QR. It's one code for the whole shop, so put it on the counter, the walls or the tables. If GCash is on, the poster also shows your GCash QR.",
      "Under Trays, set how many trays your kitchen uses. Four trays become A, B, C and D. Set 0 if you don't use trays.",
      "Under Cash denominations, keep the bills your customers pay with. It starts with ₱20, ₱50, ₱100, ₱200, ₱500 and ₱1,000. When taking cash, the cashier taps each bill the customer hands over (two ₱200s make ₱400), and the change shows straight away.",
    ],
  },
  {
    icon: ShoppingBag,
    title: "3. Take orders at the counter",
    body: [
      "Open Cashier and tap New order. Choose Dine-in or Take-out, tap the items, and add a note on any item (\"no onions\") or on the whole order.",
      "Choose how the customer pays: Cash or GCash now, or At pickup. For cash, tap each bill the customer hands over (or type the amount) and the change appears.",
      "Tap Send to kitchen. The order number (01 to 99) fills the screen: write it on the customer's slip. Numbers start again at 01 every day, and a number still waiting at the counter is never given out twice.",
      "Customer wants to add or change something? While the order is being prepared, tap Edit on it in the Preparing column: add dishes, change quantities or notes, or take dishes off. It keeps its number and its place in the kitchen. If it's already paid, collect the extra right there; giving money back needs an owner or admin.",
    ],
  },
  {
    icon: Smartphone,
    title: "4. Phone orders",
    body: [
      "Customers scan your store QR with their phone camera and your menu opens in their browser, with no app and no login. They pick items, add notes, choose dine-in or take-out, and place the order.",
      "Their phone then shows an order number and a QR code. At the counter, the cashier taps Scan QR (or types the number) and the order goes to the kitchen.",
      "A phone order nobody brings to the counter within 30 minutes is dropped. It never reaches the kitchen and doesn't count toward your plan's monthly orders.",
    ],
  },
  {
    icon: ChefHat,
    title: "5. The kitchen screen",
    body: [
      "Open Kitchen on a tablet or phone in the kitchen. Every order being prepared shows up oldest first, with its item notes and how long it has waited. New orders chime; tap the screen once after opening it to turn sound on.",
      "When an order is done, tap Choose tray and pick the tray you're putting it on. Trays holding another order are greyed out, and a big order can take two.",
      "Tap Ready and the order leaves the kitchen screen and moves to the cashier's Ready column with its tray letter. A few seconds later your TV calls the number by itself. Tapped Ready by mistake? Tap Undo on the message that appears, and the number is never called.",
      "Ran out of something? Tap Sold out at the top of the kitchen screen and mark the dish sold out. It disappears from New order and the customers' phones right away; tap Available when there's more.",
      "When the cashier changes an order, its card chimes, lights up again and says exactly what changed, so nothing gets missed.",
    ],
  },
  {
    icon: Monitor,
    title: "6. Call the number and hand it over",
    body: [
      "On the Cashier screen, ready orders show their tray letter. Your TV screen has already called the number: it chimes and says \"Order number 07, your order is ready.\" If the customer doesn't come, tap Call again. Only the TV makes sound, so plug the speaker into the TV.",
      "For the TV, open Cashier → TV screen on a device connected to the TV. It shows the numbers being prepared and the numbers ready to claim, with no names or prices. Tap it once to turn sound on, then use Test sound.",
      "When the customer claims the order, tap Hand over. If they haven't paid yet, choose Cash or GCash. For cash, tap each bill they hand over and the change shows before you confirm. An order can't be handed over unpaid.",
      "Customers who ordered by phone also see each step on their phone, and their phone chimes when the food is ready.",
    ],
  },
  {
    icon: Banknote,
    title: "7. GCash payments",
    body: [
      "Open QR Ordering and find the GCash section. Turn it on, then enter your GCash name and number and upload your GCash \"Receive Money\" QR. This connects your own wallet, with no payment gateway, no monthly fees and no KYC paperwork.",
      "Phone customers see your GCash QR and the exact total on their order screen. They can save the QR or copy your number, pay, then tap \"I've paid via GCash\".",
      "That doesn't mark the order paid by itself. The cashier sees \"GCash?\" on the order, checks that the money arrived, and confirms.",
    ],
  },
  {
    icon: BarChart3,
    title: "8. Track your sales",
    body: [
      "The Dashboard shows today's revenue (money taken today), orders sent to the kitchen today, and how many are waiting, preparing and ready.",
      "The Analytics page shows revenue and orders for the last 7 days, this month's best-sellers, and dine-in vs. take-out this month.",
      "Plan Usage counts the orders that reached the kitchen this month against your plan's limit, so phone orders nobody brought to the counter don't use it up.",
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
    { href: "/restaurant#features", label: "Features" },
    { href: "/restaurant#how-it-works", label: "How it Works" },
    { href: "/restaurant#pricing", label: "Pricing" },
    { href: "/restaurant#faq", label: "FAQ" },
    { href: "/restaurant/guide", label: "Guide" },
  ]
  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/restaurant" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey Food</span>
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
          <a href="/restaurant" className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors mb-8 hover:opacity-60" style={{ color: "#54514c" }}>
            <ArrowLeft className="w-3.5 h-3.5" /> Back to overview
          </a>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-5" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
            <BookOpen className="w-3 h-3" /> User Guide
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>
            How to use Smapey Food Ordering Manager
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#54514c" }}>
            Build your menu, take orders at the counter or by phone, run the kitchen and cashier screens, call numbers on a TV, and track daily sales. This guide walks through every step.
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
                  <div className="px-6 py-5 space-y-4">
                    {body.map((para, i) => (
                      <p key={i} className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{para}</p>
                    ))}
                  </div>
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
              <h3 className="text-2xl font-extrabold mb-2" style={{ color: INK }}>Ready to take your first order?</h3>
              <p className="text-sm font-medium" style={{ color: "#5c4a28" }}>Free forever. No card required. Your menu will be live in minutes.</p>
            </div>
            <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5 shrink-0" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>
              Get started free <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <InternalLinks cluster="restaurant" currentPath="/restaurant/guide" />

      <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" />
            <span className="text-sm font-extrabold" style={{ color: INK }}>Food Ordering by Smapey</span>
          </div>
          <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
