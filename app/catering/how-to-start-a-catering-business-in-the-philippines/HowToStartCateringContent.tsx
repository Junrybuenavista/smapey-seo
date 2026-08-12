"use client"

import { useEffect, useRef, useState } from "react"
import InternalLinks from "@/components/InternalLinks"
import { ChefHat, CheckCircle2, ChevronRight, Menu, X } from "lucide-react"
import { FAQS } from "./faqs"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CATERING&plan=FREE`
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
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } }, { threshold: 0.12, ...opts })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, inView }
}

function Animate({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className={className} style={{ transitionProperty: "opacity, transform", transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDelay: `${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)" }}>
      {children}
    </div>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { href: "/catering#features", label: "Features" },
    { href: "/catering#pricing", label: "Pricing" },
    { href: "/catering#faq", label: "FAQ" },
    { href: "/catering/guide", label: "Guide" },
  ]
  return (
    <nav className="sticky top-0 z-40" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/catering" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey Catering</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (<a key={l.label} href={l.href} className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>{l.label}</a>))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm font-semibold hover:opacity-60 transition-opacity px-2 py-2" style={{ color: INK }}>Sign in</a>
          <a href={REGISTER_URL} className="text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>Try free</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: INK }}>{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
          {links.map((l) => (<a key={l.label} href={l.href} className="text-sm font-semibold" style={{ color: INK }}>{l.label}</a>))}
          <a href={REGISTER_URL} className="text-sm font-bold px-4 py-2.5 rounded-full border-2 text-center" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>Try free</a>
        </div>
      )}
    </nav>
  )
}

const STEPS = [
  { num: "01", title: "Define your niche and service offering", body: [
    "Before spending money on equipment or permits, decide what kind of catering business you want to run. The catering industry in the Philippines covers a wide range: home-based food catering for small parties, full-service catering for weddings and debuts, corporate event catering, school canteen supply, and more.",
    "Picking a focused niche early makes everything else easier, your marketing, your package pricing, your supply requirements, and your staffing. Most successful catering businesses in the Philippines started by serving one type of event well before expanding.",
    "Common entry points: family celebrations (birthday parties, baptisms, reunions), school events, office catering, and wedding receptions. Wedding and debut catering generally commands higher prices but requires more coordination and planning.",
  ] },
  { num: "02", title: "Register your business", body: [
    "To operate legally in the Philippines, you'll need to register your catering business. The requirements vary by business structure (sole proprietorship vs. corporation), but for most small catering businesses, the minimum steps are:",
    "• DTI registration (for a sole proprietorship trading name)",
    "• Barangay clearance from your local barangay",
    "• Mayor's permit / Business permit from your city or municipality",
    "• BIR registration for tax purposes (TIN, official receipts, books of accounts)",
    "If you plan to operate from a commercial kitchen space, you'll also need a sanitary permit and potentially a DOH food establishment license. Home-based operations also need to comply with local ordinances, check with your barangay and city hall.",
    "Budget ₱3,000–₱10,000 for initial registration fees depending on your location and business size.",
  ] },
  { num: "03", title: "Set your packages and pricing", body: [
    "Catering pricing in the Philippines is typically structured per head (per person). Common package structures include a set per-head rate covering a fixed menu, with optional add-ons for extra dishes, drinks, or desserts.",
    "When setting prices, work backwards from your target margin: calculate your food cost per head (typically 30–40% of price), add labor cost (cook, service staff, driver), transport cost, and packaging/rentals. The remaining amount is your gross profit per booking.",
    "Example pricing range as of 2025: basic buffet packages ₱300–₱500/head, mid-range ₱600–₱900/head, premium catering ₱1,000–₱1,500/head and up.",
    "Build your packages into your catering management system before you start taking bookings. This lets you attach packages to each event and track revenue accurately from the start.",
  ] },
  { num: "04", title: "Get your equipment and kitchen set up", body: [
    "For a home-based catering startup in the Philippines, your initial equipment investment can be kept minimal. The essentials: large pots and chafing dishes, serving trays and utensils, food containers, a cooler or chiller for transport, and basic service supplies (tablecloths, serving spoons, etc.).",
    "You don't need to own everything on day one, many catering supplies can be rented per event in the Philippines. Build supplier relationships with kitchen rental and equipment rental providers in your area.",
    "As volume grows, invest in your own equipment to reduce per-event rental costs. Your supply catalog in Smapey can track which items you own vs. rent and factor costs accordingly.",
  ] },
  { num: "05", title: "Find your first clients", body: [
    "The fastest way to get your first catering clients in the Philippines is through personal and community networks. Tell family, friends, officemates, and church communities that you're taking bookings. Word of mouth is still the primary referral channel for Philippine catering businesses.",
    "Facebook is the dominant digital channel, create a dedicated Facebook page with photos of your food and packages. Join local buy-and-sell groups and community Facebook groups. If you can get even one or two early clients to post reviews or tag you in photos, it compounds quickly.",
    "Once you have a few bookings, ask for referrals proactively. Most catering bookings come from repeat clients and their social networks.",
  ] },
  { num: "06", title: "Manage your operations with a system from day one", body: [
    "The biggest operational mistake new catering businesses make is waiting too long to put a system in place. Once you're handling more than two or three events simultaneously, the complexity of tracking bookings, payment schedules, supply procurement, and staff coordination becomes unmanageable without software.",
    "Use a catering management system from your very first booking, not after you've outgrown your notebook. This means: every booking has a record, every payment milestone is tracked, every supply requirement is noted, and your monthly revenue is visible at a glance.",
    "Smapey's free catering management plan is designed for exactly this stage, a small catering business that needs structure without a subscription fee.",
  ] },
]

