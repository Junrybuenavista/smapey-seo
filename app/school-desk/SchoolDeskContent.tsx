"use client"

import { useState } from "react"
import BookDemoForm from "@/components/BookDemoForm"
import {
  Users, BookOpen, CalendarCheck, CreditCard, ClipboardList,
  NotebookPen, BarChart3, CheckCircle2, ChevronRight,
} from "lucide-react"
import InternalLinks from "@/components/InternalLinks"
import {
  Navbar, Footer, Pricing, CTA, Animate, Eyebrow,
  HeroShell, HeroBadge, TrustRow, REGISTER_URL,
} from "./_shared"

const FEATURES = [
  {
    icon: Users,
    title: "Student Enrollment & Profiles",
    desc: "Register every student with their name, grade level, guardian contact, and notes. See their active program, tuition balance, and full attendance history at a glance.",
    color: "from-indigo-600 to-violet-500",
    shadow: "shadow-indigo-500/20",
  },
  {
    icon: BookOpen,
    title: "Programs & Tuition Setup",
    desc: "Create programs for each subject or grade level — Grade 3 Math, UPCAT Review, English for Kids — each with its own tuition fee and billing type (monthly, per session, or fixed).",
    color: "from-violet-600 to-purple-500",
    shadow: "shadow-violet-500/20",
  },
  {
    icon: CalendarCheck,
    title: "Session Scheduling",
    desc: "Schedule class sessions per program, assign a teacher, and set the date and duration. Mark sessions as done or cancelled and track how many sessions each program has held.",
    color: "from-indigo-500 to-blue-500",
    shadow: "shadow-indigo-500/20",
  },
  {
    icon: ClipboardList,
    title: "Attendance Tracking",
    desc: "Take attendance per session — mark each enrolled student as present, absent, late, or excused. Attendance history is stored per student so you always have a record.",
    color: "from-purple-600 to-indigo-500",
    shadow: "shadow-purple-500/20",
  },
  {
    icon: CreditCard,
    title: "Tuition Fee Monitoring",
    desc: "Record tuition payments per enrollment — cash, GCash, bank transfer. The dashboard shows who has a balance, how much is outstanding, and this month's total collections.",
    color: "from-indigo-600 to-cyan-500",
    shadow: "shadow-indigo-500/20",
  },
  {
    icon: NotebookPen,
    title: "Teacher Management",
    desc: "Add your teachers or tutors, assign them to programs and sessions, and give each one a subject or specialization. Admins and members see only what they need.",
    color: "from-violet-500 to-indigo-400",
    shadow: "shadow-violet-500/20",
  },
  {
    icon: BookOpen,
    title: "Progress Notes",
    desc: "Write a quick progress note per student after each session — what was covered, how they performed, a 1–5 rating. Parents love the transparency; teachers love the record.",
    color: "from-purple-600 to-violet-500",
    shadow: "shadow-purple-500/20",
  },
  {
    icon: BarChart3,
    title: "Dashboard & Collections",
    desc: "See today's collections, monthly totals, active enrollments, upcoming sessions, and unpaid balances — all on one clean screen. No spreadsheet needed.",
    color: "from-indigo-500 to-violet-500",
    shadow: "shadow-indigo-500/20",
  },
]

const STEPS = [
  {
    step: "01",
    title: "Set up your programs",
    desc: "Create a program for each subject or course you offer — set the name, tuition fee, and billing type. Add your teachers and their subjects.",
  },
  {
    step: "02",
    title: "Enroll students",
    desc: "Register each student, assign them to a program and a teacher. Their tuition fee is tracked automatically — see what's paid and what's still outstanding at any time.",
  },
  {
    step: "03",
    title: "Run sessions & collect",
    desc: "Schedule sessions, mark attendance, record tuition payments, and add progress notes. Your dashboard shows the full picture every day.",
  },
]

const FAQS = [
  {
    q: "Who is Smapey SchoolDesk for?",
    a: "Tutorial centers, review centers, home-based tutors, and private learning centers in the Philippines. Whether you have 5 students or 500, SchoolDesk replaces your notebook and spreadsheet with one clean system.",
  },
  {
    q: "Can I track multiple subjects or programs?",
    a: "Yes. You can create as many programs as you need — one per subject, grade level, or course. Each program has its own tuition fee, teacher assignment, and session schedule.",
  },
  {
    q: "How does tuition tracking work?",
    a: "Each enrollment has a tuition fee and a running total of payments recorded. You can see the balance at any time — who's fully paid, who still owes, and how much you've collected this month.",
  },
  {
    q: "Can multiple teachers use the system?",
    a: "Yes. You can invite team members and assign them roles. Teachers can view their assigned programs and sessions; the owner sees everything including financials.",
  },
  {
    q: "Is there a printable report card or summary?",
    a: "The progress notes feature lets you add written notes and a rating per student after each session. Printable reports are on the roadmap for a future update.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. The Free plan lets you manage up to 50 students at no cost. Upgrade to Pro when your center grows.",
  },
]

function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <Eyebrow>Features</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Everything your tutorial center needs
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            From the first enrollment to tracking every session, tuition payment, and progress note — Smapey covers the whole operation.
          </p>
        </Animate>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc, color, shadow }, i) => (
            <Animate key={title} delay={i * 70}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
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
          <Eyebrow>How it Works</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Up and running in three steps
          </h2>
        </Animate>
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map(({ step, title, desc }, i) => (
            <Animate key={step} delay={i * 120}>
              <div className="relative text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-50 border-2 border-indigo-100 text-indigo-600 font-extrabold text-lg mb-5 group-hover:bg-gradient-to-tr group-hover:from-indigo-500 group-hover:to-violet-500 group-hover:text-white group-hover:border-transparent transition-all duration-300">
                  {step}
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </Animate>
          ))}
        </div>
        <Animate delay={300}>
          <div className="mt-12 text-center">
            <a href="/school-desk/guide" className="inline-flex items-center gap-2 text-indigo-600 font-semibold text-sm hover:gap-3 transition-all">
              Read the full step-by-step guide <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </Animate>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-2xl mx-auto px-6">
        <Animate className="text-center mb-16">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Common questions</h2>
        </Animate>
        <div className="flex flex-col gap-3">
          {FAQS.map(({ q, a }, i) => (
            <Animate key={i} delay={i * 50}>
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors">
                  {q}
                  <ChevronRight className={`w-4 h-4 text-indigo-400 transition-transform duration-200 shrink-0 ${open === i ? "rotate-90" : ""}`} />
                </button>
                {open === i && <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3">{a}</div>}
              </div>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  )
}

function Hero() {
  return (
    <HeroShell>
      <div className="text-center">
        <HeroBadge>Built for tutorial centers &amp; tutors in the Philippines</HeroBadge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
          Manage your tutorial center{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400">
            without the spreadsheet
          </span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          Smapey SchoolDesk tracks student enrollments, sessions, tuition fees, attendance, and progress notes —
          so you can focus on teaching, not paperwork.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={REGISTER_URL} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30">
            Start for free <ChevronRight className="w-4 h-4" />
          </a>
          <a href="#features" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium text-sm transition-all border border-white/10">
            See features
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
        <TrustRow />
      </div>
    </HeroShell>
  )
}

export default function SchoolDeskContent() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <BookDemoForm product="SCHOOL_DESK" />
      <CTA />
      <InternalLinks cluster="school-desk" currentPath="/school-desk" />
      <Footer />
    </main>
  )
}
