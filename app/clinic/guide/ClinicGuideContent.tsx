"use client"

import { useState, useEffect, useRef } from "react"
import InternalLinks from "@/components/InternalLinks"
import {
  BookOpen, Users, CalendarDays, CheckCircle2, ChevronRight,
  Menu, X, Stethoscope, ListOrdered, BarChart3,
  Clock, HeartPulse, UserCheck, ClipboardList,
} from "lucide-react"

const SECTIONS = [
  {
    id: "setup",
    icon: Stethoscope,
    title: "1. Set Up Your Clinic",
    steps: [
      { title: "Create your Smapey account", desc: "Sign up at smapey.com and select Clinic Manager as your product. Your clinic account is created immediately — no credit card required on the free plan." },
      { title: "Add doctors", desc: "Go to the Doctors page. Click Add Doctor and fill in the doctor's name, specialty (e.g. General Practitioner, Dentist), phone, and email. Save to add them to your clinic roster." },
      { title: "Set doctor schedules", desc: "Click on a doctor's name to expand their schedule. Use the Add Slot form to define which days and hours they're available — e.g. Monday 8:00–17:00. Repeat for each day they work." },
      { title: "Invite your team", desc: "Go to Settings → Team and invite receptionists or nurses. They'll receive an email and can log in with their own account. Assign them Admin or Member access based on their role." },
    ],
  },
  {
    id: "patients",
    icon: Users,
    title: "2. Register Patients",
    steps: [
      { title: "Open the Patients page", desc: "Navigate to Clinic → Patients from the sidebar." },
      { title: "Click Register Patient", desc: "Enter the patient's first name, last name, phone number, email (optional), date of birth (optional), and any relevant notes such as allergies or chronic conditions." },
      { title: "Save the profile", desc: "The patient is now saved in your clinic's records. You can search for them anytime by name or phone number." },
      { title: "Edit patient records", desc: "Click the Edit button on any patient row to update their contact info or clinical notes at any time." },
    ],
  },
  {
    id: "appointments",
    icon: CalendarDays,
    title: "3. Book Appointments",
    steps: [
      { title: "Open the Appointments page", desc: "Navigate to Clinic → Appointments from the sidebar." },
      { title: "Click Book Appointment", desc: "Select the patient (from your registered patient list), the doctor, the date, and the start time." },
      { title: "Add a chief complaint", desc: "Optionally enter the reason for the visit — e.g. Annual check-up, Toothache, Follow-up. This helps the doctor prepare before the consultation." },
      { title: "Save the appointment", desc: "The appointment is created with a Pending status and a queue number. You can filter appointments by doctor, date, or status at any time." },
    ],
  },
  {
    id: "queue",
    icon: ListOrdered,
    title: "4. Run the Queue Board",
    steps: [
      { title: "Open the Queue page", desc: "Navigate to Clinic → Queue from the sidebar. This shows today's patient queue in a live kanban board." },
      { title: "Confirm & enqueue patients", desc: "Click Confirm on a pending appointment, then Enqueue when the patient arrives. The card moves to the Waiting column." },
      { title: "Start the consultation", desc: "When the doctor is ready, click Call In. The patient's card moves to In Consultation with an active pulse indicator." },
      { title: "Complete or handle exceptions", desc: "When the consultation is done, click Done. If the patient didn't show, click No Show. If cancelled, click Cancel. All actions are logged automatically." },
    ],
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "5. View Analytics",
    steps: [
      { title: "Open the Analytics page", desc: "Navigate to Clinic → Analytics from the sidebar." },
      { title: "Review stat cards", desc: "See totals for: active doctors, registered patients, today's appointments, completed consultations, and monthly totals." },
      { title: "Check the 7-day chart", desc: "The bar chart shows total appointments and completions for each of the last 7 days — helpful for spotting busy vs. slow periods." },
      { title: "Monitor today's schedule", desc: "The bottom section of the analytics page shows today's queued patients with their doctor, time, and current status." },
    ],
  },
]

