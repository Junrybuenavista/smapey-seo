"use client"

import { useState, useEffect, useRef } from "react"
import { CheckCircle2, UtensilsCrossed, ShoppingBag, ChefHat, BarChart3, ClipboardList, ChevronRight, QrCode, Banknote, Menu, X, ArrowLeft, BookOpen } from "lucide-react"
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
      "Open Menu in the dashboard and start with Categories — Appetizers, Mains, Drinks, Desserts, or whatever fits your operation. Categories keep your menu organized and make order-taking faster.",
      "Inside each category, click Add Item. Give it a name, a description, a price, and optionally upload a photo. Photos help staff identify items quickly, especially in a busy kitchen.",
      "Toggle any item Available or Unavailable at any time. Marking an item unavailable removes it from the order-entry screen instantly — useful for items that are sold out mid-service.",
    ],
  },
  {
    icon: QrCode,
    title: "2. Turn on QR table ordering",
    body: [
      "Open QR Ordering in the dashboard and toggle ordering on. Print one QR code per table — Smapey generates a unique code that links to your live menu. If you've enabled GCash, each printed card also includes your GCash QR, so customers can order and pay from the same card on the table.",
      "When a customer scans the QR with their phone camera, your menu opens in their browser — no app to download and no login required. They pick items, add notes, enter their name, and place the order themselves.",
      "The order lands in your Orders queue instantly as Pending, with the table number attached. New orders appear automatically and notify your staff, so nobody has to keep refreshing the screen.",
    ],
  },
  {
    icon: ShoppingBag,
    title: "3. Place an order yourself (optional)",
    body: [
      "You can still take orders for customers from the dashboard. Open Orders and click New Order. Choose Dine-in and enter a table number, or choose Takeaway and enter the customer's name.",
      "Browse your menu by category, add items to the cart, adjust quantities, and add notes for any item or for the whole order. The order total updates as you add items.",
      "Click Place Order. The order is created with status Pending and an auto-generated order number (#001, #002, …) so the kitchen and counter always share the same reference.",
    ],
  },
  {
    icon: ChefHat,
    title: "4. Manage the kitchen queue",
    body: [
      "Every new order appears in the queue as Pending. When the kitchen starts on it, open the order and tap Start Preparing — the status moves to Preparing.",
      "When the food is ready, tap Mark Ready. The status changes to Ready, signalling front-of-house that the order can be picked up or served.",
      "Once the order is handed to the customer, tap Complete. The order moves to Completed and is removed from the active queue. Orders in Pending or Preparing can be Cancelled if needed.",
      "Customers who ordered by QR see this progress live on their phone — Order received, Being prepared, Ready to serve — so they're not constantly asking your staff if the food is ready.",
    ],
  },
  {
    icon: Banknote,
    title: "5. Set up GCash payments",
    body: [
      "Open QR Ordering and find the GCash section. Turn it on, then enter your GCash name and number and upload your personal GCash QR code image. This connects your own wallet — no payment gateway, no monthly fees, and no KYC paperwork.",
      "Easiest setup — print both QRs on the table card. With GCash turned on, the Print all button on the QR Ordering page produces a table card that includes your GCash QR right below the table's ordering QR. Place one on every table so customers can open GCash, tap Scan QR, and scan the printed code directly — no screenshots, no saving to Photos, no switching apps. The exact total to pay is shown on their order screen.",
      "If you'd rather not print it, your GCash QR also appears on the customer's phone after they order. They can press and hold to save it to their Photos, then open GCash → Scan QR → upload from gallery — or simply copy your number to send money. Either way, the exact order total is shown so they know how much to pay.",
      "Once they've sent payment, the customer taps \"I've paid via GCash.\" This does not auto-mark the order paid — it sends your staff a notification to confirm. Your team verifies the money arrived before marking it paid, so you're always in control.",
    ],
  },
  {
    icon: ClipboardList,
    title: "6. Record payment",
    body: [
      "Open any order and tap Mark Paid. Choose the payment method — Cash, GCash, or Card — and confirm. If a customer submitted a GCash payment, the order shows a \"GCash · says paid\" flag and the button reads Confirm GCash Paid — just verify the money landed and confirm.",
      "You can mark an order as paid at any point: while it's Pending, Preparing, Ready, or Completed. Payment status is visible on the orders list so nothing slips through at the end of a shift.",
    ],
  },
  {
    icon: BarChart3,
    title: "7. Track your sales and analytics",
    body: [
      "The Dashboard shows today's revenue, total orders, and a live breakdown of Pending, Preparing, Ready, and Completed orders. Hit Refresh at any time to pull the latest numbers.",
      "The Analytics page shows a 7-day revenue trend line, a breakdown of Dine-in vs. Takeaway orders, and a bar chart of your top-selling items by order count.",
      "Plan Usage shows how many menu items and orders you've used against your plan's limits — useful if you're on the Free plan and approaching the cap.",
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
            Build your menu, let customers order and pay by GCash from a table QR code, manage your kitchen queue, and track daily sales — this guide walks through every step.
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
