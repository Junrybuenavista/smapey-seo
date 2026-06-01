"use client"

import { useEffect, useRef, useState } from "react"
import InternalLinks from "@/components/InternalLinks"
import Link from "next/link"
import { Building2, CheckCircle2, ChevronRight, Banknote, Users, BedDouble, Zap } from "lucide-react"

function useInView(opts?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold: 0.1, ...opts }
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

export default function BoardingHousePlanContent() {
  return (
    <main className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/boarding-house" className="flex items-center gap-2">
            <img src="/logo.png" alt="Smapey" className="w-7 h-7 rounded-lg" />
            <span className="font-bold text-slate-800 text-sm">Smapey Boarding House</span>
          </Link>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOARDING_HOUSE&plan=FREE`}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white transition-colors shadow-md shadow-orange-600/20">
            Try free
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-gradient-to-br from-orange-50 via-amber-50 to-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Animate>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold mb-5">
              <Building2 className="w-3.5 h-3.5" /> Boarding house business plan · Philippines
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              Boarding House Business Plan<br />
              <span className="text-orange-600">Sample for the Philippines</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              A practical business plan template for Philippine boarding house owners — covering business overview, target market, services, pricing model, and how to manage it all with a digital system.
            </p>
          </Animate>
        </div>
      </section>

      {/* BUSINESS PLAN */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-14">

          {/* Section 1 */}
          <Animate>
            <div className="border-l-4 border-orange-500 pl-6">
              <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-2">Section 1</p>
              <h2 className="text-2xl font-extrabold text-slate-800 mb-4">Business Overview</h2>
              <p className="text-slate-500 leading-relaxed mb-3">
                <strong className="text-slate-700">Business name:</strong> [Your Boarding House Name]
              </p>
              <p className="text-slate-500 leading-relaxed mb-3">
                <strong className="text-slate-700">Business type:</strong> Boarding house / dormitory / bedspace rental
              </p>
              <p className="text-slate-500 leading-relaxed mb-3">
                <strong className="text-slate-700">Location:</strong> [City / Municipality], Philippines — preferably near a university, hospital, call center, or business district
              </p>
              <p className="text-slate-500 leading-relaxed mb-3">
                <strong className="text-slate-700">Business goal:</strong> Provide affordable, clean, and safe lodging for students, young professionals, and workers — while generating consistent monthly rental income for the property owner.
              </p>
              <p className="text-slate-500 leading-relaxed">
                A boarding house in the Philippines operates by renting out individual rooms or bedspaces to multiple tenants who share common areas (bathroom, kitchen, living room). The landlord charges monthly rent plus utility fees, and manages move-ins, move-outs, and collections on a rolling basis.
              </p>
            </div>
          </Animate>

          {/* Section 2 */}
          <Animate>
            <div className="border-l-4 border-amber-400 pl-6">
              <p className="text-amber-600 text-xs font-bold uppercase tracking-widest mb-2">Section 2</p>
              <h2 className="text-2xl font-extrabold text-slate-800 mb-4">Target Market</h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                The primary market for a Philippine boarding house business includes:
              </p>
              <ul className="space-y-3">
                {[
                  { label: "College students", desc: "Living away from home near their university or college. Key driver in cities like Manila, Cebu, Davao, Cagayan de Oro, and Bacolod." },
                  { label: "Young professionals", desc: "First-time workers who want affordable housing near their office, BPO company, or hospital." },
                  { label: "OFW families", desc: "Relatives of Overseas Filipino Workers who need temporary or semi-permanent housing in urban areas." },
                  { label: "Nurses and healthcare workers", desc: "Hospital staff who need housing close to their work and appreciate a quiet, structured environment." },
                ].map(({ label, desc }) => (
                  <li key={label} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-slate-500 text-sm leading-relaxed"><strong className="text-slate-700">{label}:</strong> {desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Animate>

          {/* Section 3 */}
          <Animate>
            <div className="border-l-4 border-orange-400 pl-6">
              <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-2">Section 3</p>
              <h2 className="text-2xl font-extrabold text-slate-800 mb-4">Services & Room Types</h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                Define clearly what you offer to attract the right tenants and set accurate pricing:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: BedDouble, title: "Bedspace / Shared Room", desc: "2–6 beds per room. Shared bathroom. Lower rate — ideal for students on a tight budget." },
                  { icon: BedDouble, title: "Private Room", desc: "One tenant per room. May include aircon or fan. Higher rate — suits young professionals." },
                  { icon: Zap, title: "With Utilities Included", desc: "Monthly rate covers electricity and water. Simpler for tenants — easier to market." },
                  { icon: Banknote, title: "Utilities Billed Separately", desc: "Tenant pays rent + utility share. More transparent and fair for high-usage tenants." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{title}</p>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Animate>

          {/* Section 4 */}
          <Animate>
            <div className="border-l-4 border-yellow-400 pl-6">
              <p className="text-yellow-600 text-xs font-bold uppercase tracking-widest mb-2">Section 4</p>
              <h2 className="text-2xl font-extrabold text-slate-800 mb-4">Pricing Model</h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                Philippine boarding house rates vary by location, amenities, and room type. A typical range:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-orange-50">
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 border border-orange-100">Room Type</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 border border-orange-100">Monthly Rate (Metro Manila)</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-700 border border-orange-100">Monthly Rate (Provincial)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Bedspace (fan, shared bath)", "₱2,500 – ₱4,500", "₱1,500 – ₱3,000"],
                      ["Bedspace (aircon, shared bath)", "₱4,000 – ₱6,000", "₱2,500 – ₱4,000"],
                      ["Private room (fan)", "₱4,500 – ₱7,000", "₱2,500 – ₱4,500"],
                      ["Private room (aircon, own bath)", "₱7,000 – ₱12,000", "₱4,000 – ₱7,000"],
                    ].map(([type, metro, prov]) => (
                      <tr key={type} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-slate-600 border border-slate-100">{type}</td>
                        <td className="px-4 py-3 text-slate-600 border border-slate-100">{metro}</td>
                        <td className="px-4 py-3 text-slate-600 border border-slate-100">{prov}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-slate-400 text-xs mt-3">Rates are approximate and vary by specific location, amenities, and demand. Adjust based on your local market.</p>
            </div>
          </Animate>

          {/* Section 5 */}
          <Animate>
            <div className="border-l-4 border-orange-500 pl-6">
              <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-2">Section 5</p>
              <h2 className="text-2xl font-extrabold text-slate-800 mb-4">Operations Plan</h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                Day-to-day operations of a boarding house business in the Philippines typically involve:
              </p>
              <div className="space-y-4">
                {[
                  { title: "Tenant onboarding", desc: "Collect a security deposit (usually 1 month advance + 1 month deposit). Sign a simple lease agreement. Register the tenant's ID and emergency contact." },
                  { title: "Monthly billing", desc: "Issue rent bills at the start of each month. If utilities are billed separately, calculate each tenant's share of electricity and water based on meter readings or flat allocation." },
                  { title: "Payment collection", desc: "Accept payments via cash, GCash, or bank transfer. Record every payment against the correct bill. Follow up on overdue accounts promptly." },
                  { title: "Move-outs", desc: "Confirm the move-out date, do a room inspection, and return the deposit (minus deductions) within an agreed period. Update room availability immediately." },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{title}</p>
                      <p className="text-slate-500 text-sm mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Animate>

          {/* Section 6 */}
          <Animate>
            <div className="border-l-4 border-amber-500 pl-6">
              <p className="text-amber-600 text-xs font-bold uppercase tracking-widest mb-2">Section 6</p>
              <h2 className="text-2xl font-extrabold text-slate-800 mb-4">Management System</h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                Running a boarding house manually — with notebooks, spreadsheets, or WhatsApp group chats — works for 2 or 3 tenants. Once you have 5 or more rooms, the administration becomes the bottleneck.
              </p>
              <p className="text-slate-500 leading-relaxed mb-4">
                A dedicated <strong className="text-slate-700">boarding house management system</strong> like Smapey handles all of the above automatically:
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Rooms and occupancy tracked in real time",
                  "Tenant profiles with full contact and ID records",
                  "Monthly rent bills generated per tenant",
                  "Separate utility bills for electricity, water, internet",
                  "Full or partial payment recording",
                  "Overdue bill alerts on the dashboard",
                  "Revenue trend chart — rent vs. utilities, last 6 months",
                ].map(t => (
                  <li key={t} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
              <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOARDING_HOUSE&plan=FREE`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm transition-all shadow-lg shadow-orange-500/25">
                Try Smapey free — no credit card <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </Animate>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-orange-600 to-amber-500 text-white text-center">
        <Animate className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4">Ready to run your boarding house business properly?</h2>
          <p className="text-orange-100/80 mb-8 max-w-lg mx-auto">
            Smapey is the management system for Philippine boarding houses — rooms, tenants, billing, and collections in one dashboard. Free to start.
          </p>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOARDING_HOUSE&plan=FREE`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-orange-600 font-semibold hover:bg-orange-50 transition-all shadow-xl">
            Get started free <ChevronRight className="w-4 h-4" />
          </a>
        </Animate>
      </section>

      <InternalLinks cluster="boarding-house" currentPath="/boarding-house/boarding-house-business-plan-sample-philippines" />

      <footer className="bg-slate-900 px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md" />
          <span className="text-white/60 text-sm font-semibold">Smapey Boarding House Manager</span>
        </div>
        <p className="text-white/20 text-xs">© {new Date().getFullYear()} Smapey. All rights reserved.</p>
      </footer>
    </main>
  )
}
