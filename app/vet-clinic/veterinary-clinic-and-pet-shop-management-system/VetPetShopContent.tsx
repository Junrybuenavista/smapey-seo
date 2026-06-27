"use client"

import { useState, useEffect, useRef } from "react"
import InternalLinks from "@/components/InternalLinks"
import { PawPrint, Syringe, Receipt, CalendarDays, CheckCircle2, ChevronRight, Menu, X, BarChart3, ListOrdered, Users, Shield } from "lucide-react"

const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=VET_CLINIC&plan=FREE`
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
  const ref = useRef<HTMLDivElement>(null); const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.1, ...opts })
    obs.observe(el); return () => obs.disconnect()
  }, []); return { ref, inView }
}
function Animate({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView()
  return <div ref={ref} className={className} style={{ transitionProperty: "opacity, transform", transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDelay: `${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)" }}>{children}</div>
}

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/vet-clinic" className="flex items-center gap-2.5"><img src="/logo.png" alt="Smapey" className="w-8 h-8 rounded-lg object-cover" /><span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey Vet</span></a>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm font-semibold hover:opacity-60 transition-opacity px-2 py-2" style={{ color: INK }}>Sign in</a>
          <a href={REGISTER_URL} className="text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>Get started free</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: INK }}>{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && <div className="md:hidden px-6 py-4" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}><a href={REGISTER_URL} className="block text-sm font-bold px-4 py-2.5 rounded-full border-2 text-center" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>Get started free</a></div>}
    </nav>
  )
}

const CAPABILITIES = [
  { icon: PawPrint, title: "Pet Profiles", desc: "Complete pet records — species, breed, age, weight, owner info, medical notes, and visit history. Works for dogs, cats, birds, reptiles, and more." },
  { icon: CalendarDays, title: "Appointment Management", desc: "Book clinic visits and grooming sessions by pet, vet or staff member, date, and time. Status tracking from Pending to Completed." },
  { icon: Syringe, title: "Vaccination Tracking", desc: "Log every vaccination with vaccine name, date, and next due date. A 30-day reminder list keeps your team ahead of overdue pets." },
  { icon: ListOrdered, title: "Live Queue Board", desc: "Real-time kanban board showing every pet In Queue, In Progress, or Done — per vet or staff member, all at once." },
  { icon: Receipt, title: "Billing & Payments", desc: "Itemized bills for consultations, grooming, medicines, and supplies. Track partial and full payments across GCash, Cash, Card, and more." },
  { icon: BarChart3, title: "Dashboard Analytics", desc: "At-a-glance stats: today's schedule, unpaid bills, upcoming vaccinations, monthly appointment trends, and completion rates." },
  { icon: Users, title: "Team Management", desc: "Invite vets, groomers, and reception staff with role-based access. Control exactly who can book, edit, bill, or only view." },
  { icon: Shield, title: "Secure & Isolated", desc: "Your clinic's data is fully isolated — pet records, billing history, and staff accounts are never mixed with other businesses." },
]

const COMPARISON = [
  { area: "Pet records & medical history", ours: true, paper: false, spreadsheet: false },
  { area: "Appointment scheduling", ours: true, paper: false, spreadsheet: true },
  { area: "Live queue board", ours: true, paper: false, spreadsheet: false },
  { area: "Vaccination tracking & reminders", ours: true, paper: true, spreadsheet: false },
  { area: "Itemized billing & payments", ours: true, paper: false, spreadsheet: false },
  { area: "Analytics dashboard", ours: true, paper: false, spreadsheet: false },
  { area: "Team roles & access control", ours: true, paper: false, spreadsheet: false },
]

