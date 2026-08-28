"use client"

import { useState, useEffect, useRef } from "react"
import {
  UtensilsCrossed, ClipboardList, ChefHat, BarChart3, ShoppingBag,
  Banknote, QrCode, Smartphone, Zap, CheckCircle2,
  ChevronRight, Menu, X,
} from "lucide-react"
import { usePricing, type Plan } from "@/lib/usePricing"
import InternalLinks from "@/components/InternalLinks"
import BookDemoForm from "@/components/BookDemoForm"
import { shot, SHOT_W, SHOT_H } from "@/lib/cloudinary"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

const FEATURES = [
  { icon: UtensilsCrossed, title: "Menu Builder", desc: "Create categories and add items with photos, descriptions, and prices. Toggle items available or 86'd in seconds. Your menu updates instantly for everyone placing orders." },
  { icon: QrCode, title: "QR Table Ordering", desc: "Print one QR code per table. Customers scan, browse your live menu, and place their own order from their phone - no app to download and no login required. Orders drop straight into your kitchen queue." },
  { icon: Smartphone, title: "Live Order Tracking", desc: "After ordering, customers see a live status tracker on their phone - Order received, Being prepared, Ready to serve. Less asking \"is my food ready?\" and fewer interruptions for your staff." },
  { icon: ShoppingBag, title: "Dine-in & Takeaway Orders", desc: "Place orders in under a minute. Assign a table number for dine-in or a customer name for takeaway. Add item-level notes and a per-order memo." },
  { icon: ChefHat, title: "Kitchen Queue", desc: "Every order enters as Pending. Move it to Preparing when you start cooking, Ready when it's done, Completed when served. Your team always knows what to do next." },
  { icon: ClipboardList, title: "Order History", desc: "Filter orders by status, type, or date. View every order's line items, total, and payment status. Cancel orders from Pending or Preparing at any time." },
  { icon: BarChart3, title: "Sales Analytics", desc: "Today's revenue, order count, and status breakdown on one screen. A 7-day revenue trend and top-selling items chart refresh automatically with every new order." },
  { icon: Banknote, title: "GCash & Payment Tracking", desc: "Show your own GCash QR right on the customer's phone so they can pay in seconds. Customers tap \"I've paid\" and your staff confirm - money goes straight to your wallet, no payment-gateway fees or KYC. Mark orders paid by Cash, GCash, or Card." },
  { icon: Zap, title: "Auto Order Numbers", desc: "Each order gets a sequential number (#001, #002, …) the moment it's placed. Numbers reset cleanly so your kitchen and counter always share the same reference." },
  { icon: CheckCircle2, title: "Team Access", desc: "Invite staff as Admin or Member. Set per-feature permissions - front-of-house can place orders, kitchen staff can advance queue status, managers get analytics." },
]

const STEPS = [
  { num: "01", title: "Build your menu", desc: "Create categories (Appetizers, Mains, Drinks, Desserts) and add items with photos, descriptions, and prices. Mark items available or sold-out at any time." },
  { num: "02", title: "Print your table QR", desc: "Turn on QR ordering and print one code per table. Customers scan, browse your live menu, and place their own order - or your staff can take orders from the dashboard. New orders pop into the queue instantly." },
  { num: "03", title: "Work the kitchen queue", desc: "New orders appear as Pending. Tap to move them to Preparing, then Ready, then Completed. Customers watch the live status on their phone. Cancel from Pending or Preparing if needed." },
  { num: "04", title: "Get paid & track sales", desc: "Customers pay by Cash or scan your GCash QR and tap \"I've paid\" for staff to confirm. Your dashboard shows today's revenue, top items, and a 7-day trend in real time." },
]

