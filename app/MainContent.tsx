"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  FileText, Dumbbell, BookOpen, CalendarDays, Car, Shirt, Scissors,
  CalendarPlus, Home, Landmark, UtensilsCrossed, ShoppingBag, Stethoscope, PawPrint,
  Building2, ChefHat, Droplets, GraduationCap,
  ArrowRight, CheckCircle2, Zap, Shield, TrendingUp,
  Clock, ChevronDown, Menu, X, Users, Sparkles,
  MousePointerClick, LayoutDashboard, Star,
} from "lucide-react"

// ── Layered Pop design tokens ───────────────────────
const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

//////////////////////////////////////////////////////
// DATA
//////////////////////////////////////////////////////

const PRODUCTS = [
  {
    key: "INVOICE",
    name: "Invoice Manager",
    tagline: "Get paid faster.",
    desc: "Create professional invoices, track payments, and send PDF receipts — all in under 2 minutes.",
    href: "/invoice",
    register: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=INVOICE&plan=FREE`,
    accent: "#2563eb",
    accentLight: "#eff6ff",
    Icon: FileText,
    features: ["Professional PDF invoices", "Real-time payment tracking", "Multi-currency support", "Automated reminders"],
    stat: { value: "< 2 min", label: "to create an invoice" },
  },
 {
  key: "GYM",
  name: "Gym Management",
  tagline: "Run your gym smarter.",
  desc: "Manage members, automate billing, track attendance, and assign trainers — one dashboard, zero chaos.",
  href: "/gym",
  register: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=GYM&plan=FREE`,
  accent: "#f59e0b",
  accentLight: "#fef3c7",
  Icon: Dumbbell,
  features: ["Member profiles & QR check-in", "Subscription & renewal billing", "Walk-in tracking", "Trainer management"],
  stat: { value: "500+", label: "members per gym" },
},
  {
    key: "ESSAY",
    name: "Essay Feedback",
    tagline: "Grade smarter, teach better.",
    desc: "AI-powered essay grading with rubric scores, structured feedback, and handwritten OCR support.",
    href: "/essay",
    register: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=ESSAY&plan=FREE`,
    accent: "#7c3aed",
    accentLight: "#f5f3ff",
    Icon: BookOpen,
    features: ["AI grading in seconds", "Camera OCR support", "Rubric-based scoring", "Student progress tracking"],
    stat: { value: "< 10s", label: "per essay graded" },
  },
  {
    key: "BOOKING",
    name: "Booking & Appointments",
    tagline: "Zero scheduling stress.",
    desc: "Manage client appointments, staff availability, and deposits — built for clinics, salons & studios.",
    href: "/booking",
    register: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOOKING&plan=FREE`,
    accent: "#0d9488",
    accentLight: "#f0fdfa",
    Icon: CalendarDays,
    features: ["Appointment scheduling", "Staff & availability config", "Service catalog", "Deposit tracking"],
    stat: { value: "60%", label: "fewer no-shows" },
  },
  {
    key: "CAR_RENTAL",
    name: "Car Rental",
    tagline: "Keep your fleet moving.",
    desc: "Manage vehicles, reservations, deposits, and overdue alerts — everything a rental business needs in one dashboard.",
    href: "/car-rental",
    register: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CAR_RENTAL&plan=FREE`,
    accent: "#ea580c",
    accentLight: "#fff7ed",
    Icon: Car,
    features: ["Fleet status tracking", "Reservation management", "Overdue detection", "Revenue dashboard"],
    stat: { value: "76%", label: "avg fleet utilization" },
  },
  {
    key: "LAUNDRY",
    name: "Laundry Shop",
    tagline: "Run every order smoothly.",
    desc: "Track laundry orders by ticket, notify customers by SMS, and accept GCash or cash — built for small laundry shops.",
    href: "/laundry",
    register: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=LAUNDRY&plan=FREE`,
    accent: "#0284c7",
    accentLight: "#f0f9ff",
    Icon: Shirt,
    features: ["Auto ticket numbering", "Customer SMS notifications", "GCash & cash payments", "7-day revenue dashboard"],
    stat: { value: "< 1 min", label: "to create an order" },
  },
  {
    key: "SALON",
    name: "Salon Manager",
    tagline: "Book clients, grow your salon.",
    desc: "Manage appointments, clients, and services — with a public booking page your clients can use to send inquiries directly.",
    href: "/salon",
    register: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=SALON&plan=FREE`,
    accent: "#ec4899",
    accentLight: "#fdf2f8",
    Icon: Scissors,
    features: ["Appointment scheduling", "Client profiles & history", "Public booking page", "Revenue dashboard"],
    stat: { value: "50%", label: "less time on admin" },
  },
  {
    key: "MASSAGE",
    name: "Massage and Spa",
    tagline: "Relax your clients. Run your spa.",
    desc: "Manage therapists, treatments, intake forms, and deposits — with a public booking page where clients can request their favorite therapist.",
    href: "/massage",
    register: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=MASSAGE&plan=FREE`,
    accent: "#10b981",
    accentLight: "#ecfdf5",
    Icon: CalendarPlus,
    features: ["Therapist assignment", "Client intake & health notes", "Deposit QR codes", "Public booking page"],
    stat: { value: "30%", label: "more repeat clients" },
  },
  {
    key: "AIRBNB",
    name: "Airbnb / Rentals",
    tagline: "Fill every night.",
    desc: "Manage rental properties, guest profiles, and reservations from one clean dashboard — with built-in double-booking protection.",
    href: "/airbnb",
    register: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=AIRBNB&plan=FREE`,
    accent: "#0ea5e9",
    accentLight: "#f0f9ff",
    Icon: Home,
    features: ["Property listings & calendar", "Guest profiles & history", "Reservation management", "Double-booking protection"],
    stat: { value: "0", label: "double bookings" },
  },
  {
    key: "LENDING",
    name: "Lending Manager",
    tagline: "Run your loan book with ease.",
    desc: "Issue loans, auto-generate amortization schedules, track GCash and bank payments, and watch collections — everything a lender needs in one dashboard.",
    href: "/lending",
    register: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=LENDING&plan=FREE`,
    accent: "#334155",
    accentLight: "#f1f5f9",
    Icon: Landmark,
    features: ["Borrower profiles & history", "Auto amortization schedules", "Cash / GCash / bank payments", "Overdue & collections analytics"],
    stat: { value: "0", label: "missed dues" },
  },
  {
    key: "RESTAURANT",
    name: "Food Ordering Manager",
    tagline: "Serve every table, track every order.",
    desc: "Build your menu, take dine-in and takeaway orders, manage the kitchen queue, and review daily sales — all in one clean dashboard built for small restaurants and cafés.",
    href: "/restaurant",
    register: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=RESTAURANT&plan=FREE`,
    accent: "#f97316",
    accentLight: "#fff7ed",
    Icon: UtensilsCrossed,
    features: ["Menu builder with categories", "Dine-in & takeaway orders", "Kitchen order queue", "Daily sales summary"],
    stat: { value: "< 1 min", label: "to place an order" },
  },
  {
    key: "STORE",
    name: "Store Manager",
    tagline: "Know your stock, track every sale.",
    desc: "Manage your product catalog, track stock in real time with low stock alerts, ring up sales on a tap-to-add POS, and review daily revenue — built for sari-sari stores, boutiques, and retail shops.",
    href: "/store",
    register: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=STORE&plan=FREE`,
    accent: "#6d28d9",
    accentLight: "#f5f3ff",
    Icon: ShoppingBag,
    features: ["Product catalog with stock tracking", "Tap-to-add POS & change calc", "Low stock alerts & reorder", "Daily sales & revenue analytics"],
    stat: { value: "< 1 min", label: "to ring up a sale" },
  },
  {
    key: "CLINIC",
    name: "Clinic Manager",
    tagline: "Run your clinic smarter.",
    desc: "Manage patients, doctors, appointments, and a live queue board — all in one clean dashboard. Built for clinics of any size.",
    href: "/clinic",
    register: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CLINIC&plan=FREE`,
    accent: "#2563eb",
    accentLight: "#eff6ff",
    Icon: Stethoscope,
    features: ["Patient records & profiles", "Doctor schedules & queue", "Appointment booking", "Live queue board"],
    stat: { value: "5 min", label: "to set up your clinic" },
  },
  {
    key: "VET_CLINIC",
    name: "Vet Clinic Manager",
    tagline: "Care for every pet, run the whole clinic.",
    desc: "Manage pet records, vet appointments, vaccinations, a live queue board, and itemized billing — built for small veterinary clinics.",
    href: "/vet-clinic",
    register: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=VET_CLINIC&plan=FREE`,
    accent: "#10b981",
    accentLight: "#ecfdf5",
    Icon: PawPrint,
    features: ["Pet profiles & medical notes", "Appointment & queue board", "Vaccination tracking & reminders", "Itemized billing & payments"],
    stat: { value: "5 min", label: "to set up your vet clinic" },
  },
  {
    key: "BOARDING_HOUSE",
    name: "Boarding House Manager",
    tagline: "Collect rent. Track every tenant.",
    desc: "Manage rooms, tenants, monthly rent and utility billing, and occupancy — built for boarding house owners across the Philippines.",
    href: "/boarding-house",
    register: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOARDING_HOUSE&plan=FREE`,
    accent: "#ea580c",
    accentLight: "#fff7ed",
    Icon: Building2,
    features: ["Room & occupancy tracking", "Tenant profiles & tenancy records", "Rent & utility billing", "Overdue alerts & revenue dashboard"],
    stat: { value: "< 5 min", label: "to set up your boarding house" },
  },
  {
    key: "CATERING",
    name: "Catering Manager",
    tagline: "Book events. Collect every peso.",
    desc: "Manage catering bookings, packages, payment milestones, supply catalog, and staff — everything a Philippine catering business needs in one dashboard.",
    href: "/catering",
    register: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CATERING&plan=FREE`,
    accent: "#e11d48",
    accentLight: "#fff1f2",
    Icon: ChefHat,
    features: ["Event booking management", "Package & menu builder", "Payment milestone tracking", "Supply catalog & staff assignment"],
    stat: { value: "₱0", label: "missed collections" },
  },
  {
    key: "WATER_REFILLING",
    name: "Water Refilling Station",
    tagline: "Know who has your bottles.",
    desc: "Manage refill deliveries, customers, container deposits, returns, and inventory — built for water refilling stations in the Philippines.",
    href: "/water-refilling",
    register: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=WATER_REFILLING&plan=FREE`,
    accent: "#0891b2",
    accentLight: "#ecfeff",
    Icon: Droplets,
    features: ["Delivery order tracking", "Container deposit & returns", "Inventory & one-click refills", "Routes, SMS & revenue dashboard"],
    stat: { value: "0", label: "lost containers" },
  },
  {
    key: "SCHOOL_DESK",
    name: "SchoolDesk (Tutorial Center)",
    tagline: "Manage your tutorial center.",
    desc: "Track student enrollments, sessions, tuition fees, attendance, and progress notes — built for tutorial centers and tutors in the Philippines.",
    href: "/school-desk",
    register: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=SCHOOL_DESK&plan=FREE`,
    accent: "#6366f1",
    accentLight: "#eef2ff",
    Icon: GraduationCap,
    features: ["Student enrollment & profiles", "Session scheduling & attendance", "Tuition fee monitoring", "Progress notes & dashboard"],
    stat: { value: "₱0", label: "missed tuition" },
  },
]

