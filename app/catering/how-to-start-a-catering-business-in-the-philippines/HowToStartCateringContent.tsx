"use client"

import { useEffect, useRef, useState } from "react"
import InternalLinks from "@/components/InternalLinks"
import Link from "next/link"
import { ChefHat, CheckCircle2, ChevronRight } from "lucide-react"

function useInView(opts?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold: 0.12, ...opts }
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
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)",
    }}>
      {children}
    </div>
  )
}

const STEPS = [
  {
    num: "01",
    title: "Define your niche and service offering",
    body: [
      "Before spending money on equipment or permits, decide what kind of catering business you want to run. The catering industry in the Philippines covers a wide range: home-based food catering for small parties, full-service catering for weddings and debuts, corporate event catering, school canteen supply, and more.",
      "Picking a focused niche early makes everything else easier — your marketing, your package pricing, your supply requirements, and your staffing. Most successful catering businesses in the Philippines started by serving one type of event well before expanding.",
      "Common entry points: family celebrations (birthday parties, baptisms, reunions), school events, office catering, and wedding receptions. Wedding and debut catering generally commands higher prices but requires more coordination and planning.",
    ],
  },
  {
    num: "02",
    title: "Register your business",
    body: [
      "To operate legally in the Philippines, you'll need to register your catering business. The requirements vary by business structure (sole proprietorship vs. corporation), but for most small catering businesses, the minimum steps are:",
      "• DTI registration (for a sole proprietorship trading name)",
      "• Barangay clearance from your local barangay",
      "• Mayor's permit / Business permit from your city or municipality",
      "• BIR registration for tax purposes (TIN, official receipts, books of accounts)",
      "If you plan to operate from a commercial kitchen space, you'll also need a sanitary permit and potentially a DOH food establishment license. Home-based operations also need to comply with local ordinances — check with your barangay and city hall.",
      "Budget ₱3,000–₱10,000 for initial registration fees depending on your location and business size.",
    ],
  },
  {
    num: "03",
    title: "Set your packages and pricing",
    body: [
      "Catering pricing in the Philippines is typically structured per head (per person). Common package structures include a set per-head rate covering a fixed menu, with optional add-ons for extra dishes, drinks, or desserts.",
      "When setting prices, work backwards from your target margin: calculate your food cost per head (typically 30–40% of price), add labor cost (cook, service staff, driver), transport cost, and packaging/rentals. The remaining amount is your gross profit per booking.",
      "Example pricing range as of 2025: basic buffet packages ₱300–₱500/head, mid-range ₱600–₱900/head, premium catering ₱1,000–₱1,500/head and up.",
      "Build your packages into your catering management system before you start taking bookings. This lets you attach packages to each event and track revenue accurately from the start.",
    ],
  },
  {
    num: "04",
    title: "Get your equipment and kitchen set up",
    body: [
      "For a home-based catering startup in the Philippines, your initial equipment investment can be kept minimal. The essentials: large pots and chafing dishes, serving trays and utensils, food containers, a cooler or chiller for transport, and basic service supplies (tablecloths, serving spoons, etc.).",
      "You don't need to own everything on day one — many catering supplies can be rented per event in the Philippines. Build supplier relationships with kitchen rental and equipment rental providers in your area.",
      "As volume grows, invest in your own equipment to reduce per-event rental costs. Your supply catalog in Smapey can track which items you own vs. rent and factor costs accordingly.",
    ],
  },
  {
    num: "05",
    title: "Find your first clients",
    body: [
      "The fastest way to get your first catering clients in the Philippines is through personal and community networks. Tell family, friends, officemates, and church communities that you're taking bookings. Word of mouth is still the primary referral channel for Philippine catering businesses.",
      "Facebook is the dominant digital channel — create a dedicated Facebook page with photos of your food and packages. Join local buy-and-sell groups and community Facebook groups. If you can get even one or two early clients to post reviews or tag you in photos, it compounds quickly.",
      "Once you have a few bookings, ask for referrals proactively. Most catering bookings come from repeat clients and their social networks.",
    ],
  },
  {
    num: "06",
    title: "Manage your operations with a system from day one",
    body: [
      "The biggest operational mistake new catering businesses make is waiting too long to put a system in place. Once you're handling more than two or three events simultaneously, the complexity of tracking bookings, payment schedules, supply procurement, and staff coordination becomes unmanageable without software.",
      "Use a catering management system from your very first booking — not after you've outgrown your notebook. This means: every booking has a record, every payment milestone is tracked, every supply requirement is noted, and your monthly revenue is visible at a glance.",
      "Smapey's free catering management plan is designed for exactly this stage — a small catering business that needs structure without a subscription fee.",
    ],
  },
]