const FAQS = [
  { q: "Can customers order directly from their phone?", a: "Yes. Turn on QR ordering and print one QR code per table. Customers scan it, browse your live menu, and place their own order from their phone, no app to download and no login required. Orders drop straight into your kitchen queue, and your staff can still place orders from the dashboard too. Customers also see a live status tracker (Order received → Being prepared → Ready to serve) on their phone." },
  { q: "Can customers pay with GCash?", a: "Yes. Add your own GCash name, number, and QR code in settings and it shows right on the customer's phone after they order. They can scan it or copy your number to send payment, then tap \"I've paid via GCash.\" Your staff confirm the payment before it's marked paid, money goes straight to your own GCash wallet with no payment-gateway fees, no monthly cost, and no KYC paperwork." },
  { q: "Is there really a free plan?", a: "Yes. The free plan includes up to 20 menu items, 100 orders per month, the full kitchen queue, the daily sales dashboard, and 2 team members, no credit card required. Upgrade only when your volume grows." },
  { q: "How does the kitchen queue work?", a: "Every new order lands in the queue as Pending. A staff member moves it to Preparing when cooking starts, Ready when the food is done, and Completed when served or picked up. Orders can be cancelled from Pending or Preparing." },
  { q: "Can I add photos to menu items?", a: "Yes. When you create or edit a menu item, you can upload a photo. Photos are shown to the staff member placing the order, useful for visually identifying items or matching presentation standards." },
  { q: "What payment methods can I record?", a: "You can mark any order as paid by Cash, GCash, or Card. With GCash, customers can pay themselves by scanning your QR on their phone and tapping \"I've paid\" for staff to confirm. Payment status is tracked per order and visible on the orders list, so you know exactly what has and hasn't been settled at the end of a shift." },
]

export type RestaurantVariant = {
  currentPath: string
  navMode: "anchors" | "page"
  hero: { badge: string; titleLead: string; titleAccent: string; subtitle: string }
  features: { eyebrow: string; heading: string; sub: string }
  cta: { heading: string; sub: string }
  /**
   * Per-page editorial block. Optional on purpose: /restaurant deliberately has
   * none, so it stays exactly as it was. Every sub-page supplies its own so the
   * six URLs in this cluster stop sharing 90% of their body copy.
   */
  unique?: {
    eyebrow: string
    heading: string
    intro: string
    blocks: { h: string; p: string }[]
  }
}

const PRODUCT = "RESTAURANT"
const HOME = "/restaurant"
const GUIDE = "/restaurant/guide"
const BRAND = "Smapey Food"
const FOOTER_BRAND = "Food Ordering by Smapey"
const CLUSTER = "restaurant"
const registerUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=${PRODUCT}&plan=FREE`

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } }, { threshold: 0.15, ...options })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, inView }
}

function Animate({ children, className = "", delay = 0, style }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className={className} style={{ ...style, transitionProperty: "opacity, transform", transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDelay: `${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)" }}>
      {children}
    </div>
  )
}

function Navbar({ variant }: { variant: RestaurantVariant }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const id = "smapey-pop-fonts"
    if (!document.getElementById(id)) {
      const l = document.createElement("link"); l.id = id; l.rel = "stylesheet"
      l.href = "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap"
      document.head.appendChild(l)
    }
  }, [])
  const links = variant.navMode === "anchors"
    ? [{ href: "#features", label: "Features" }, { href: "#how-it-works", label: "How it Works" }, { href: "#pricing", label: "Pricing" }, { href: "#faq", label: "FAQ" }, { href: GUIDE, label: "Guide" }]
    : [{ href: HOME, label: "Home" }, { href: "#features", label: "Features" }, { href: "#pricing", label: "Pricing" }, { href: "#faq", label: "FAQ" }, { href: GUIDE, label: "Guide" }]
  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href={HOME} className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold tracking-tight" style={{ color: INK }}>{BRAND}</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (<a key={l.label} href={l.href} className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>{l.label}</a>))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm font-semibold hover:opacity-60 transition-opacity px-2 py-2" style={{ color: INK }}>Sign in</a>
          <a href={registerUrl} className="text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>Get started free</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: INK }}>{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
          {links.map((l) => (<a key={l.label} href={l.href} className="text-sm font-semibold" style={{ color: INK }}>{l.label}</a>))}
          <a href={registerUrl} className="text-sm font-bold px-4 py-2.5 rounded-full border-2 text-center" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>Get started free</a>
        </div>
      )}
    </nav>
  )
}

