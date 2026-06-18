"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  FileText, Dumbbell, BookOpen, CalendarDays, Car, Shirt, Scissors,
  CalendarPlus, Home, Landmark, UtensilsCrossed, ShoppingBag, Stethoscope, PawPrint,
  Building2, ChefHat, Droplets, GraduationCap,
  ArrowRight, CheckCircle2, Zap, Shield, TrendingUp,
  Clock, ChevronDown, Menu, X, Users, Sparkles,
  MousePointerClick, LayoutDashboard, Star,
} from "lucide-react"

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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey" className="h-8 w-8 object-contain" />
          <span className={`text-lg font-bold tracking-tight transition-colors ${scrolled ? "text-gray-900" : "text-white"}`}>Smapey</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[["#products", "Products"], ["#how-it-works", "How it works"], ["#why", "Why Smapey"]].map(([href, label]) => (
            <a key={label} href={href} className={`text-sm font-medium transition-colors ${scrolled ? "text-gray-600 hover:text-gray-900" : "text-white/80 hover:text-white"}`}>
              {label}
            </a>
          ))}
          <Link href="/affiliate" className={`text-sm font-medium transition-colors ${scrolled ? "text-gray-600 hover:text-gray-900" : "text-white/80 hover:text-white"}`}>
            Affiliate
          </Link>
          <Link href="/blog" className={`text-sm font-medium transition-colors ${scrolled ? "text-gray-600 hover:text-gray-900" : "text-white/80 hover:text-white"}`}>
            Blog
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="https://app.smapey.com/login" className={`text-sm font-medium transition-colors ${scrolled ? "text-gray-600 hover:text-gray-900" : "text-white/80 hover:text-white"}`}>
            Sign in
          </Link>
          <Link href="https://app.smapey.com/register" className="bg-white text-gray-900 text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-100 transition-colors shadow-sm">
            Get started free
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className={`md:hidden ${scrolled ? "text-gray-700" : "text-white"}`}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-5 space-y-4 shadow-lg">
          {PRODUCTS.map(p => (
            <Link key={p.key} href={p.href} onClick={() => setOpen(false)} className="flex items-center gap-3 py-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: p.accentLight }}>
                <p.Icon className="w-4 h-4" style={{ color: p.accent }} />
              </div>
              <span className="text-sm font-medium text-gray-800">{p.name}</span>
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Link href="/affiliate" onClick={() => setOpen(false)} className="text-center text-sm font-medium text-gray-600 py-2.5 hover:text-gray-900 transition-colors">Affiliate Program</Link>
            <Link href="/blog" onClick={() => setOpen(false)} className="text-center text-sm font-medium text-gray-600 py-2.5 hover:text-gray-900 transition-colors">Blog</Link>
            <Link href="https://app.smapey.com/login" className="text-center text-sm font-medium text-gray-600 py-2.5 border border-gray-200 rounded-full">Sign in</Link>
            <Link href="https://app.smapey.com/register" className="text-center text-sm font-semibold text-white py-2.5 bg-gray-900 rounded-full">Get started free</Link>
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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0f1e] px-6 pt-16">

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
      }} />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none animate-pulse"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)", animationDuration: "6s" }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none animate-pulse"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)", animationDuration: "8s" }} />
      <div className="absolute top-1/3 right-1/3 w-[350px] h-[350px] rounded-full pointer-events-none animate-pulse"
        style={{ background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)", animationDuration: "7s" }} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* BADGE */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8 backdrop-blur-sm shadow-[0_0_30px_-8px_rgba(99,102,241,0.5)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-xs font-medium text-white/70 tracking-wide">18 tools live · built for small businesses</span>
        </div>

        {/* HEADLINE */}
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight">
          Simple software for
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-teal-400 bg-clip-text text-transparent">
            real small businesses.
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
          No IT team required. No 3-month setup. No enterprise nonsense.
          Just clean, focused tools that help you run your business from day one.
        </p>

        {/* ACTIONS */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="https://app.smapey.com/register" className="group flex items-center gap-2 bg-white text-gray-900 font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-gray-100 transition-all shadow-lg hover:-translate-y-0.5">
            Start for free — no card needed
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a href="#how-it-works" className="flex items-center gap-2 text-white/60 font-medium text-sm px-6 py-3.5 rounded-full border border-white/10 hover:border-white/30 hover:text-white/80 transition-all">
            See how it works
            <ChevronDown className="w-4 h-4" />
          </a>
        </div>

        {/* TRUST */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {["Free plan forever", "Setup in under 5 minutes", "No training required"].map(t => (
            <span key={t} className="flex items-center gap-2 text-xs text-white/40">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              {t}
            </span>
          ))}
        </div>

      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 animate-bounce">
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
    <div className="bg-gray-900 border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 80} className="text-center">
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">{s.value}</p>
            <p className="text-sm text-white/40 mt-1">{s.label}</p>
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
    <section className="bg-white py-20 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 text-xs font-semibold text-gray-500 mb-5">
            <Users className="w-3.5 h-3.5" /> Who Smapey is built for
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            If you run a small business,<br />
            <span className="text-gray-400">this was made for you.</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            We didn't build Smapey for corporations with IT departments and six-month rollouts.
            We built it for owners and operators who need something that just works — today.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {FOR_WHO.map((item, i) => (
            <Reveal key={item.label} delay={i * 50}>
              <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3 hover:bg-gray-100 hover:border-gray-300 transition-all cursor-default">
                <span className="text-xl">{item.emoji}</span>
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* HONEST POSITIONING CALLOUT */}
        <Reveal delay={200}>
          <div className="mt-14 bg-gradient-to-br from-gray-900 to-[#0a0f1e] rounded-3xl p-8 md:p-10 text-left relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)" }} />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-3">Our honest promise</p>
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                  We're not building for<br />
                  <span className="text-white/40">Fortune 500 companies.</span>
                </h3>
                <p className="mt-4 text-white/50 text-sm leading-relaxed max-w-sm">
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
                  <div key={t} className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl px-4 py-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-sm text-white/70">{t}</span>
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
  return (
    <section id="how-it-works" className="bg-gray-50 py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">How simple is it?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Up and running in 3 steps.
          </h2>
          <p className="mt-4 text-gray-500 max-w-md mx-auto">
            Most of our users are fully set up and creating their first invoice, reservation, or member profile within minutes of signing up.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 100}>
              <div className="bg-white rounded-3xl border border-gray-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-2xl ${step.bg} flex items-center justify-center`}>
                    <step.Icon className={`w-5 h-5 ${step.color}`} />
                  </div>
                  <span className="text-4xl font-black text-gray-100">{step.number}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-8 text-center">
            <Link
              href="https://app.smapey.com/register"
              className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-gray-800 transition-all shadow-lg hover:-translate-y-0.5"
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
    <section id="products" className="bg-white py-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        <Reveal>
          <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">Our products</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight max-w-2xl">
            Eighteen tools. Every small business covered.
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-xl">
            Pick the one you need today. Each product is fully standalone — no bundles, no bloat, no paying for things you don't use.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.key} delay={i * 80}>
              <div className="group relative bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 hover:border-transparent transition-all duration-300 flex flex-col h-full">

                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: `0 20px 50px -12px ${p.accent}55`, border: `1px solid ${p.accent}30` }} />

                <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${p.accent}, ${p.accent}88)` }} />

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300"
                        style={{ background: `linear-gradient(135deg, ${p.accentLight}, ${p.accent}22)` }}>
                        <p.Icon className="w-6 h-6" style={{ color: p.accent }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 leading-tight">{p.name}</h3>
                        <p className="text-xs font-semibold mt-0.5" style={{ color: p.accent }}>{p.tagline}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <p className="text-xl font-bold text-gray-900">{p.stat.value}</p>
                      <p className="text-xs text-gray-400 leading-tight max-w-[80px]">{p.stat.label}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 leading-relaxed mb-6">{p.desc}</p>

                  <ul className="grid grid-cols-1 gap-2 mb-8 flex-1">
                    {p.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: p.accent }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-3 mt-auto">
                    <Link href={p.register} className="flex-1 text-center text-sm font-semibold text-white py-3 rounded-2xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.accent}cc)`, boxShadow: `0 8px 20px -8px ${p.accent}99` }}>
                      Try free
                    </Link>
                    <Link href={p.href} className="flex items-center gap-1.5 justify-center text-sm font-semibold text-gray-700 px-5 py-3 rounded-2xl border border-gray-200 hover:border-gray-400 transition-colors">
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
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
    <section id="why" className="bg-[#0a0f1e] py-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        <Reveal>
          <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-3">Why Smapey</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight max-w-2xl">
            Simple is a feature,<br />
            <span className="text-white/40">not a compromise.</span>
          </h2>
          <p className="mt-4 text-white/40 max-w-lg text-base leading-relaxed">
            Most business software is designed by people who've never run a small business. We built Smapey from the opposite direction — starting with what you actually need.
          </p>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 80}>
              <div className="bg-white/5 hover:bg-white/8 border border-white/8 rounded-3xl p-7 transition-colors h-full">
                <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                  <w.Icon className="w-5 h-5 text-white/60" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{w.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* COMPARISON */}
        <Reveal delay={200}>
          <div className="mt-10 bg-white/5 border border-white/8 rounded-3xl p-8">
            <p className="text-sm font-semibold text-white/50 mb-6 uppercase tracking-widest">Smapey vs. the old way</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-4">The old way</p>
                {[
                  "5+ apps, 5+ monthly subscriptions",
                  "Weeks of setup before you see any value",
                  "Manual spreadsheets for everything",
                  "Enterprise tools priced for enterprises",
                ].map(t => (
                  <div key={t} className="flex items-center gap-3 py-2.5 border-b border-white/5">
                    <X className="w-4 h-4 text-red-400 shrink-0" />
                    <span className="text-sm text-white/40">{t}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4">With Smapey</p>
                {[
                  "One platform, pick only what you need",
                  "Ready to use in minutes, not weeks",
                  "Everything tracked automatically",
                  "Free to start, affordable to grow",
                ].map(t => (
                  <div key={t} className="flex items-center gap-3 py-2.5 border-b border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-sm text-white/70">{t}</span>
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
  return (
    <section className="bg-gray-50 py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-14">
          <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">Real businesses</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Small business owners love it.
          </h2>
          <p className="mt-3 text-gray-500 max-w-md mx-auto">
            From gym owners to freelancers — here's what they say after switching to Smapey.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="bg-white rounded-3xl border border-gray-200 p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-100">
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center shrink-0`}>
                    <span className="text-xs font-bold text-white">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
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
    <section id="cta" className="bg-white py-28 px-6 text-center">
      <div className="max-w-3xl mx-auto">

        <Reveal>
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 rounded-full px-4 py-2 text-xs font-semibold mb-6">
            <CheckCircle2 className="w-3.5 h-3.5" /> Free plan · No credit card · Cancel anytime
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Your business deserves<br />better tools.
          </h2>
          <p className="mt-5 text-lg text-gray-500 max-w-lg mx-auto">
            Join thousands of small business owners who stopped wrestling with spreadsheets and expensive software — and just started running their business.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            {PRODUCTS.map(p => (
              <Link key={p.key} href={p.register}
                className="flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-2xl border-2 transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={{ borderColor: p.accent, color: p.accent }}>
                <p.Icon className="w-4 h-4" />
                {p.name}
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-gray-400">
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
    <footer className="bg-gray-50 border-t border-gray-200 px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <img src="/logo.png" alt="Smapey" className="h-7 w-7 object-contain" />
              <span className="text-base font-bold text-gray-900">Smapey</span>
            </div>
            <p className="text-xs text-gray-400 max-w-[200px] leading-relaxed">Simple business software for small businesses & startups.</p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {PRODUCTS.map(p => (
              <Link key={p.key} href={p.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{p.name}</Link>
            ))}
            <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Blog</Link>
            <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Privacy</Link>
            <Link href="/terms-and-conditions" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Terms</Link>
          </div>

          <span className="text-sm text-gray-300">© {new Date().getFullYear()} Smapey</span>
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