export default function VetPetShopContent() {
  useFont()
  return (
    <main style={{ fontFamily: display.fontFamily }}>
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-20" style={{ background: CREAM }}>
        <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
          <div className="absolute rounded-[22px] border-2" style={{ top: "24%", left: "-70px", width: 240, height: 70, background: AMBER, borderColor: INK, transform: "rotate(-9deg)" }} />
          <div className="absolute rounded-[22px] border-2" style={{ bottom: "16%", right: "-70px", width: 260, height: 74, background: BLUE, borderColor: INK, transform: "rotate(8deg)", boxShadow: "5px 5px 0 rgba(22,22,22,.12)" }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-6" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
            <PawPrint className="w-3 h-3" /> Veterinary Clinic & Pet Shop Management
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-6" style={{ color: INK }}>
            Veterinary clinic and pet shop management system — all in one place
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: "#54514c" }}>
            Smapey handles everything from pet records and vet appointments to grooming schedules, vaccination tracking, and billing. One system for the whole operation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={REGISTER_URL} className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `4px 4px 0 ${INK}` }}>
              Start free <ChevronRight className="w-4 h-4" />
            </a>
            <a href="/vet-clinic" className="flex items-center gap-2 px-7 py-3.5 rounded-full border-2 bg-white font-bold text-sm transition-transform hover:-translate-y-0.5" style={{ ...display, color: INK, borderColor: INK }}>
              Full feature overview
            </a>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-xs font-semibold" style={{ color: "#54514c" }}>
            {["Free to start", "No credit card needed", "Set up in 5 minutes"].map(t => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-20" style={{ background: "#fff", borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto px-6">
          <Animate className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>What&apos;s Included</p>
            <h2 className="text-3xl font-extrabold" style={{ color: INK }}>Built for vet clinics and pet care businesses</h2>
            <p className="mt-3 max-w-xl mx-auto" style={{ color: "#54514c" }}>Every module connects — from the first appointment to the final bill.</p>
          </Animate>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CAPABILITIES.map(({ icon: Icon, title, desc }, i) => {
              const c = accentFor(i)
              return (
                <Animate key={title} delay={i * 70}>
                  <div className="rounded-[20px] p-5 border-2 hover:-translate-y-1 transition-transform h-full" style={{ background: "#fff", borderColor: INK, boxShadow: `5px 5px 0 ${c}` }}>
                    <div className="w-10 h-10 rounded-[12px] border-2 flex items-center justify-center mb-3" style={{ background: c, borderColor: INK }}><Icon className="w-5 h-5" style={{ color: onAccent(c) }} /></div>
                    <h3 className="font-extrabold mb-1.5 text-sm" style={{ color: INK }}>{title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "#54514c" }}>{desc}</p>
                  </div>
                </Animate>
              )
            })}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-20" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-3xl mx-auto px-6">
          <Animate className="text-center mb-12">
            <h2 className="text-3xl font-extrabold" style={{ color: INK }}>Why Smapey vs. paper or spreadsheets</h2>
            <p className="mt-3" style={{ color: "#54514c" }}>A quick comparison of what each option actually handles.</p>
          </Animate>
          <Animate>
            <div className="overflow-x-auto rounded-[18px] border-2" style={{ borderColor: INK, boxShadow: `6px 6px 0 ${BLUE}` }}>
              <table className="w-full text-sm bg-white">
                <thead style={{ background: INK }}>
                  <tr>
                    <th className="text-left px-5 py-4 font-bold text-white">Capability</th>
                    <th className="px-5 py-4 font-bold text-center" style={{ color: AMBER }}>Smapey</th>
                    <th className="px-5 py-4 font-bold text-center text-white/60">Paper</th>
                    <th className="px-5 py-4 font-bold text-center text-white/60">Spreadsheet</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map(({ area, ours, paper, spreadsheet }, i) => (
                    <tr key={area} style={{ background: i % 2 ? CREAM : "#fff", borderTop: "1px solid rgba(22,22,22,.08)" }}>
                      <td className="px-5 py-3.5" style={{ color: INK }}>{area}</td>
                      <td className="px-5 py-3.5 text-center">{ours ? <span className="font-bold text-base" style={{ color: "#0d9f6e" }}>✓</span> : <span style={{ color: "#cfcabf" }}>—</span>}</td>
                      <td className="px-5 py-3.5 text-center">{paper ? <span style={{ color: "#9a948b" }}>✓</span> : <span style={{ color: "#cfcabf" }}>—</span>}</td>
                      <td className="px-5 py-3.5 text-center">{spreadsheet ? <span style={{ color: "#9a948b" }}>✓</span> : <span style={{ color: "#cfcabf" }}>—</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Animate>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: "#fff", borderTop: `2px solid ${INK}` }}>
        <Animate className="max-w-3xl mx-auto">
          <div className="rounded-[28px] border-2 p-10 text-center" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
            <h2 className="text-3xl font-extrabold mb-4" style={{ color: INK }}>One system for your entire pet care operation</h2>
            <p className="mb-8 font-medium" style={{ color: "#5c4a28" }}>Free to start. Set up in minutes. No contract required.</p>
            <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>
              Get started for free <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </Animate>
      </section>

      <InternalLinks cluster="vet-clinic" currentPath="/vet-clinic/veterinary-clinic-and-pet-shop-management-system" />

      <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2"><img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" /><span className="text-sm font-extrabold" style={{ color: INK }}>Vet Clinic Manager by Smapey</span></div>
          <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