const CHECKLIST = [
  "Define your catering niche (weddings, corporate, home events)",
  "Register with DTI (sole proprietorship)",
  "Get barangay clearance",
  "Secure mayor's permit / business permit",
  "Complete BIR registration",
  "Obtain sanitary permit (if required)",
  "Set up 2–3 core catering packages with pricing per head",
  "Source suppliers and build your supply catalog",
  "Create a Facebook page with food photos",
  "Set up your catering management software (free with Smapey)",
  "Take your first booking and issue a payment milestone",
  "Deliver your first event and ask for a referral",
]

export default function HowToStartCateringContent() {
  useFont()
  const [open, setOpen] = useState<number | null>(null)
  return (
    <main style={{ fontFamily: display.fontFamily }}>
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden py-20 px-6" style={{ background: CREAM }}>
        <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
          <div className="absolute rounded-[22px] border-2" style={{ top: "22%", left: "-70px", width: 240, height: 70, background: AMBER, borderColor: INK, transform: "rotate(-9deg)" }} />
          <div className="absolute rounded-[22px] border-2" style={{ bottom: "14%", right: "-70px", width: 260, height: 74, background: BLUE, borderColor: INK, transform: "rotate(8deg)", boxShadow: "5px 5px 0 rgba(22,22,22,.12)" }} />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-5" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
            <ChefHat className="w-3.5 h-3.5" /> Starting a catering business · Philippines
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-5" style={{ color: INK }}>
            How to Start a Catering Business<br />
            <span style={{ color: BLUE }}>in the Philippines</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-8 leading-relaxed" style={{ color: "#54514c" }}>
            A practical, step-by-step guide to starting a catering business in the Philippines, from registration and pricing to finding clients and managing operations with software.
          </p>
          <a href={REGISTER_URL} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `4px 4px 0 ${INK}` }}>
            Start managing your catering business free <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* STEPS */}
      <section className="py-20 px-6" style={{ background: "#fff" }}>
        <div className="max-w-4xl mx-auto space-y-12">
          {STEPS.map(({ num, title, body }, i) => {
            const c = accentFor(i)
            return (
              <Animate key={num} delay={i * 60}>
                <div className="flex gap-6">
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-[16px] border-2 flex items-center justify-center font-extrabold text-sm" style={{ background: c, color: onAccent(c), borderColor: INK }}>{num}</div>
                    {i < STEPS.length - 1 && <div className="flex-1 w-px my-3" style={{ background: "rgba(22,22,22,.15)" }} />}
                  </div>
                  <div className="pb-4">
                    <h2 className="text-xl font-extrabold mb-4" style={{ color: INK }}>{title}</h2>
                    {body.map((p, j) => (
                      <p key={j} className={`leading-relaxed text-sm ${j < body.length - 1 ? "mb-3" : ""} ${p.startsWith("•") ? "pl-4" : ""}`} style={{ color: "#54514c" }}>{p}</p>
                    ))}
                  </div>
                </div>
              </Animate>
            )
          })}
        </div>
      </section>

      {/* CALLOUT */}
      <section className="py-16 px-6" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-4xl mx-auto">
          <Animate>
            <div className="rounded-[20px] border-2 p-8 flex flex-col sm:flex-row items-center gap-6" style={{ background: "#fff", borderColor: INK, boxShadow: `8px 8px 0 ${BLUE}` }}>
              <div className="w-14 h-14 rounded-[16px] border-2 flex items-center justify-center shrink-0" style={{ background: BLUE, borderColor: INK }}>
                <ChefHat className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-extrabold text-lg mb-1" style={{ color: INK }}>Ready to put a system in place?</h3>
                <p className="text-sm" style={{ color: "#54514c" }}>Smapey Catering Manager is free for small catering businesses. Manage your bookings, packages, payment milestones, and supply catalog from day one, no spreadsheets, no Messenger threads.</p>
              </div>
              <a href={REGISTER_URL} className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>
                Get started free <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </Animate>
        </div>
      </section>

      {/* CHECKLIST */}
      <section className="py-20 px-6" style={{ background: "#fff", borderTop: `2px solid ${INK}` }}>
        <div className="max-w-4xl mx-auto">
          <Animate className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center" style={{ color: INK }}>Catering business startup checklist</h2>
          </Animate>
          <div className="grid sm:grid-cols-2 gap-3">
            {CHECKLIST.map((item, i) => (
              <Animate key={item} delay={i * 40}>
                <div className="flex items-start gap-3 p-4 rounded-[14px] border-2" style={{ background: CREAM, borderColor: INK }}>
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: BLUE }} />
                  <span className="text-sm" style={{ color: INK }}>{item}</span>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-2xl mx-auto">
          <Animate className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: INK }}>Frequently asked questions</h2>
          </Animate>
          <div className="flex flex-col gap-3">
            {FAQS.map(({ q, a }, i) => (
              <Animate key={i} delay={i * 60}>
                <div className="rounded-[16px] overflow-hidden border-2 bg-white" style={{ borderColor: INK }}>
                  <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-sm" style={{ color: INK }}>
                    {q}
                    <ChevronRight className="w-4 h-4 transition-transform duration-200 shrink-0" style={{ color: BLUE, transform: open === i ? "rotate(90deg)" : "rotate(0deg)" }} />
                  </button>
                  {open === i && <div className="px-5 pb-4 text-sm leading-relaxed pt-3" style={{ color: "#54514c", borderTop: "1px solid rgba(22,22,22,.1)" }}>{a}</div>}
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: "#fff" }}>
        <Animate className="max-w-3xl mx-auto">
          <div className="rounded-[28px] border-2 p-10 text-center" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
            <h2 className="text-3xl font-extrabold mb-4" style={{ color: INK }}>Start your catering business the right way</h2>
            <p className="mb-8 max-w-lg mx-auto font-medium" style={{ color: "#5c4a28" }}>Use Smapey from your very first booking. Free forever for small catering businesses, no credit card, no setup fee.</p>
            <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>
              Get started free <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </Animate>
      </section>

      <InternalLinks cluster="catering" currentPath="/catering/how-to-start-a-catering-business-in-the-philippines" />

      <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" />
            <span className="text-sm font-extrabold" style={{ color: INK }}>Catering Manager by Smapey</span>
          </div>
          <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
