"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import SiloBreadcrumbs from "@/components/silo/SiloBreadcrumbs"
import SiloSiblings from "@/components/silo/SiloSiblings"
import SiloUpwardLinks from "@/components/silo/SiloUpwardLinks"
import { siloContextFor, anchorFor } from "@/lib/silo"

const PARENT = "/boarding-house/boarding-house-permits-and-roi"
import { Building2, CheckCircle2, ChevronRight, Banknote, BedDouble, Zap, Menu, X } from "lucide-react"

const PATH = "/boarding-house/boarding-house-business-plan-sample-philippines"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=BOARDING_HOUSE&plan=FREE`
const accentFor = (i: number) => (i % 2 === 0 ? BLUE : AMBER)

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
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } }, { threshold: 0.1, ...opts })
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
    { href: "/boarding-house#features", label: "Features" },
    { href: "/boarding-house#pricing", label: "Pricing" },
    { href: "/boarding-house#faq", label: "FAQ" },
    { href: "/boarding-house/guide", label: "Guide" },
  ]
  return (
    <nav className="sticky top-0 z-40" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/boarding-house" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey Boarding House</span>
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

function Section({ index, eyebrow, title, children }: { index: number; eyebrow: string; title: string; children: React.ReactNode }) {
  const c = accentFor(index)
  return (
    <Animate>
      <div className="pl-6" style={{ borderLeft: `4px solid ${c}` }}>
        <p className="text-xs font-extrabold uppercase tracking-widest mb-2" style={{ color: c === AMBER ? "#b06c00" : BLUE }}>{eyebrow}</p>
        <h2 className="text-2xl font-extrabold mb-4" style={{ color: INK }}>{title}</h2>
        {children}
      </div>
    </Animate>
  )
}

export default function BoardingHousePlanContent() {
  useFont()
  return (
    <main style={{ fontFamily: display.fontFamily }}>
      <Navbar />
      <SiloBreadcrumbs ctx={siloContextFor(PATH)} />

      {/* HERO */}
      <section className="relative overflow-hidden py-20 px-6" style={{ background: CREAM }}>
        <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
          <div className="absolute rounded-[22px] border-2" style={{ top: "22%", left: "-70px", width: 240, height: 70, background: AMBER, borderColor: INK, transform: "rotate(-9deg)" }} />
          <div className="absolute rounded-[22px] border-2" style={{ bottom: "14%", right: "-70px", width: 260, height: 74, background: BLUE, borderColor: INK, transform: "rotate(8deg)", boxShadow: "5px 5px 0 rgba(22,22,22,.12)" }} />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <Animate>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-5" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
              <Building2 className="w-3.5 h-3.5" /> Boarding house business plan · Philippines
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-5" style={{ color: INK }}>
              Boarding House Business Plan<br />
              <span style={{ color: BLUE }}>Sample for the Philippines</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "#54514c" }}>
              A practical business plan template for Philippine boarding house owners, covering business overview, target market, services, pricing model, and how to manage it all with a digital system.{" "}For what the paperwork and the numbers behind it look like, see{" "}
        <Link href={PARENT} className="font-bold underline" style={{ color: BLUE }}>
          {anchorFor(PARENT, PATH)}
        </Link>.
      </p>
          </Animate>
        </div>
      </section>

      {/* BUSINESS PLAN */}
      <section className="py-20 px-6" style={{ background: "#fff" }}>
        <div className="max-w-4xl mx-auto space-y-14">

          <Section index={0} eyebrow="Section 1" title="Business Overview">
            <p className="leading-relaxed mb-3" style={{ color: "#54514c" }}><strong style={{ color: INK }}>Business name:</strong> [Your Boarding House Name]</p>
            <p className="leading-relaxed mb-3" style={{ color: "#54514c" }}><strong style={{ color: INK }}>Business type:</strong> Boarding house / dormitory / bedspace rental</p>
            <p className="leading-relaxed mb-3" style={{ color: "#54514c" }}><strong style={{ color: INK }}>Location:</strong> [City / Municipality], Philippines, preferably near a university, hospital, call center, or business district</p>
            <p className="leading-relaxed mb-3" style={{ color: "#54514c" }}><strong style={{ color: INK }}>Business goal:</strong> Provide affordable, clean, and safe lodging for students, young professionals, and workers, while generating consistent monthly rental income for the property owner.</p>
            <p className="leading-relaxed" style={{ color: "#54514c" }}>A boarding house in the Philippines operates by renting out individual rooms or bedspaces to multiple tenants who share common areas (bathroom, kitchen, living room). The landlord charges monthly rent plus utility fees, and manages move-ins, move-outs, and collections on a rolling basis.</p>
          </Section>

          <Section index={1} eyebrow="Section 2" title="Target Market">
            <p className="leading-relaxed mb-4" style={{ color: "#54514c" }}>The primary market for a Philippine boarding house business includes:</p>
            <ul className="space-y-3">
              {[
                { label: "College students", desc: "Living away from home near their university or college. Key driver in cities like Manila, Cebu, Davao, Cagayan de Oro, and Bacolod." },
                { label: "Young professionals", desc: "First-time workers who want affordable housing near their office, BPO company, or hospital." },
                { label: "OFW families", desc: "Relatives of Overseas Filipino Workers who need temporary or semi-permanent housing in urban areas." },
                { label: "Nurses and healthcare workers", desc: "Hospital staff who need housing close to their work and appreciate a quiet, structured environment." },
              ].map(({ label, desc }) => (
                <li key={label} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: AMBER }} />
                  <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}><strong style={{ color: INK }}>{label}:</strong> {desc}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section index={2} eyebrow="Section 3" title="Services & Room Types">
            <p className="leading-relaxed mb-4" style={{ color: "#54514c" }}>Define clearly what you offer to attract the right tenants and set accurate pricing:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: BedDouble, title: "Bedspace / Shared Room", desc: "2–6 beds per room. Shared bathroom. Lower rate - ideal for students on a tight budget." },
                { icon: BedDouble, title: "Private Room", desc: "One tenant per room. May include aircon or fan. Higher rate - suits young professionals." },
                { icon: Zap, title: "With Utilities Included", desc: "Monthly rate covers electricity and water. Simpler for tenants - easier to market." },
                { icon: Banknote, title: "Utilities Billed Separately", desc: "Tenant pays rent + utility share. More transparent and fair for high-usage tenants." },
              ].map(({ icon: Icon, title, desc }, i) => {
                const c = accentFor(i)
                return (
                  <div key={title} className="rounded-[16px] border-2 p-4 flex items-start gap-3" style={{ background: CREAM, borderColor: INK }}>
                    <div className="w-8 h-8 rounded-[10px] border-2 flex items-center justify-center shrink-0" style={{ background: c, borderColor: INK }}>
                      <Icon className="w-4 h-4" style={{ color: c === AMBER ? INK : "#fff" }} />
                    </div>
                    <div>
                      <p className="font-extrabold text-sm" style={{ color: INK }}>{title}</p>
                      <p className="text-xs mt-1 leading-relaxed" style={{ color: "#54514c" }}>{desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Section>

          <Section index={3} eyebrow="Section 4" title="Pricing Model">
            <p className="leading-relaxed mb-4" style={{ color: "#54514c" }}>Philippine boarding house rates vary by location, amenities, and room type. A typical range:</p>
            <div className="overflow-x-auto rounded-[16px] border-2" style={{ borderColor: INK, boxShadow: `5px 5px 0 ${BLUE}` }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: INK }}>
                    <th className="text-left px-4 py-3 font-bold text-white">Room Type</th>
                    <th className="text-left px-4 py-3 font-bold text-white">Monthly Rate (Metro Manila)</th>
                    <th className="text-left px-4 py-3 font-bold text-white">Monthly Rate (Provincial)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Bedspace (fan, shared bath)", "₱2,500 – ₱4,500", "₱1,500 – ₱3,000"],
                    ["Bedspace (aircon, shared bath)", "₱4,000 – ₱6,000", "₱2,500 – ₱4,000"],
                    ["Private room (fan)", "₱4,500 – ₱7,000", "₱2,500 – ₱4,500"],
                    ["Private room (aircon, own bath)", "₱7,000 – ₱12,000", "₱4,000 – ₱7,000"],
                  ].map(([type, metro, prov], i) => (
                    <tr key={type} style={{ background: i % 2 ? CREAM : "#fff" }}>
                      <td className="px-4 py-3" style={{ color: INK }}>{type}</td>
                      <td className="px-4 py-3" style={{ color: "#54514c" }}>{metro}</td>
                      <td className="px-4 py-3" style={{ color: "#54514c" }}>{prov}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-3" style={{ color: "#9a948b" }}>Rates are approximate and vary by specific location, amenities, and demand. Adjust based on your local market.</p>
          </Section>

          <Section index={4} eyebrow="Section 5" title="Operations Plan">
            <p className="leading-relaxed mb-4" style={{ color: "#54514c" }}>Day-to-day operations of a boarding house business in the Philippines typically involve:</p>
            <div className="space-y-4">
              {[
                { title: "Tenant onboarding", desc: "Collect a security deposit (usually 1 month advance + 1 month deposit). Sign a simple lease agreement. Register the tenant's ID and emergency contact." },
                { title: "Monthly billing", desc: "Issue rent bills at the start of each month. If utilities are billed separately, calculate each tenant's share of electricity and water based on meter readings or flat allocation." },
                { title: "Payment collection", desc: "Accept payments via cash, GCash, or bank transfer. Record every payment against the correct bill. Follow up on overdue accounts promptly." },
                { title: "Move-outs", desc: "Confirm the move-out date, do a room inspection, and return the deposit (minus deductions) within an agreed period. Update room availability immediately." },
              ].map(({ title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-1" style={{ color: BLUE }} />
                  <div>
                    <p className="font-extrabold text-sm" style={{ color: INK }}>{title}</p>
                    <p className="text-sm mt-0.5 leading-relaxed" style={{ color: "#54514c" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section index={5} eyebrow="Section 6" title="Management System">
            <p className="leading-relaxed mb-4" style={{ color: "#54514c" }}>Running a boarding house manually (with notebooks, spreadsheets, or WhatsApp group chats) works for 2 or 3 tenants. Once you have 5 or more rooms, the administration becomes the bottleneck.</p>
            <p className="leading-relaxed mb-4" style={{ color: "#54514c" }}>A dedicated <strong style={{ color: INK }}>boarding house management system</strong> like Smapey handles all of the above automatically:</p>
            <ul className="space-y-2 mb-6">
              {[
                "Rooms and occupancy tracked in real time",
                "Tenant profiles with full contact and ID records",
                "Monthly rent bills generated per tenant",
                "Separate utility bills for electricity, water, internet",
                "Full or partial payment recording",
                "Overdue bill alerts on the dashboard",
                "Revenue trend chart, rent vs. utilities, last 6 months",
              ].map(t => (
                <li key={t} className="flex items-center gap-2 text-sm" style={{ color: "#54514c" }}>
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: BLUE }} />{t}
                </li>
              ))}
            </ul>
            <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>
              Try Smapey free, no credit card <ChevronRight className="w-4 h-4" />
            </a>
          </Section>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: "#fff" }}>
        <Animate className="max-w-3xl mx-auto">
          <div className="rounded-[28px] border-2 p-10 text-center" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
            <h2 className="text-3xl font-extrabold mb-4" style={{ color: INK }}>Ready to run your boarding house business properly?</h2>
            <p className="mb-8 max-w-lg mx-auto font-medium" style={{ color: "#5c4a28" }}>Smapey is the management system for Philippine boarding houses, rooms, tenants, billing, and collections in one dashboard. Free to start.</p>
            <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>
              Get started free <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </Animate>
      </section>

      {/* A Tier 4 leaf: laterally within branch C only, then up to its parent
          and the money page. The cluster-wide module linked across branches. */}
      <SiloSiblings ctx={siloContextFor(PATH)} />
      <SiloUpwardLinks ctx={siloContextFor(PATH)} />

      <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" />
            <span className="text-sm font-extrabold" style={{ color: INK }}>Boarding House Manager by Smapey</span>
          </div>
          <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
