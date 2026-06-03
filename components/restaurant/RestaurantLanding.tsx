"use client"

import { useState, useEffect, useRef } from "react"
import BookDemoForm from "@/components/BookDemoForm"
import {
  UtensilsCrossed, ClipboardList, ChefHat, BarChart3, ShoppingBag,
  Banknote, CheckCircle2, ChevronRight, Menu, X, Zap, XCircle,
  QrCode, Smartphone,
  CalendarCheck,
} from "lucide-react"
import { usePricing, type Plan } from "@/lib/usePricing"
import InternalLinks from "@/components/InternalLinks"

const FEATURES = [
  {
    icon: UtensilsCrossed,
    title: "Menu Builder",
    desc: "Create categories and add items with photos, descriptions, and prices. Toggle items available or 86'd in seconds. Your menu updates instantly for everyone placing orders.",
    color: "from-orange-500 to-amber-400",
    shadow: "shadow-orange-500/30",
  },
  {
    icon: QrCode,
    title: "QR Table Ordering",
    desc: "Print one QR code per table. Customers scan, browse your live menu, and place their own order from their phone — no app to download and no login required. Orders drop straight into your kitchen queue.",
    color: "from-orange-500 to-amber-400",
    shadow: "shadow-orange-500/30",
  },
  {
    icon: Smartphone,
    title: "Live Order Tracking",
    desc: "After ordering, customers see a live status tracker on their phone — Order received, Being prepared, Ready to serve. Less asking \"is my food ready?\" and fewer interruptions for your staff.",
    color: "from-orange-500 to-amber-400",
    shadow: "shadow-orange-500/30",
  },
  {
    icon: ShoppingBag,
    title: "Dine-in & Takeaway Orders",
    desc: "Place orders in under a minute. Assign a table number for dine-in or a customer name for takeaway. Add item-level notes and a per-order memo.",
    color: "from-orange-500 to-amber-400",
    shadow: "shadow-orange-500/30",
  },
  {
    icon: ChefHat,
    title: "Kitchen Queue",
    desc: "Every order enters as Pending. Move it to Preparing when you start cooking, Ready when it's done, Completed when served. Your team always knows what to do next.",
    color: "from-orange-500 to-amber-400",
    shadow: "shadow-orange-500/30",
  },
  {
    icon: ClipboardList,
    title: "Order History",
    desc: "Filter orders by status, type, or date. View every order's line items, total, and payment status. Cancel orders from Pending or Preparing at any time.",
    color: "from-orange-500 to-amber-400",
    shadow: "shadow-orange-500/30",
  },
  {
    icon: BarChart3,
    title: "Sales Analytics",
    desc: "Today's revenue, order count, and status breakdown on one screen. A 7-day revenue trend and top-selling items chart refresh automatically with every new order.",
    color: "from-orange-500 to-amber-400",
    shadow: "shadow-orange-500/30",
  },
  {
    icon: Banknote,
    title: "GCash & Payment Tracking",
    desc: "Show your own GCash QR right on the customer's phone so they can pay in seconds. Customers tap \"I've paid\" and your staff confirm — money goes straight to your wallet, no payment-gateway fees or KYC. Mark orders paid by Cash, GCash, or Card and track every payment per order.",
    color: "from-orange-500 to-amber-400",
    shadow: "shadow-orange-500/30",
  },
  {
    icon: Zap,
    title: "Auto Order Numbers",
    desc: "Each order gets a sequential number (#001, #002, …) the moment it's placed. Numbers reset cleanly so your kitchen and counter always share the same reference.",
    color: "from-orange-500 to-amber-400",
    shadow: "shadow-orange-500/30",
  },
  {
    icon: CheckCircle2,
    title: "Team Access",
    desc: "Invite staff as Admin or Member. Set per-feature permissions — front-of-house can place orders, kitchen staff can advance queue status, managers get analytics.",
    color: "from-orange-500 to-amber-400",
    shadow: "shadow-orange-500/30",
  },
]

const STEPS = [
  { num: "01", title: "Build your menu", desc: "Create categories (Appetizers, Mains, Drinks, Desserts) and add items with photos, descriptions, and prices. Mark items available or sold-out at any time." },
  { num: "02", title: "Print your table QR", desc: "Turn on QR ordering and print one code per table. Customers scan, browse your live menu, and place their own order — or your staff can take orders from the dashboard. New orders pop into the queue instantly." },
  { num: "03", title: "Work the kitchen queue", desc: "New orders appear as Pending. Tap to move them to Preparing, then Ready, then Completed. Customers watch the live status on their phone. Cancel from Pending or Preparing if needed." },
  { num: "04", title: "Get paid & track sales", desc: "Customers pay by Cash or scan your GCash QR and tap \"I've paid\" for staff to confirm. Your dashboard shows today's revenue, top items, and a 7-day trend in real time." },
]