function Hero({ variant }: { variant: RestaurantVariant }) {
  return (
    <section className="relative min-h-screen flex items-center pt-16 px-6 sm:px-12 lg:px-20 overflow-hidden" style={{ background: "#1a1410", fontFamily: display.fontFamily }}>
      {/* ── Full-bleed photo backdrop (replace with your image) ── */}
      <div className="absolute inset-0" aria-hidden>
        {/* TODO: real photo, e.g. <img src="/restaurant-hero.jpg" className="w-full h-full object-cover" /> */}
        <div className="absolute inset-0" style={{ background: "repeating-linear-gradient(125deg,#241a12 0 28px,#2b2016 28px 56px)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(16,12,9,.92) 0%, rgba(16,12,9,.72) 42%, rgba(16,12,9,.25) 100%)" }} />
      </div>
      {/* amber corner accent */}
      <div className="absolute top-0 left-0 pointer-events-none" style={{ width: 0, height: 0, borderTop: `120px solid ${AMBER}`, borderRight: "120px solid transparent" }} aria-hidden />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 text-xs font-bold mb-6" style={{ background: "rgba(255,255,255,.12)", color: AMBER, borderColor: AMBER, backdropFilter: "blur(4px)" }}>
            <Zap className="w-3 h-3" />
            {variant.hero.badge}
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-[1.02] tracking-tight mb-6 text-white">
            {variant.hero.titleLead} <span style={{ color: AMBER }}>{variant.hero.titleAccent}</span>
          </h1>
          <p className="text-lg max-w-lg mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,.8)" }}>
            {variant.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=RESTAURANT&plan=FREE`} className="flex items-center justify-center gap-2 px-7 py-4 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: AMBER, boxShadow: "4px 4px 0 rgba(0,0,0,.4)" }}>
              Start free, no card needed <ChevronRight className="w-4 h-4" />
            </a>
            <a href="/restaurant" className="flex items-center justify-center px-7 py-4 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: "rgba(255,255,255,.1)", color: "#fff", borderColor: "#fff", backdropFilter: "blur(4px)" }}>
              View all features
            </a>
          </div>
          <div className="flex flex-wrap gap-5 text-xs font-semibold" style={{ color: "rgba(255,255,255,.8)" }}>
            {["No credit card required", "Free plan forever", "Setup in 5 minutes"].map((t) => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" style={{ color: "#34d399" }} />{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* floating glass order ticket (desktop only) */}
      <div className="absolute right-[70px] top-1/2 z-10 hidden lg:block w-[280px] rounded-[20px] border-2 overflow-hidden" style={{ transform: "translateY(-50%) rotate(3deg)", background: "rgba(255,255,255,.96)", borderColor: INK, boxShadow: "8px 8px 0 rgba(0,0,0,.45)" }} aria-hidden>
        <div className="flex items-center justify-between px-[17px] py-[13px]" style={{ background: INK }}>
          <span className="text-[13px] font-extrabold text-white">Order #042</span>
          <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full" style={{ background: AMBER, color: INK }}>DINE-IN · T7</span>
        </div>
        <div className="px-[17px] py-4 flex flex-col gap-2.5">
          {[["2× Beef Tapa", "₱340"], ["1× Iced Latte", "₱120"], ["1× Garlic Rice", "₱55"]].map(([item, price]) => (
            <div key={item} className="flex justify-between text-[13px] font-bold" style={{ color: INK }}><span>{item}</span><span>{price}</span></div>
          ))}
          <div className="flex justify-between text-sm font-extrabold pt-2.5" style={{ color: INK, borderTop: `2px solid ${INK}` }}><span>Total</span><span>₱515</span></div>
          <div className="flex items-center gap-1.5 text-[11px] font-extrabold" style={{ color: "#b07219" }}><span className="w-[7px] h-[7px] rounded-full" style={{ background: AMBER }} />FIRING IN KITCHEN</div>
        </div>
      </div>
    </section>
  )
}

const SHOWCASE = [
  {
    img: shot("v1780501558/qr-table-ordering.jpg_acd7i7.png"),
    alt: "Customer scanning a table QR code to open the restaurant's menu on her phone",
    eyebrow: "QR Table Ordering",
    title: "Scan the table QR",
    desc: "Each table gets its own QR code. Customers scan it with their phone camera to open your menu, no app to download and no login required.",
    bullets: ["One QR code per table", "No app download needed", "No customer login required"],
  },
  {
    img: shot("v1780501566/qr-menu-flatlay.jpg_jlghqo.png"),
    alt: "Smartphone showing a live food-ordering menu beside a table QR code and a plate of food",
    eyebrow: "Live Menu",
    title: "Order from your live menu",
    desc: "Your menu opens instantly on their phone. Guests browse photos and prices, add items to the cart, and send the order straight to your kitchen.",
    bullets: ["Menu opens instantly on their phone", "Browse, customize, add to cart", "Order sent straight to the kitchen"],
  },
  {
    img: shot("v1780502461/kitchen_order_que_swwjp4.png"),
    alt: "Restaurant chef cooking while checking the Smapey kitchen order queue on a mounted tablet",
    eyebrow: "Kitchen Display",
    title: "Work the kitchen queue",
    desc: "Orders land in your kitchen instantly. Staff tap to mark each one preparing, ready, and done, no paper tickets, no missed orders, no shouting across the floor.",
    bullets: ["Orders land instantly", "Tap to mark preparing, ready, done", "No paper tickets or missed orders"],
  },
  {
    img: shot("v1780506039/pay_with_gcash_kpt7xs.png"),
    alt: "Customer paying with GCash on her phone by scanning the restaurant's GCash QR code at the table",
    eyebrow: "GCash Payment",
    title: "Pay with GCash",
    desc: "Customers scan your GCash QR, pay from their phone, and tap “I've paid”, you confirm it in Orders. No payment gateway to set up and no transaction fees.",
    bullets: ["Customers scan your GCash QR", "Pay from their own phone", "No gateway, no transaction fees"],
  },
]

function Showcase() {
  return (
    <section className="py-24" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-20">
        {SHOWCASE.map((s, i) => {
          const c = i % 2 === 0 ? BLUE : AMBER
          const reverse = i % 2 === 1
          return (
            <Animate key={s.title}>
              <div className={`flex flex-col gap-8 md:gap-12 items-center ${reverse ? "md:flex-row-reverse" : "md:flex-row"}`}>
                <div className="w-full md:w-1/2">
                  <div className="rounded-[22px] border-2 overflow-hidden" style={{ borderColor: INK, boxShadow: `8px 8px 0 ${c}` }}>
                    <img src={s.img} alt={s.alt} width={SHOT_W} height={SHOT_H} loading="lazy" decoding="async" className="w-full h-auto block" />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: c === AMBER ? "#b06c00" : BLUE }}>{s.eyebrow}</p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>{s.title}</h3>
                  <p className="leading-relaxed mb-5" style={{ color: "#54514c" }}>{s.desc}</p>
                  <ul className="space-y-2.5">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: c === AMBER ? AMBER : BLUE }} />
                        <span style={{ color: "#3f3b36" }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Animate>
          )
        })}
      </div>
    </section>
  )
}

function Unique({ variant }: { variant: RestaurantVariant }) {
  const u = variant.unique
  if (!u) return null
  return (
    <section className="py-24" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="max-w-4xl mx-auto px-6">
        <Animate className="mb-12">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>{u.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: INK }}>{u.heading}</h2>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: "#54514c" }}>{u.intro}</p>
        </Animate>
        <div className="grid sm:grid-cols-2 gap-6">
          {u.blocks.map(({ h, p }, i) => (
            <Animate key={h} delay={i * 80}>
              <div className="rounded-[22px] p-6 border-2 h-full bg-white" style={{ borderColor: INK, boxShadow: `6px 6px 0 ${i % 2 === 0 ? BLUE : AMBER}` }}>
                <h3 className="font-extrabold mb-2" style={{ color: INK }}>{h}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{p}</p>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  )
}

function Features({ variant }: { variant: RestaurantVariant }) {
  return (
    <section id="features" className="py-24" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>{variant.features.eyebrow}</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>{variant.features.heading}</h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: "#54514c" }}>{variant.features.sub}</p>
        </Animate>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }, i) => {
            const c = i % 2 === 0 ? BLUE : AMBER
            return (
              <Animate key={title} delay={i * 80}>
                <div className="rounded-[22px] p-6 border-2 h-full transition-transform hover:-translate-y-1" style={{ background: CREAM, borderColor: INK, boxShadow: `6px 6px 0 ${c}` }}>
                  <div className="w-12 h-12 rounded-[14px] border-2 flex items-center justify-center mb-4" style={{ background: c, borderColor: INK }}>
                    <Icon className="w-5 h-5" style={{ color: c === AMBER ? INK : "#fff" }} />
                  </div>
                  <h3 className="font-extrabold mb-2" style={{ color: INK }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{desc}</p>
                </div>
              </Animate>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const acc = [BLUE, AMBER, BLUE, AMBER]
  return (
    <section id="how-it-works" className="py-24" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>How it Works</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>Up and running in minutes</h2>
        </Animate>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map(({ num, title, desc }, i) => (
            <Animate key={num} delay={i * 120}>
              <div className="rounded-[22px] border-2 p-8 h-full transition-transform hover:-translate-y-1" style={{ background: "#fff", borderColor: INK, boxShadow: `6px 6px 0 ${acc[i % acc.length]}` }}>
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-[16px] border-2 font-extrabold text-lg mb-5" style={{ background: acc[i % acc.length], color: acc[i % acc.length] === AMBER ? INK : "#fff", borderColor: INK }}>{num}</div>
                <h3 className="font-extrabold mb-2" style={{ color: INK }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{desc}</p>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const { plans, isPhilippines } = usePricing(PRODUCT)
  const handleSelect = (p: Plan) => { if (p.planKey === "FREE") { window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=${p.product}&plan=FREE`; return } setSelectedPlan(p) }
  return (
    <section id="pricing" className="py-24" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>Pricing</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>Start free. Upgrade when ready.</h2>
          <p className="mt-4" style={{ color: "#54514c" }}>The free plan stays free forever.</p>
          {isPhilippines !== null && (
            <div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1 rounded-full bg-white border-2 text-xs font-semibold" style={{ borderColor: INK, color: INK }}>
              <span>{isPhilippines ? "🇵🇭" : "🌍"}</span>
              <span>Prices in <span className="font-extrabold">{isPhilippines ? "Philippine Peso (₱)" : "US Dollar ($)"}</span></span>
            </div>
          )}
        </Animate>
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p, i) => {
            const displayPrice = isPhilippines === null ? "..." : isPhilippines ? p.phpPrice : p.usdPrice
            return (
              <Animate key={p.name} delay={i * 100}>
                <div className="rounded-[24px] p-8 border-2 h-full transition-transform hover:-translate-y-1" style={p.highlight ? { background: BLUE, borderColor: INK, boxShadow: `8px 8px 0 ${INK}`, color: "#fff" } : { background: "#fff", borderColor: INK, boxShadow: `8px 8px 0 ${AMBER}` }}>
                  {p.highlight && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border-2 text-xs font-bold mb-4" style={{ background: AMBER, color: INK, borderColor: INK }}><Zap className="w-3 h-3" /> Most popular</span>}
                  <p className="font-extrabold text-lg mb-1" style={{ color: p.highlight ? "#fff" : INK }}>{p.name}</p>
                  <p className="text-sm mb-4" style={{ color: p.highlight ? "rgba(255,255,255,.7)" : "#9a948b" }}>{p.desc}</p>
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-4xl font-extrabold tracking-tight" style={{ color: p.highlight ? "#fff" : INK }}>{displayPrice}</span>
                    <span className="text-sm mb-1" style={{ color: p.highlight ? "rgba(255,255,255,.6)" : "#9a948b" }}>{p.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {p.features.map((f) => (<li key={f} className="flex items-center gap-2.5 text-sm"><CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: p.highlight ? AMBER : BLUE }} /><span style={{ color: p.highlight ? "rgba(255,255,255,.85)" : "#3f3b36" }}>{f}</span></li>))}
                  </ul>
                  <button onClick={() => handleSelect(p)} className="w-full text-center py-3 rounded-full text-sm font-bold border-2 transition-transform hover:-translate-y-0.5" style={p.highlight ? { ...display, background: AMBER, color: INK, borderColor: INK } : { ...display, background: INK, color: "#fff", borderColor: INK }}>{p.cta}</button>
                </div>
              </Animate>
            )
          })}
        </div>
      </div>
      {selectedPlan && <PaymentModal plan={selectedPlan} isPhilippines={isPhilippines ?? false} onClose={() => setSelectedPlan(null)} />}
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="py-24" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="max-w-2xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>FAQ</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>Common questions</h2>
        </Animate>
        <div className="flex flex-col gap-3">
          {FAQS.map(({ q, a }, i) => (
            <Animate key={i} delay={i * 60}>
              <div className="rounded-[18px] overflow-hidden border-2 bg-white" style={{ borderColor: INK }}>
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-sm" style={{ color: INK }}>{q}<ChevronRight className="w-4 h-4 transition-transform duration-200 shrink-0" style={{ color: BLUE, transform: open === i ? "rotate(90deg)" : "rotate(0deg)" }} /></button>
                {open === i && <div className="px-5 pb-4 text-sm leading-relaxed pt-3" style={{ color: "#54514c", borderTop: "1px solid rgba(22,22,22,.1)" }}>{a}</div>}
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA({ variant }: { variant: RestaurantVariant }) {
  return (
    <section className="py-24 px-6" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <Animate className="relative max-w-3xl mx-auto rounded-[30px] border-2 p-12 md:p-16 text-center" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4" style={{ color: INK }}>{variant.cta.heading}</h2>
        <p className="mb-8 font-medium" style={{ color: "#5c4a28" }}>{variant.cta.sub}</p>
        <a href={registerUrl} className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>Get started for free <ChevronRight className="w-4 h-4" /></a>
      </Animate>
    </section>
  )
}

function Footer() {
  return (
    <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2"><img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" /><span className="text-sm font-extrabold" style={{ color: INK }}>{FOOTER_BRAND}</span></div>
        <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
      </div>
    </footer>
  )
}

type CheckoutMethod = "paypal" | "paymongo"
const Spinner = () => (<svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>)

function PaymentModal({ plan, isPhilippines, onClose }: { plan: { name: string; phpPrice: string; usdPrice: string; period: string; planKey: string; product: string } | null; isPhilippines: boolean; onClose: () => void }) {
  const [step, setStep] = useState<"details" | "payment">("details")
  const [name, setName] = useState(""); const [email, setEmail] = useState("")
  const [loading, setLoading] = useState<CheckoutMethod | null>(null)
  const [token, setToken] = useState<string | null>(null)
  useEffect(() => { const t = localStorage.getItem("accessToken"); setToken(t); if (t) setStep("payment") }, [])
  if (!plan) return null
  const displayPrice = isPhilippines ? plan.phpPrice : plan.usdPrice
  const inputStyle = { borderColor: INK, color: INK } as React.CSSProperties
  const checkout = async (method: CheckoutMethod) => {
    try {
      setLoading(method)
      const endpoint = token ? (method === "paypal" ? "/api/billing/subscribe/paypal" : "/api/billing/subscribe/paymongo") : (method === "paypal" ? "/api/billing/newaccount/paypal" : "/api/billing/newaccount/paymongo")
      const payload = token ? { product: plan.product, plan: plan.planKey } : { name, email, product: plan.product, plan: plan.planKey }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, { method: "POST", headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || JSON.stringify(data))
      const redirectUrl = data.approveUrl || data.checkoutUrl
      if (!redirectUrl) throw new Error("No redirect URL returned")
      window.location.href = redirectUrl
    } catch (err: any) { alert(err?.message || "Checkout failed. Please try again.") } finally { setLoading(null) }
  }
  const handleContinue = () => { if (!name.trim() || !email.trim()) { alert("Name and email are required"); return } if (!isPhilippines) { checkout("paypal") } else { setStep("payment") } }
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" style={{ fontFamily: display.fontFamily }}>
      <div className="bg-white rounded-[22px] w-full max-w-md overflow-hidden border-2" style={{ borderColor: INK, boxShadow: `10px 10px 0 ${AMBER}` }}>
        <div className="px-6 py-5 flex items-center justify-between" style={{ background: INK }}>
          <div className="flex items-center gap-3">
            {step === "payment" && !token && <button onClick={() => setStep("details")} className="text-white/70 hover:text-white transition"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 5l-7 7 7 7"/></svg></button>}
            <div><h2 className="text-white font-extrabold text-lg">{step === "details" ? "Create your account" : "Choose payment method"}</h2><p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,.7)" }}>{plan.name} plan, <span className="font-bold" style={{ color: AMBER }}>{displayPrice}</span>{plan.period}</p></div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          {step === "details" && (<>
            <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={inputStyle} />
            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-2 rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={inputStyle} />
            <button onClick={handleContinue} disabled={loading !== null} className="w-full py-3 rounded-full border-2 font-bold text-sm flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 disabled:opacity-60" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>{loading ? <><Spinner /> Redirecting…</> : <>Continue <ChevronRight className="w-4 h-4" /></>}</button>
          </>)}
          {step === "payment" && (<>
            {isPhilippines && (<button onClick={() => checkout("paymongo")} disabled={loading !== null} className="w-full flex items-center gap-4 px-5 py-4 border-2 rounded-2xl transition-all group" style={{ borderColor: INK }}><div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center shrink-0"><svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z"/></svg></div><div className="flex-1 text-left"><p className="text-sm font-bold" style={{ color: INK }}>QR Ph / GCash / Card</p><p className="text-xs" style={{ color: "#9a948b" }}>Philippine payment methods</p></div>{loading === "paymongo" ? <Spinner /> : <ChevronRight className="w-4 h-4" style={{ color: INK }} />}</button>)}
            <button onClick={() => checkout("paypal")} disabled={loading !== null} className="w-full flex items-center gap-4 px-5 py-4 border-2 rounded-2xl transition-all group" style={{ borderColor: INK }}><div className="w-10 h-10 rounded-xl bg-[#003087] flex items-center justify-center shrink-0"><svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c1.379 8.883-5.43 11.61-10.377 11.61H8.23l-1.133 7.184h3.78c.458 0 .848-.332.92-.783l.038-.196.728-4.617.047-.252a.93.93 0 0 1 .919-.784h.578c3.746 0 6.678-1.522 7.534-5.927.358-1.833.173-3.363-.42-4.494z"/></svg></div><div className="flex-1 text-left"><p className="text-sm font-bold" style={{ color: INK }}>PayPal</p><p className="text-xs" style={{ color: "#9a948b" }}>Pay with your PayPal account</p></div>{loading === "paypal" ? <Spinner /> : <ChevronRight className="w-4 h-4" style={{ color: INK }} />}</button>
          </>)}
          <p className="text-center text-xs flex items-center justify-center gap-1" style={{ color: "#9a948b" }}><svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>Secure checkout · Cancel anytime · No hidden fees</p>
        </div>
      </div>
    </div>
  )
}

export default function RestaurantLanding({ variant }: { variant: RestaurantVariant }) {
  return (
    <main>
      <Navbar variant={variant} />
      <Hero variant={variant} />
      <Showcase />
      <Unique variant={variant} />
      <Features variant={variant} />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <BookDemoForm product={PRODUCT} />
      <CTA variant={variant} />
      <InternalLinks cluster={CLUSTER} currentPath={variant.currentPath} />
      <Footer />
    </main>
  )
}