const STATS = [
  { value: "2,400+", label: "small businesses" },
  { value: "180k+",  label: "invoices sent" },
  { value: "95k+",   label: "members managed" },
  { value: "50k+",   label: "essays graded" },
]

const FOR_WHO = [
  { emoji: "🏋️", label: "Gym Owners" },
  { emoji: "🚗", label: "Car Rental Operators" },
  { emoji: "💅", label: "Salon & Spa Owners" },
  { emoji: "📋", label: "Freelancers" },
  { emoji: "🏥", label: "Clinic Owners" },
  { emoji: "📚", label: "Teachers & Tutors" },
  { emoji: "🔧", label: "Service Businesses" },
  { emoji: "🏪", label: "Small Retailers" },
  { emoji: "🧺", label: "Laundry Shop Owners" },
  { emoji: "🏠", label: "Airbnb Hosts" },
  { emoji: "🍽️", label: "Food & Café Owners" },
  { emoji: "🏘️", label: "Boarding House Owners" },
  { emoji: "🍳", label: "Catering Businesses" },
  { emoji: "💧", label: "Water Station Owners" },
]

const STEPS = [
  {
    number: "01",
    Icon: MousePointerClick,
    title: "Sign up free",
    desc: "Create your account in under a minute. No credit card. No forms to fill. Just your name and email.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    number: "02",
    Icon: LayoutDashboard,
    title: "Pick your tool",
    desc: "Choose the product that fits your business today. Start with one — add more whenever you need to.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    number: "03",
    Icon: Zap,
    title: "Start working",
    desc: "No training. No IT setup. No onboarding calls. Open it, and it just makes sense — that's the point.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
]

const TESTIMONIALS = [
  {
    name: "Katrina Mangubat",
    role: "Salon Owner, Cebu City",
    avatar: "KM",
    color: "bg-rose-500",
    product: "Salon Manager",
    quote: "I was running my salon out of a Facebook Messenger inbox — no schedule, no record of who came in when. Now I have a booking page I share on my IG bio and all appointments are in one place. Took me maybe an hour to set up.",
  },
  {
    name: "Aldrin Resurreccion",
    role: "Gym Owner, Santa Rosa, Laguna",
    avatar: "AR",
    color: "bg-amber-500",
    product: "Gym Management",
    quote: "Renewing memberships meant going through a notebook every week then manually texting people one by one. Now Smapey shows me exactly who expires this week and who already renewed. Saves me at least two hours every Saturday.",
  },
  {
    name: "Niña Talosig",
    role: "Freelance Designer, Makati",
    avatar: "NT",
    color: "bg-blue-500",
    product: "Invoice Manager",
    quote: "I had a client who owed me for almost four months because I kept putting off the follow-up. Now I send the invoice the moment I finish a project and I can see exactly when it was opened. Getting paid on time actually feels possible.",
  },
  {
    name: "Renzo Gamboa",
    role: "Airbnb Host, Tagaytay",
    avatar: "RG",
    color: "bg-sky-500",
    product: "Airbnb / Rentals",
    quote: "I nearly lost a guest last year over a double booking — two reservations, same unit, same weekend. Since I moved to Smapey that's blocked automatically. Haven't had a conflict once, and I sleep better on weekends.",
  },
  {
    name: "Trisha Delantar",
    role: "Laundry Shop Owner, Iloilo City",
    avatar: "TD",
    color: "bg-teal-500",
    product: "Laundry Shop",
    quote: "It's just me and one part-timer. I was writing ticket numbers by hand on a whiteboard and texting customers myself when their laundry was done. Now every order gets auto-numbered and the SMS goes out automatically. That alone saved us.",
  },
  {
    name: "Benjie Macalintal",
    role: "Car Rental Operator, Davao City",
    avatar: "BM",
    color: "bg-orange-500",
    product: "Car Rental",
    quote: "I had a spreadsheet I built myself for tracking reservations and it fell apart the moment two people tried to book the same car. Smapey handles all of that now. My staff picked it up without any training — that was a big deal for me.",
  },
]

//////////////////////////////////////////////////////
// ANIMATE ON SCROLL
//////////////////////////////////////////////////////

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

//////////////////////////////////////////////////////
// NAVBAR
//////////////////////////////////////////////////////

function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("")

  // Scroll-spy: highlight the nav item for the section currently in view.
  useEffect(() => {
    const ids = ["products", "how-it-works", "why"]
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: "-45% 0px -50% 0px" }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  // Load the Layered Pop display font (no-op if already present).
  useEffect(() => {
    const id = "smapey-pop-fonts"
    if (!document.getElementById(id)) {
      const l = document.createElement("link")
      l.id = id
      l.rel = "stylesheet"
      l.href = "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap"
      document.head.appendChild(l)
    }
  }, [])

  const pathname = usePathname() || "/"
  const activeStyle = (on: boolean) => ({
    color: on ? BLUE : INK,
    borderBottom: `4px solid ${on ? AMBER : "transparent"}`,
    paddingBottom: "3px",
  } as React.CSSProperties)

  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey" className="h-8 w-8 object-contain" />
          <span className="text-xl font-extrabold tracking-tight" style={{ color: INK }}>Smapey</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[["#products", "Products"], ["#how-it-works", "How it works"], ["#why", "Why Smapey"]].map(([href, label]) => {
            const on = pathname === "/" && active === href.slice(1)
            return (
              <a key={label} href={href} className="text-sm font-semibold hover:opacity-60 transition-opacity" style={activeStyle(on)}>
                {label}
              </a>
            )
          })}
          <Link href="/affiliate" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={activeStyle(pathname.startsWith("/affiliate"))}>Affiliate</Link>
          <Link href="/blog" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={activeStyle(pathname.startsWith("/blog"))}>Blog</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="https://app.smapey.com/login" className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>Sign in</Link>
          <Link href="https://app.smapey.com/register" className="text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>
            Get started free
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: INK }}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 py-5 space-y-4" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
          {PRODUCTS.map(p => (
            <Link key={p.key} href={p.href} onClick={() => setOpen(false)} className="flex items-center gap-3 py-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: p.accentLight }}>
                <p.Icon className="w-4 h-4" style={{ color: p.accent }} />
              </div>
              <span className="text-sm font-semibold" style={{ color: INK }}>{p.name}</span>
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2" style={{ borderTop: `2px solid ${INK}` }}>
            <Link href="/affiliate" onClick={() => setOpen(false)} className="text-center text-sm font-semibold py-2.5" style={{ color: INK }}>Affiliate Program</Link>
            <Link href="/blog" onClick={() => setOpen(false)} className="text-center text-sm font-semibold py-2.5" style={{ color: INK }}>Blog</Link>
            <Link href="https://app.smapey.com/login" className="text-center text-sm font-semibold py-2.5 rounded-full border-2" style={{ color: INK, borderColor: INK }}>Sign in</Link>
            <Link href="https://app.smapey.com/register" className="text-center text-sm font-bold py-2.5 rounded-full border-2" style={{ background: AMBER, color: INK, borderColor: INK }}>Get started free</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

//////////////////////////////////////////////////////
// HERO
//////////////////////////////////////////////////////

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-16" style={{ background: CREAM, color: INK, fontFamily: display.fontFamily }}>

      {/* playful layered-bar accents (echo the Smapey mark) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
        <div className="absolute rounded-[22px] border-2" style={{ top: "15%", left: "-70px", width: 290, height: 80, background: AMBER, borderColor: INK, transform: "rotate(-11deg)" }} />
        <div className="absolute rounded-[22px] border-2" style={{ top: "28%", right: "-80px", width: 300, height: 84, background: BLUE, borderColor: INK, transform: "rotate(9deg)", boxShadow: `5px 5px 0 rgba(22,22,22,.12)` }} />
        <div className="absolute rounded-[22px] border-2" style={{ bottom: "16%", left: "-60px", width: 270, height: 76, background: BLUE, borderColor: INK, transform: "rotate(8deg)", boxShadow: `5px 5px 0 rgba(22,22,22,.12)` }} />
        <div className="absolute rounded-[22px] border-2" style={{ bottom: "22%", right: "-70px", width: 285, height: 80, background: AMBER, borderColor: INK, transform: "rotate(-9deg)" }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* BADGE */}
        <div className="inline-flex items-center gap-2 bg-white border-2 rounded-full px-4 py-2 mb-8" style={{ ...display, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-bold" style={{ color: INK }}>18 tools live · built for small businesses</span>
        </div>

        {/* HEADLINE */}
        <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.02] tracking-tight" style={{ ...display, color: INK }}>
          Simple software for
          <br />
          <span style={{ color: BLUE }}>real </span><span style={{ color: AMBER }}>small businesses.</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: "#54514c" }}>
          No IT team required. No 3-month setup. No enterprise nonsense.
          Just clean, focused tools that help you run your business from day one.
        </p>

        {/* ACTIONS */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="https://app.smapey.com/register" className="group flex items-center gap-2 font-bold text-[15px] px-8 py-4 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `4px 4px 0 ${INK}` }}>
            Start for free — no card needed
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a href="#how-it-works" className="flex items-center gap-2 font-bold text-[15px] px-7 py-4 rounded-full border-2 bg-white transition-transform hover:-translate-y-0.5" style={{ ...display, color: INK, borderColor: INK }}>
            See how it works
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>

        {/* TRUST */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {["Free plan forever", "Setup in under 5 minutes", "No training required"].map(t => (
            <span key={t} className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#54514c" }}>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {t}
            </span>
          ))}
        </div>

      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce" style={{ color: INK, opacity: 0.3 }}>
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  )
}

//////////////////////////////////////////////////////
// STATS BAR
//////////////////////////////////////////////////////

function StatsBar() {
  return (
    <div style={{ background: INK, fontFamily: display.fontFamily }}>
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 80} className="text-center">
            <p className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: i % 2 === 0 ? AMBER : "#fff" }}>{s.value}</p>
            <p className="text-sm mt-1 font-semibold" style={{ color: "rgba(255,255,255,.55)" }}>{s.label}</p>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

//////////////////////////////////////////////////////
// FOR WHO
//////////////////////////////////////////////////////

function ForWho() {
  return (
    <section className="py-24 px-6 md:px-12" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="max-w-5xl mx-auto text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 bg-white border-2 rounded-full px-4 py-2 text-xs font-bold mb-5" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${AMBER}` }}>
            <Users className="w-3.5 h-3.5" /> Who Smapey is built for
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>
            If you run a small business,<br />
            <span style={{ color: BLUE }}>this was made for you.</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-base leading-relaxed" style={{ color: "#54514c" }}>
            We didn't build Smapey for corporations with IT departments and six-month rollouts.
            We built it for owners and operators who need something that just works — today.
          </p>
        </Reveal>

        <div className="mt-12 hidden md:flex flex-wrap justify-center gap-3">
          {FOR_WHO.map((item, i) => (
            <Reveal key={item.label} delay={i * 40}>
              <div className="flex items-center gap-2.5 bg-white border-2 rounded-full px-5 py-3 transition-transform hover:-translate-y-0.5" style={{ borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>
                <span className="text-xl">{item.emoji}</span>
                <span className="text-sm font-bold" style={{ color: INK }}>{item.label}</span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* HONEST PROMISE */}
        <Reveal delay={200}>
          <div className="mt-16 rounded-[30px] border-2 p-8 md:p-12 text-left" style={{ background: INK, borderColor: INK, boxShadow: `8px 8px 0 ${AMBER}` }}>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: AMBER }}>Our honest promise</p>
                <h3 className="text-2xl md:text-4xl font-extrabold leading-tight" style={{ color: "#fff" }}>
                  We're not building for<br />
                  <span style={{ color: "rgba(255,255,255,.45)" }}>Fortune 500 companies.</span>
                </h3>
                <p className="mt-4 text-sm leading-relaxed max-w-sm" style={{ color: "rgba(255,255,255,.6)" }}>
                  No bloated feature sets. No 200-page manuals. No "schedule a demo" buttons.
                  Smapey is intentionally simple — because your time is better spent running your business, not learning software.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  "Open it and understand it immediately",
                  "No training sessions or onboarding calls",
                  "Every feature exists because someone needed it",
                  "If it feels complex, we'll simplify it",
                ].map(t => (
                  <div key={t} className="flex items-center gap-3 rounded-xl px-4 py-3.5" style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)" }}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: AMBER }} />
                    <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,.85)" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

//////////////////////////////////////////////////////
// HOW IT WORKS
//////////////////////////////////////////////////////

function HowItWorks() {
  const acc = [BLUE, AMBER, BLUE]
  return (
    <section id="how-it-works" className="py-28 px-6 md:px-12" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#9a948b" }}>How simple is it?</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>
            Up and running in 3 steps.
          </h2>
          <p className="mt-4 max-w-md mx-auto" style={{ color: "#54514c" }}>
            Most of our users are fully set up and creating their first invoice, reservation, or member profile within minutes of signing up.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 100}>
              <div className="rounded-[24px] border-2 p-8 h-full flex flex-col transition-transform hover:-translate-y-1" style={{ background: CREAM, borderColor: INK, boxShadow: `6px 6px 0 ${acc[i]}` }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-[14px] border-2 flex items-center justify-center" style={{ background: acc[i], borderColor: INK }}>
                    <step.Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-5xl font-extrabold" style={{ color: "rgba(22,22,22,.12)" }}>{step.number}</span>
                </div>
                <h3 className="text-lg font-extrabold mb-3" style={{ color: INK }}>{step.title}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "#54514c" }}>{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-10 text-center">
            <Link
              href="https://app.smapey.com/register"
              className="inline-flex items-center gap-2 text-sm font-bold px-8 py-4 rounded-full border-2 transition-transform hover:-translate-y-0.5"
              style={{ background: AMBER, color: INK, borderColor: INK, boxShadow: `4px 4px 0 ${INK}` }}
            >
              Try it yourself — it's free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

//////////////////////////////////////////////////////
// PRODUCTS SECTION
//////////////////////////////////////////////////////

function Products() {
  return (
    <section id="products" className="py-28 px-6 md:px-12" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="max-w-7xl mx-auto">

        <Reveal>
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#9a948b" }}>Our products</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-2xl" style={{ color: INK }}>
            Eighteen tools. Every small business covered.
          </h2>
          <p className="mt-4 text-lg max-w-xl" style={{ color: "#54514c" }}>
            Pick the one you need today. Each product is fully standalone — no bundles, no bloat, no paying for things you don't use.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {PRODUCTS.map((p, i) => {
            const c = i % 2 === 0 ? BLUE : AMBER
            const iconColor = c === AMBER ? INK : "#fff"
            return (
            <Reveal key={p.key} delay={i * 60}>
              <div className="group relative bg-white rounded-[24px] border-2 overflow-hidden flex flex-col h-full transition-transform hover:-translate-y-1.5" style={{ borderColor: INK, boxShadow: `6px 6px 0 ${c}` }}>

                <div className="h-2 w-full" style={{ background: c, borderBottom: `2px solid ${INK}` }} />

                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-[14px] border-2 flex items-center justify-center transition-transform group-hover:scale-105"
                        style={{ background: c, borderColor: INK }}>
                        <p.Icon className="w-6 h-6" style={{ color: iconColor }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-extrabold leading-tight" style={{ color: INK }}>{p.name}</h3>
                        <p className="text-xs font-bold mt-0.5" style={{ color: c === AMBER ? "#b06c00" : c }}>{p.tagline}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <p className="text-xl font-extrabold" style={{ color: INK }}>{p.stat.value}</p>
                      <p className="text-xs leading-tight max-w-[80px]" style={{ color: "#9a948b" }}>{p.stat.label}</p>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed mb-5" style={{ color: "#54514c" }}>{p.desc}</p>

                  <ul className="grid grid-cols-1 gap-2 mb-7 flex-1">
                    {p.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm font-medium" style={{ color: "#3f3b36" }}>
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: c === AMBER ? "#b06c00" : c }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-3 mt-auto">
                    <Link href={p.register} className="flex-1 text-center text-sm font-bold py-3 rounded-full border-2 transition-transform hover:-translate-y-0.5"
                      style={{ background: INK, color: "#fff", borderColor: INK }}>
                      Try free
                    </Link>
                    <Link href={p.href} className="flex items-center gap-1.5 justify-center text-sm font-bold px-5 py-3 rounded-full border-2 bg-white transition-transform hover:-translate-y-0.5" style={{ color: INK, borderColor: INK }}>
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

//////////////////////////////////////////////////////
// WHY SMAPEY
//////////////////////////////////////////////////////

const WHY = [
  { Icon: Zap,        title: "Works on day one",      desc: "Sign up and start. No configuration, no demo calls, no waiting for an account manager." },
  { Icon: Shield,     title: "Secure by default",     desc: "Modern encryption and reliable infrastructure. Your data is safe — always." },
  { Icon: TrendingUp, title: "Grows with you",        desc: "Start on the free plan. Upgrade when your business needs more. No pressure, no lock-in." },
  { Icon: Clock,      title: "Hours back every week", desc: "Automate the repetitive tasks — invoicing, tracking, reminders — and focus on what matters." },
]

function Why() {
  return (
    <section id="why" className="py-28 px-6 md:px-12" style={{ background: BLUE, fontFamily: display.fontFamily }}>
      <div className="max-w-7xl mx-auto">

        <Reveal>
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,.6)" }}>Why Smapey</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-2xl" style={{ color: "#fff" }}>
            Simple is a feature,<br />
            <span style={{ color: AMBER }}>not a compromise.</span>
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed" style={{ color: "rgba(255,255,255,.7)" }}>
            Most business software is designed by people who've never run a small business. We built Smapey from the opposite direction — starting with what you actually need.
          </p>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 80}>
              <div className="bg-white rounded-[22px] border-2 p-7 h-full transition-transform hover:-translate-y-1" style={{ borderColor: INK, boxShadow: `5px 5px 0 ${INK}` }}>
                <div className="w-12 h-12 rounded-[14px] border-2 flex items-center justify-center mb-5" style={{ background: AMBER, borderColor: INK }}>
                  <w.Icon className="w-5 h-5" style={{ color: INK }} />
                </div>
                <h3 className="text-base font-extrabold mb-2" style={{ color: INK }}>{w.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* COMPARISON */}
        <Reveal delay={200}>
          <div className="mt-10 bg-white rounded-[24px] border-2 p-8" style={{ borderColor: INK, boxShadow: `8px 8px 0 ${INK}` }}>
            <p className="text-sm font-extrabold mb-6 uppercase tracking-widest" style={{ color: INK }}>Smapey vs. the old way</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest mb-4" style={{ color: "#e11d48" }}>The old way</p>
                {[
                  "5+ apps, 5+ monthly subscriptions",
                  "Weeks of setup before you see any value",
                  "Manual spreadsheets for everything",
                  "Enterprise tools priced for enterprises",
                ].map(t => (
                  <div key={t} className="flex items-center gap-3 py-2.5 border-b" style={{ borderColor: "rgba(22,22,22,.08)" }}>
                    <X className="w-4 h-4 shrink-0" style={{ color: "#e11d48" }} />
                    <span className="text-sm font-medium" style={{ color: "#54514c" }}>{t}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest mb-4" style={{ color: "#0d9f6e" }}>With Smapey</p>
                {[
                  "One platform, pick only what you need",
                  "Ready to use in minutes, not weeks",
                  "Everything tracked automatically",
                  "Free to start, affordable to grow",
                ].map(t => (
                  <div key={t} className="flex items-center gap-3 py-2.5 border-b" style={{ borderColor: "rgba(22,22,22,.08)" }}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "#0d9f6e" }} />
                    <span className="text-sm font-semibold" style={{ color: INK }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

//////////////////////////////////////////////////////
// TESTIMONIALS
//////////////////////////////////////////////////////

function Testimonials() {
  const acc = [AMBER, BLUE, AMBER, BLUE, AMBER, BLUE]
  return (
    <section className="py-28 px-6 md:px-12" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-14">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#9a948b" }}>Real businesses</p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight" style={{ color: INK }}>
            Small business owners love it.
          </h2>
          <p className="mt-3 max-w-md mx-auto" style={{ color: "#54514c" }}>
            From gym owners to freelancers — here's what they say after switching to Smapey.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <div className="bg-white rounded-[24px] border-2 p-7 h-full flex flex-col transition-transform hover:-translate-y-1" style={{ borderColor: INK, boxShadow: `6px 6px 0 ${acc[i % acc.length]}` }}>
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4" style={{ color: AMBER, fill: AMBER }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "#3f3b36" }}>"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-6 pt-5 border-t" style={{ borderColor: "rgba(22,22,22,.1)" }}>
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center shrink-0 border-2`} style={{ borderColor: INK }}>
                    <span className="text-xs font-bold text-white">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm font-extrabold" style={{ color: INK }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "#9a948b" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

//////////////////////////////////////////////////////
// CTA
//////////////////////////////////////////////////////

function CTA() {
  return (
    <section id="cta" className="py-28 px-6" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-5xl mx-auto rounded-[32px] border-2 p-10 md:p-16 text-center" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>

        <Reveal>
          <div className="inline-flex items-center gap-2 bg-white border-2 rounded-full px-4 py-2 text-xs font-bold mb-6" style={{ color: INK, borderColor: INK }}>
            <CheckCircle2 className="w-3.5 h-3.5" /> Free plan · No credit card · Cancel anytime
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.02]" style={{ color: INK }}>
            Your business deserves<br />better tools.
          </h2>
          <p className="mt-5 text-lg max-w-lg mx-auto font-medium" style={{ color: "#5c4a28" }}>
            Join thousands of small business owners who stopped wrestling with spreadsheets and expensive software — and just started running their business.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 flex justify-center">
            <Link href="https://app.smapey.com/register" className="inline-flex items-center gap-2 text-base font-bold px-8 py-4 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>
              Get started free
            </Link>
          </div>
          <p className="mt-8 text-sm font-semibold" style={{ color: "#5c4a28" }}>
            Start with one tool. Add more whenever you're ready.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

//////////////////////////////////////////////////////
// FOOTER
//////////////////////////////////////////////////////

function Footer() {
  return (
    <footer className="px-6 md:px-12 py-12" style={{ background: CREAM, borderTop: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <img src="/logo.png" alt="Smapey" className="h-7 w-7 object-contain" />
              <span className="text-base font-extrabold" style={{ color: INK }}>Smapey</span>
            </div>
            <p className="text-xs max-w-[200px] leading-relaxed" style={{ color: "#9a948b" }}>Simple business software for small businesses & startups.</p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {PRODUCTS.map(p => (
              <Link key={p.key} href={p.href} className="text-sm font-medium hover:opacity-60 transition-opacity" style={{ color: "#54514c" }}>{p.name}</Link>
            ))}
            <Link href="/blog" className="text-sm font-medium hover:opacity-60 transition-opacity" style={{ color: "#54514c" }}>Blog</Link>
            <Link href="/privacy-policy" className="text-sm font-medium hover:opacity-60 transition-opacity" style={{ color: "#54514c" }}>Privacy</Link>
            <Link href="/terms-and-conditions" className="text-sm font-medium hover:opacity-60 transition-opacity" style={{ color: "#54514c" }}>Terms</Link>
          </div>

          <span className="text-sm" style={{ color: "#b8b2a8" }}>© {new Date().getFullYear()} Smapey</span>
        </div>
      </div>
    </footer>
  )
}

//////////////////////////////////////////////////////
// PAGE
//////////////////////////////////////////////////////

export default function MainContent() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <ForWho />
      <HowItWorks />
      <Products />
      <Why />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  )
}