const FEATURE_ROWS = [
  { feature: "Menu categories", free: true, pro: true, enterprise: true },
  { feature: "Menu item photos", free: true, pro: true, enterprise: true },
  { feature: "QR table ordering", free: true, pro: true, enterprise: true },
  { feature: "Live order tracking", free: true, pro: true, enterprise: true },
  { feature: "Dine-in & takeaway orders", free: true, pro: true, enterprise: true },
  { feature: "Kitchen queue (Pending → Done)", free: true, pro: true, enterprise: true },
  { feature: "GCash QR payment", free: true, pro: true, enterprise: true },
  { feature: "Daily sales dashboard", free: true, pro: true, enterprise: true },
  { feature: "Analytics & top items", free: true, pro: true, enterprise: true },
  { feature: "Priority support", free: false, pro: false, enterprise: true },
]

function limitDisplay(plan: Plan | undefined, key: string): string {
  if (!plan) return "…"
  const val = plan.limits?.[key]
  if (val === -1 || val === null || val === undefined) return "Unlimited"
  return String(val)
}

const FAQS = [
  {
    q: "Can customers order directly from their phone?",
    a: "Yes. Turn on QR ordering and print one QR code per table. Customers scan it, browse your live menu, and place their own order from their phone — no app to download and no login required. Orders drop straight into your kitchen queue, and your staff can still place orders from the dashboard too. Customers also see a live status tracker (Order received → Being prepared → Ready to serve) on their phone.",
  },
  {
    q: "Can customers pay with GCash?",
    a: "Yes. Add your own GCash name, number, and QR code in settings and it shows right on the customer's phone after they order. They can scan it or copy your number to send payment, then tap \"I've paid via GCash.\" Your staff confirm the payment before it's marked paid — money goes straight to your own GCash wallet with no payment-gateway fees, no monthly cost, and no KYC paperwork.",
  },
  {
    q: "Is there really a free plan?",
    a: "Yes. The free plan includes up to 20 menu items, 100 orders per month, the full kitchen queue, the daily sales dashboard, and 2 team members — no credit card required. Upgrade only when your volume grows.",
  },
  {
    q: "How does the kitchen queue work?",
    a: "Every new order lands in the queue as Pending. A staff member moves it to Preparing when cooking starts, Ready when the food is done, and Completed when served or picked up. Orders can be cancelled from Pending or Preparing.",
  },
  {
    q: "Can I add photos to menu items?",
    a: "Yes. When you create or edit a menu item, you can upload a photo. Photos are shown to the staff member placing the order — useful for visually identifying items or matching presentation standards.",
  },
  {
    q: "What payment methods can I record?",
    a: "You can mark any order as paid by Cash, GCash, or Card. With GCash, customers can pay themselves by scanning your QR on their phone and tapping \"I've paid\" for staff to confirm. Payment status is tracked per order and visible on the orders list, so you know exactly what has and hasn't been settled at the end of a shift.",
  },
]

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold: 0.15, ...options }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, inView }
}

function Animate({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className={className} style={{
      transitionProperty: "opacity, transform", transitionDuration: "600ms",
      transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDelay: `${delay}ms`,
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)",
    }}>
      {children}
    </div>
  )
}

export type RestaurantVariant = {
  currentPath: string
  navMode: "anchors" | "page"
  hero: {
    badge: string
    titleLead: string
    titleAccent: string
    subtitle: string
  }
  features: {
    eyebrow: string
    heading: string
    sub: string
  }
  cta: {
    heading: string
    sub: string
  }
}

const BG = "#0a0500"
const BG_CARD = "rgba(255,255,255,0.04)"
const ORANGE_GLOW = "rgba(249,115,22,0.18)"
const AMBER_GLOW  = "rgba(245,158,11,0.12)"