const FAQS = [
  {
    q: "How much capital do you need to start a catering business in the Philippines?",
    a: "A home-based catering startup can begin with as little as ₱15,000–₱30,000 for basic equipment, permits, and initial supplies. If you rent equipment for your first few events rather than buying, startup costs drop further. Capital scales with ambition — full commercial kitchen setups can require ₱200,000–₱500,000 or more.",
  },
  {
    q: "Do I need to have a commercial kitchen to start a catering business?",
    a: "For most small home-based catering businesses in the Philippines, a home kitchen is sufficient to get started. However, if you plan to cater for large corporate events or obtain certain permits, a commercial kitchen may be required. Some caterers rent commercial kitchen space per booking to keep overhead low.",
  },
  {
    q: "What permits do I need to start a catering business in the Philippines?",
    a: "At minimum: DTI registration (sole proprietorship), barangay clearance, mayor's permit, and BIR registration. If you're serving food publicly, a sanitary permit is typically required. Check specific requirements with your local government unit, as these vary by city and municipality.",
  },
  {
    q: "How do I price my catering packages?",
    a: "Calculate food cost per head (target 30–40% of selling price), add labor, transport, and rentals. The remainder is your gross margin. Research local competitor pricing to ensure you're in range. Start with two or three clearly defined packages rather than quoting custom menus for every inquiry.",
  },
  {
    q: "What software should I use to manage a catering business in the Philippines?",
    a: "Start with a dedicated catering management system that handles bookings, packages, payment milestones, supply catalog, and staff assignment. Smapey's catering module covers all of these on a free plan — no credit card required. Using spreadsheets and chat apps works early on but creates serious operational gaps as your volume grows.",
  },
]

export default function HowToStartCateringContent() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/catering" className="flex items-center gap-2">
            <img src="/logo.png" alt="Smapey" className="w-7 h-7 rounded-lg" />
            <span className="font-bold text-slate-800 text-sm">Smapey Catering</span>
          </Link>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CATERING&plan=FREE`}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-colors shadow-md shadow-rose-600/20">
            Try free
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-gradient-to-br from-rose-50 via-pink-50 to-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold mb-5">
            <ChefHat className="w-3.5 h-3.5" /> Starting a catering business · Philippines
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
            How to Start a Catering Business<br />
            <span className="text-rose-600">in the Philippines</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed">
            A practical, step-by-step guide to starting a catering business in the Philippines — from registration and pricing to finding clients and managing operations with software.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CATERING&plan=FREE`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-all shadow-lg shadow-rose-500/25">
              Start managing your catering business free <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-16">
          {STEPS.map(({ num, title, body }, i) => (
            <Animate key={num} delay={i * 60}>
              <div className="flex gap-6">
                <div className="shrink-0 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-400 flex items-center justify-center text-white font-extrabold text-sm shadow-lg shadow-rose-400/20">
                    {num}
                  </div>
                  {i < STEPS.length - 1 && <div className="flex-1 w-px bg-slate-100 my-3" />}
                </div>
                <div className="pb-4">
                  <h2 className="text-xl font-extrabold text-slate-800 mb-4">{title}</h2>
                  {body.map((p, j) => (
                    <p key={j} className={`text-slate-500 leading-relaxed text-sm ${j < body.length - 1 ? "mb-3" : ""} ${p.startsWith("•") ? "pl-4" : ""}`}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </Animate>
          ))}
        </div>
      </section>

      {/* SMAPEY CTA CALLOUT */}
      <section className="py-16 px-6 bg-rose-50">
        <div className="max-w-4xl mx-auto">
          <Animate>
            <div className="bg-white rounded-2xl border border-rose-100 shadow-sm p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 to-pink-400 flex items-center justify-center shrink-0 shadow-lg shadow-rose-400/20">
                <ChefHat className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-extrabold text-slate-800 text-lg mb-1">Ready to put a system in place?</h3>
                <p className="text-slate-500 text-sm">
                  Smapey Catering Manager is free for small catering businesses. Manage your bookings, packages, payment milestones, and supply catalog from day one — no spreadsheets, no Messenger threads.
                </p>
              </div>
              <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CATERING&plan=FREE`}
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-all shadow-md shadow-rose-600/20">
                Get started free <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </Animate>
        </div>
      </section>

      {/* QUICK CHECKLIST */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <Animate className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 text-center">
              Catering business startup checklist
            </h2>
          </Animate>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
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
            ].map((item, i) => (
              <Animate key={item} delay={i * 40}>
                <div className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50">
                  <CheckCircle2 className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                  <span className="text-slate-700 text-sm">{item}</span>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-2xl mx-auto">
          <Animate className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Frequently asked questions</h2>
          </Animate>
          <div className="flex flex-col gap-3">
            {FAQS.map(({ q, a }, i) => (
              <Animate key={i} delay={i * 60}>
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <button onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors">
                    {q}
                    <ChevronRight className={`w-4 h-4 text-rose-400 transition-transform duration-200 shrink-0 ${open === i ? "rotate-90" : ""}`} />
                  </button>
                  {open === i && <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3">{a}</div>}
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-rose-600 to-pink-500 text-white text-center">
        <Animate className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4">Start your catering business the right way</h2>
          <p className="text-rose-100/80 mb-8 max-w-lg mx-auto">
            Use Smapey from your very first booking. Free forever for small catering businesses — no credit card, no setup fee.
          </p>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CATERING&plan=FREE`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-rose-600 font-semibold hover:bg-rose-50 transition-all shadow-xl">
            Get started free <ChevronRight className="w-4 h-4" />
          </a>
        </Animate>
      </section>

      <InternalLinks cluster="catering" currentPath="/catering/how-to-start-a-catering-business-in-the-philippines" />

      <footer className="bg-slate-900 px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md" />
          <span className="text-white/60 text-sm font-semibold">Smapey Catering Manager</span>
        </div>
        <p className="text-white/20 text-xs">© {new Date().getFullYear()} Smapey. All rights reserved.</p>
      </footer>
    </main>
  )
}