const TIPS = [
  { icon: Clock, tip: "Set up doctor schedules before booking — this prevents confusion about who's available on which days." },
  { icon: UserCheck, tip: "Register patients once, reuse their profile for every future appointment — no need to re-enter their details." },
  { icon: ClipboardList, tip: "Use the chief complaint field when booking — it helps doctors prepare and makes appointment notes more useful over time." },
  { icon: HeartPulse, tip: "Keep the Queue page open on a clinic tablet or screen throughout the day for real-time visibility." },
]

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
  const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 20); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn) }, [])
  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#050d1a]/90 backdrop-blur-md border-b border-white/5 shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5"><img src="/logo.png" alt="Smapey Clinic" className="w-8 h-8 rounded-lg object-cover" /><span className="text-white font-bold tracking-tight">Smapey Clinic</span></div>
        <div className="hidden md:flex items-center gap-6">
          <a href="/clinic" className="text-sm text-white/60 hover:text-white transition-colors">Home</a>
          <a href="#setup" onClick={(e) => { e.preventDefault(); document.getElementById("setup")?.scrollIntoView({ behavior: "smooth" }) }} className="text-sm text-white/60 hover:text-white transition-colors">Setup</a>
          <a href="#queue" onClick={(e) => { e.preventDefault(); document.getElementById("queue")?.scrollIntoView({ behavior: "smooth" }) }} className="text-sm text-white/60 hover:text-white transition-colors">Queue</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="text-sm text-white/60 hover:text-white px-4 py-2">Sign in</a>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CLINIC&plan=FREE`} className="text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 transition-colors">Try it free</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white/60 hover:text-white">{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && <div className="md:hidden bg-[#050d1a] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
        <a href="/clinic" className="text-sm text-white/60 hover:text-white">Home</a>
        <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CLINIC&plan=FREE`} className="text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 text-white text-center">Try it free</a>
      </div>}
    </nav>
  )
}

export default function ClinicGuideContent() {
  return (
    <main className="bg-white">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-16 overflow-hidden" style={{ background: "#050d1a", backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 28px)", backgroundSize: "28px 28px" }}>
        <div className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 70%)" }} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6">
            <BookOpen className="w-3 h-3" /> User guide
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
            Smapey Clinic Manager{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300">Guide</span>
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto mb-8">
            Everything you need to set up your clinic, manage patients and doctors, book appointments, and run a live queue — step by step.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/30 text-xs">
            {["5-minute setup", "No training required", "Free plan available"].map((t) => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* TABLE OF CONTENTS */}
      <section className="py-10 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" }) }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 text-xs font-medium transition-all">
                <s.icon className="w-3 h-3" />{s.title.replace(/^\d+\.\s/, "")}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDE SECTIONS */}
      {SECTIONS.map((section, si) => (
        <section key={section.id} id={section.id} className={`py-16 ${si % 2 === 0 ? "bg-white" : "bg-slate-50"} border-t border-slate-100`}>
          <div className="max-w-4xl mx-auto px-6">
            <Animate>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <section.icon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">{section.title}</h2>
              </div>
            </Animate>
            <div className="space-y-4">
              {section.steps.map((step, i) => (
                <Animate key={step.title} delay={i * 80}>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</div>
                      {i < section.steps.length - 1 && <div className="w-0.5 flex-1 bg-blue-100 mt-2" />}
                    </div>
                    <div className="pb-4">
                      <h3 className="font-semibold text-slate-800 mb-1 text-sm">{step.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </Animate>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* TIPS */}
      <section className="py-16 bg-blue-50 border-t border-blue-100">
        <div className="max-w-4xl mx-auto px-6">
          <Animate className="mb-8">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">Quick Tips</h2>
          </Animate>
          <div className="grid sm:grid-cols-2 gap-4">
            {TIPS.map(({ icon: Icon, tip }, i) => (
              <Animate key={i} delay={i * 80}>
                <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-blue-100 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{tip}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-slate-100">
        <Animate className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-4">Ready to get started?</h2>
          <p className="text-slate-500 mb-8">Create your free clinic account and have your queue running today.</p>
          <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=CLINIC&plan=FREE`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold transition-all shadow-xl shadow-blue-600/20">
            Start for free <ChevronRight className="w-4 h-4" />
          </a>
        </Animate>
      </section>

      <InternalLinks cluster="clinic" currentPath="/clinic/guide" />

      <footer className="bg-slate-900 border-t border-white/5 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2"><img src="/logo.png" alt="Smapey" className="w-6 h-6 rounded-md object-cover" /><span className="text-white/60 text-sm font-semibold">Smapey Clinic Manager</span></div>
          <p className="text-white/20 text-xs">© {new Date().getFullYear()} Smapey. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