function Navbar({ variant }: { variant: RestaurantVariant }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  const links = variant.navMode === "anchors" ? (
    <>
      <a href="#features" className="text-sm text-white/60 hover:text-white transition-colors">Features</a>
      <a href="#how-it-works" className="text-sm text-white/60 hover:text-white transition-colors">How it Works</a>
      <a href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors">Pricing</a>
      <a href="#faq" className="text-sm text-white/60 hover:text-white transition-colors">FAQ</a>
      <a href="/restaurant/guide" className="text-sm text-white/60 hover:text-white transition-colors">Guide</a>
    </>
  ) : (
    <>
      <a href="/restaurant" className="text-sm text-white/60 hover:text-white transition-colors">Home</a>
      <a href="#features" className="text-sm text-white/60 hover:text-white transition-colors">Features</a>
      <a href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors">Pricing</a>
      <a href="#faq" className="text-sm text-white/60 hover:text-white transition-colors">FAQ</a>
      <a href="/restaurant/guide" className="text-sm text-white/60 hover:text-white transition-colors">Guide</a>
    </>
  )
  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0a0500]/90 backdrop-blur-md border-b border-white/5 shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/restaurant" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey Food Ordering" className="w-8 h-8 rounded-lg object-cover" />
          <span className="text-white font-bold tracking-tight">Smapey Food</span>
        </a>
        <div className="hidden md:flex items-center gap-8">{links}</div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2">Sign in</a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=RESTAURANT&plan=FREE`}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-white transition-colors shadow-lg shadow-orange-500/20">
            Get started free
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white/60 hover:text-white">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#0a0500] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {links}
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=RESTAURANT&plan=FREE`}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-orange-500 text-white text-center">
            Get started free
          </a>
        </div>
      )}
    </nav>
  )
}

function Hero({ variant }: { variant: RestaurantVariant }) {
  const secondary = variant.navMode === "anchors"
    ? { href: "#how-it-works", label: "See how it works" }
    : { href: "/restaurant", label: "View all features" }
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      style={{ background: BG, backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 28px)", backgroundSize: "28px 28px" }}>
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${ORANGE_GLOW} 0%, transparent 70%)` }} />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${AMBER_GLOW} 0%, transparent 70%)` }} />
      <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs font-semibold mb-6">
          <UtensilsCrossed className="w-3 h-3" />
          {variant.hero.badge}
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
          {variant.hero.titleLead}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-300">
            {variant.hero.titleAccent}
          </span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          {variant.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=RESTAURANT&plan=FREE`}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm transition-all shadow-lg shadow-orange-500/25">
            Start free — no card needed <ChevronRight className="w-4 h-4" />
          </a>
          <a href={secondary.href} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium text-sm transition-all border border-white/10">
            {secondary.label}
          </a>
          <a
            href="#book-demo"
            onClick={(e) => { e.preventDefault(); document.getElementById("book-demo")?.scrollIntoView({ behavior: "smooth" }) }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium text-sm transition-all border border-white/10"
          >
            <CalendarCheck className="w-4 h-4" />
            Book a Demo
          </a>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-white/30 text-xs">
          {["No credit card required", "Free plan forever", "First order in under 5 minutes"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-400/70" />{t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Showcase() {
  const shots = [
    {
      src: "https://res.cloudinary.com/dxhwfv0jo/image/upload/v1780501558/qr-table-ordering.jpg_acd7i7.png",
      alt: "Customer scanning a table QR code to open the restaurant's menu on her phone",
      title: "Scan the table QR",
      desc: "Each table gets its own QR code. Customers scan it with their phone camera — no app to download and no login required.",
    },
    {
      src: "https://res.cloudinary.com/dxhwfv0jo/image/upload/v1780501566/qr-menu-flatlay.jpg_jlghqo.png",
      alt: "Smartphone showing a live food-ordering menu beside a table QR code and a plate of food",
      title: "Order from your live menu",
      desc: "Your menu opens instantly on their phone. They browse, add to cart, and send the order straight to your kitchen.",
    },
    {
      src: "https://res.cloudinary.com/dxhwfv0jo/image/upload/v1780502461/kitchen_order_que_swwjp4.png",
      alt: "Restaurant chef cooking while checking the Smapey kitchen order queue on a mounted tablet",
      title: "Work the kitchen queue",
      desc: "Orders land in your kitchen instantly. Staff tap to mark each one preparing, ready, and done — no paper tickets, no shouting.",
    },
  ]
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-14">
          <p className="text-orange-600 text-sm font-semibold uppercase tracking-widest mb-3">QR table ordering</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Let customers order from their own phone
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Print one QR code per table. Guests scan, browse your live menu, and place their own order — your staff just works the kitchen queue.
          </p>
        </Animate>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shots.map((s, i) => (
            <Animate key={s.src} delay={i * 100}>
              <figure className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                <img src={s.src} alt={s.alt} loading="lazy" className="w-full aspect-video object-cover" />
                <figcaption className="p-6">
                  <h3 className="font-bold text-slate-800 mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                </figcaption>
              </figure>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  )
}

function Features({ variant }: { variant: RestaurantVariant }) {
  return (
    <section id="features" className="py-24 bg-orange-50/40">
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-orange-600 text-sm font-semibold uppercase tracking-widest mb-3">{variant.features.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            {variant.features.heading}
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">{variant.features.sub}</p>
        </Animate>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc, color, shadow }, i) => (
            <Animate key={title} delay={i * 60}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${color} shadow-lg ${shadow} flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-orange-600 text-sm font-semibold uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            From menu to order in four steps
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Most restaurants are taking their first order within five minutes of signing up.
          </p>
        </Animate>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <Animate key={s.num} delay={i * 80}>
              <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center font-bold text-orange-600 text-sm">
                    {s.num}
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-orange-200 to-transparent" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  )
}

function ComparisonTable({ showCta = false }: { showCta?: boolean }) {
  const { plans, isPhilippines } = usePricing("RESTAURANT")
  const freePlan = plans.find(p => p.planKey === "FREE")
  const proPlan = plans.find(p => p.planKey === "PRO")
  const entPlan = plans.find(p => p.planKey === "ENTERPRISE")
  const proPrice = isPhilippines === null ? "…" : isPhilippines ? proPlan?.phpPrice : proPlan?.usdPrice
  const entPrice = isPhilippines === null ? "…" : isPhilippines ? entPlan?.phpPrice : entPlan?.usdPrice

  const limitRows = [
    { feature: "Menu items", key: "menuItems" },
    { feature: "Orders / month", key: "orders" },
    { feature: "Team users", key: "users" },
  ]

  return (
    <section className="py-24 bg-orange-50/40">
      <div className="max-w-4xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-orange-600 text-sm font-semibold uppercase tracking-widest mb-3">Compare plans</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Free vs. paid plans</h2>
          <p className="text-slate-500 mt-4">Start free and upgrade only when your order volume grows.</p>
        </Animate>
        <Animate>
          <div className="overflow-x-auto rounded-2xl border border-orange-100 shadow-sm bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-orange-100">
                  <th className="text-left px-6 py-4 text-slate-500 font-medium">Feature</th>
                  <th className="text-center px-6 py-4 text-slate-800 font-bold">Free</th>
                  <th className="text-center px-6 py-4 text-slate-800 font-bold bg-orange-50">Pro <span className="text-xs text-slate-400 font-normal">{proPrice}/mo</span></th>
                  <th className="text-center px-6 py-4 text-slate-800 font-bold">Enterprise <span className="text-xs text-slate-400 font-normal">{entPrice}/mo</span></th>
                </tr>
              </thead>
              <tbody>
                {limitRows.map(({ feature, key }, i) => (
                  <tr key={feature} className={`border-b border-orange-50 ${i % 2 === 0 ? "bg-white" : "bg-orange-50/30"}`}>
                    <td className="px-6 py-4 text-slate-700 font-medium">{feature}</td>
                    <td className="text-center px-6 py-4"><span className="text-slate-700 font-medium">{limitDisplay(freePlan, key)}</span></td>
                    <td className="text-center px-6 py-4 bg-orange-50/50"><span className="text-slate-700 font-medium">{limitDisplay(proPlan, key)}</span></td>
                    <td className="text-center px-6 py-4"><span className="text-slate-700 font-medium">{limitDisplay(entPlan, key)}</span></td>
                  </tr>
                ))}
                {FEATURE_ROWS.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-orange-50 ${(limitRows.length + i) % 2 === 0 ? "bg-white" : "bg-orange-50/30"}`}>
                    <td className="px-6 py-4 text-slate-700 font-medium">{row.feature}</td>
                    {[row.free, row.pro, row.enterprise].map((val, j) => (
                      <td key={j} className={`text-center px-6 py-4 ${j === 1 ? "bg-orange-50/50" : ""}`}>
                        {val ? <CheckCircle2 className="w-5 h-5 text-orange-500 mx-auto" /> : <XCircle className="w-5 h-5 text-slate-200 mx-auto" />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Animate>
        {showCta && (
          <Animate className="text-center mt-10">
            <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=RESTAURANT&plan=FREE`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm transition-all shadow-lg shadow-orange-500/25">
              Start free today <ChevronRight className="w-4 h-4" />
            </a>
          </Animate>
        )}
      </div>
    </section>
  )
}

function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const { plans, isPhilippines } = usePricing("RESTAURANT")

  const handleSelect = (p: Plan) => {
    if (p.planKey === "FREE") {
      window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=${p.product}&plan=FREE`
      return
    }
    setSelectedPlan(p)
  }

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-orange-600 text-sm font-semibold uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Start free. Upgrade when you grow.</h2>
          <p className="text-slate-500 mt-4">The free plan stays free forever.</p>
          {isPhilippines !== null && (
            <div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs text-slate-500 shadow-sm">
              <span>{isPhilippines ? "🇵🇭" : "🌍"}</span>
              <span>Prices in <span className="font-semibold text-slate-700">{isPhilippines ? "Philippine Peso (₱)" : "US Dollar ($)"}</span></span>
            </div>
          )}
        </Animate>
        <div className="grid md:grid-cols-3 gap-6 items-center">
          {plans.map((p, i) => {
            const displayPrice = isPhilippines === null ? "..." : isPhilippines ? p.phpPrice : p.usdPrice
            return (
              <Animate key={p.name} delay={i * 100}>
                <div className={`rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 ${p.highlight ? "bg-gradient-to-b from-orange-500 to-amber-500 border-orange-400/30 shadow-2xl shadow-orange-500/25 scale-105" : "bg-white border-slate-200 shadow-sm hover:shadow-md"}`}>
                  {p.highlight && <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-4"><Zap className="w-3 h-3" /> Most popular</span>}
                  <p className={`font-bold text-lg mb-1 ${p.highlight ? "text-white" : "text-slate-800"}`}>{p.name}</p>
                  <p className={`text-sm mb-4 ${p.highlight ? "text-orange-50/70" : "text-slate-400"}`}>{p.desc}</p>
                  <div className="flex items-end gap-1 mb-6">
                    <span className={`text-4xl font-extrabold tracking-tight ${p.highlight ? "text-white" : "text-slate-800"}`}>{displayPrice}</span>
                    <span className={`text-sm mb-1 ${p.highlight ? "text-orange-50/60" : "text-slate-400"}`}>{p.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${p.highlight ? "text-orange-100" : "text-orange-500"}`} />
                        <span className={p.highlight ? "text-orange-50/90" : "text-slate-600"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handleSelect(p)} className={`w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${p.highlight ? "bg-white hover:bg-orange-50 text-orange-600 shadow-lg shadow-orange-600/20" : "bg-orange-500 hover:bg-orange-400 text-white shadow-md shadow-orange-500/20"}`}>{p.cta}</button>
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
    <section id="faq" className="py-24 bg-orange-50/40">
      <div className="max-w-2xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <p className="text-orange-600 text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Common questions</h2>
        </Animate>
        <div className="flex flex-col gap-3">
          {FAQS.map(({ q, a }, i) => (
            <Animate key={i} delay={i * 60}>
              <div className="border border-orange-100 rounded-xl overflow-hidden bg-white">
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-slate-700 font-medium text-sm hover:bg-orange-50/50 transition-colors">
                  {q}
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${open === i ? "rotate-90" : ""}`} />
                </button>
                {open === i && (
                  <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed border-t border-orange-50 pt-3">{a}</div>
                )}
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
    <section className="py-24 relative overflow-hidden"
      style={{ background: BG, backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 28px)", backgroundSize: "28px 28px" }}>
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${ORANGE_GLOW} 0%, transparent 70%)` }} />
      <Animate className="relative max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          {variant.cta.heading}
        </h2>
        <p className="text-white/40 mb-8">{variant.cta.sub}</p>
        <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=RESTAURANT&plan=FREE`}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 hover:from-orange-400 hover:to-amber-300 text-white font-semibold transition-all shadow-xl shadow-orange-500/25">
          Get started for free <ChevronRight className="w-4 h-4" />
        </a>
      </Animate>
    </section>
  )
}

function PageFooter() {
  return (
    <footer className="bg-[#060300] border-t border-white/5 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Smapey Food Ordering" className="w-6 h-6 rounded-md object-cover" />
          <span className="text-white/60 text-sm font-semibold">Food Ordering by Smapey</span>
        </div>
        <div className="flex items-center gap-5 text-white/40 text-xs">
          <a href="/restaurant/guide" className="hover:text-white/70 transition">Guide</a>
          <a href="/privacy-policy" className="hover:text-white/70 transition">Privacy</a>
          <a href="/terms-and-conditions" className="hover:text-white/70 transition">Terms</a>
          <a href="/" className="hover:text-white/70 transition">All Products</a>
        </div>
        <p className="text-white/20 text-xs">© {new Date().getFullYear()} Smapey</p>
      </div>
    </footer>
  )
}

type CheckoutMethod = "paypal" | "paymongo"
const Spinner = () => (
  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
  </svg>
)

function PaymentModal({ plan, isPhilippines, onClose }: { plan: Plan | null; isPhilippines: boolean; onClose: () => void }) {
  const [step, setStep] = useState<"details" | "payment">("details")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState<CheckoutMethod | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const t = localStorage.getItem("accessToken")
    setToken(t)
    if (t) setStep("payment")
  }, [])

  if (!plan) return null
  const displayPrice = isPhilippines ? plan.phpPrice : plan.usdPrice

  const checkout = async (method: CheckoutMethod) => {
    try {
      setLoading(method)
      const endpoint = token
        ? (method === "paypal" ? "/api/billing/subscribe/paypal" : "/api/billing/subscribe/paymongo")
        : (method === "paypal" ? "/api/billing/newaccount/paypal" : "/api/billing/newaccount/paymongo")
      const payload = token
        ? { product: plan.product, plan: plan.planKey }
        : { name, email, product: plan.product, plan: plan.planKey }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || JSON.stringify(data))
      const redirectUrl = data.approveUrl || data.checkoutUrl
      if (!redirectUrl) throw new Error("No redirect URL returned")
      window.location.href = redirectUrl
    } catch (err: any) {
      alert(err?.message || "Checkout failed. Please try again.")
    } finally {
      setLoading(null)
    }
  }

  const handleContinue = () => {
    if (!name.trim() || !email.trim()) { alert("Name and email are required"); return }
    if (!isPhilippines) { checkout("paypal") } else { setStep("payment") }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step === "payment" && !token && (
              <button onClick={() => setStep("details")} className="text-white/60 hover:text-white transition">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              </button>
            )}
            <div>
              <h2 className="text-white font-bold text-lg">{step === "details" ? "Create your account" : "Choose payment method"}</h2>
              <p className="text-orange-50 text-sm mt-0.5">{plan.name} plan — <span className="font-semibold">{displayPrice}</span>{plan.period}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          {step === "details" && (
            <>
              <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400" />
              <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400" />
              <button onClick={handleContinue} disabled={loading !== null} className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60">
                {loading ? <><Spinner /> Redirecting…</> : <>Continue <ChevronRight className="w-4 h-4" /></>}
              </button>
            </>
          )}
          {step === "payment" && (
            <>
              {isPhilippines && (
                <button onClick={() => checkout("paymongo")} disabled={loading !== null} className="w-full flex items-center gap-4 px-5 py-4 border-2 border-slate-200 rounded-2xl hover:border-green-500 hover:bg-green-50 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z"/></svg>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-green-700">QR Ph / GCash / Card</p>
                    <p className="text-xs text-slate-400">Philippine payment methods</p>
                  </div>
                  {loading === "paymongo" ? <Spinner /> : <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-green-500" />}
                </button>
              )}
              <button onClick={() => checkout("paypal")} disabled={loading !== null} className="w-full flex items-center gap-4 px-5 py-4 border-2 border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-[#003087] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c1.379 8.883-5.43 11.61-10.377 11.61H8.23l-1.133 7.184h3.78c.458 0 .848-.332.92-.783l.038-.196.728-4.617.047-.252a.93.93 0 0 1 .919-.784h.578c3.746 0 6.678-1.522 7.534-5.927.358-1.833.173-3.363-.42-4.494z"/></svg>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-700">PayPal</p>
                  <p className="text-xs text-slate-400">Pay with your PayPal account</p>
                </div>
                {loading === "paypal" ? <Spinner /> : <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />}
              </button>
            </>
          )}
          <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            Secure checkout · Cancel anytime · No hidden fees
          </p>
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
      <Features variant={variant} />
      <HowItWorks />
      <ComparisonTable showCta={variant.navMode === "page"} />
      <Pricing />
      <FAQ />
      <BookDemoForm product="RESTAURANT" />
      <CTA variant={variant} />
      <InternalLinks cluster="restaurant" currentPath={variant.currentPath} />
      <PageFooter />
    </main>
  )
}
