"use client"

import { useState, useEffect, useRef } from "react"
import { CheckCircle2,
  GraduationCap, BookOpen, Users, CalendarCheck, ClipboardList, CreditCard,
  NotebookPen, BarChart3, Lightbulb, ArrowRight, ChevronRight, Menu, X, ArrowLeft,
} from "lucide-react"
import InternalLinks from "@/components/InternalLinks"

// ── Layered Pop design tokens ──
const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }
const REGISTER_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register?product=SCHOOL_DESK&plan=FREE`
const LOGIN_URL = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`

function useFont() {
  useEffect(() => {
    const id = "smapey-pop-fonts"
    if (!document.getElementById(id)) {
      const l = document.createElement("link")
      l.id = id; l.rel = "stylesheet"
      l.href = "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap"
      document.head.appendChild(l)
    }
  }, [])
}

function useInView() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } }, { threshold: 0.15 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, inView }
}

function Animate({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className={className} style={{ transitionProperty: "opacity, transform", transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDelay: `${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)" }}>
      {children}
    </div>
  )
}

//////////////////////////////////////////////////////
// NAVBAR
//////////////////////////////////////////////////////
function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { href: "/school-desk#features", label: "Features" },
    { href: "/school-desk#how-it-works", label: "How it Works" },
    { href: "/school-desk#pricing", label: "Pricing" },
    { href: "/school-desk#faq", label: "FAQ" },
    { href: "/school-desk/guide", label: "Guide" },
  ]
  return (
    <nav className="fixed top-0 inset-x-0 z-50" style={{ background: CREAM, borderBottom: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/school-desk" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Smapey SchoolDesk" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold tracking-tight" style={{ color: INK }}>Smapey SchoolDesk</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (<a key={l.label} href={l.href} className="text-sm font-semibold hover:opacity-60 transition-opacity" style={{ color: INK }}>{l.label}</a>))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href={LOGIN_URL} className="text-sm font-semibold hover:opacity-60 transition-opacity px-2 py-2" style={{ color: INK }}>Sign in</a>
          <a href={REGISTER_URL} className="text-sm font-bold px-5 py-2.5 rounded-full border-2 transition-transform hover:-translate-y-0.5" style={{ ...display, background: AMBER, color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>Get started</a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: INK }}>{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
      </div>
      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4" style={{ background: CREAM, borderTop: `2px solid ${INK}` }}>
          {links.map((l) => (<a key={l.label} href={l.href} className="text-sm font-semibold" style={{ color: INK }}>{l.label}</a>))}
          <a href={REGISTER_URL} className="text-sm font-bold px-4 py-2.5 rounded-full border-2 text-center" style={{ ...display, background: AMBER, color: INK, borderColor: INK }}>Get started</a>
        </div>
      )}
    </nav>
  )
}

//////////////////////////////////////////////////////
// ARTICLE PRIMITIVES (Layered Pop)
//////////////////////////////////////////////////////
function Callout({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="my-6 rounded-[16px] border-2 p-5" style={{ background: "#fff7e8", borderColor: INK }}>
      <div className="flex items-start gap-3">
        <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#b06c00" }} />
        <div>
          {title && <p className="font-extrabold mb-1" style={{ color: INK }}>{title}</p>}
          <div className="text-sm leading-relaxed" style={{ color: "#5c4a28" }}>{children}</div>
        </div>
      </div>
    </div>
  )
}

function Example({ children, title = "Quick example" }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="my-6 rounded-[16px] border-2 p-5" style={{ background: "#fff", borderColor: INK, boxShadow: `5px 5px 0 ${BLUE}` }}>
      <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: BLUE }}>{title}</p>
      <div className="text-sm leading-relaxed space-y-2" style={{ color: "#54514c" }}>{children}</div>
    </div>
  )
}

function Steps({ items }: { items: { t: string; d: string }[] }) {
  return (
    <ol className="my-6 space-y-4">
      {items.map((s, i) => (
        <li key={i} className="flex gap-4">
          <span className="shrink-0 w-8 h-8 rounded-full border-2 text-sm font-bold flex items-center justify-center" style={{ background: BLUE, color: "#fff", borderColor: INK }}>{i + 1}</span>
          <div className="pt-0.5">
            <p className="font-bold" style={{ color: INK }}>{s.t}</p>
            <p className="text-sm leading-relaxed mt-0.5" style={{ color: "#54514c" }}>{s.d}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function H2({ id, icon: Icon, accent = BLUE, children }: { id: string; icon: any; accent?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 flex items-center gap-3 text-2xl sm:text-3xl font-extrabold tracking-tight mt-16 mb-4" style={{ color: INK }}>
      <span className="w-10 h-10 rounded-[12px] border-2 flex items-center justify-center shrink-0" style={{ background: accent, borderColor: INK }}>
        <Icon className="w-5 h-5" style={{ color: accent === AMBER ? INK : "#fff" }} />
      </span>
      {children}
    </h2>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="leading-relaxed my-4" style={{ color: "#54514c" }}>{children}</p>
}

//////////////////////////////////////////////////////
// TABLE OF CONTENTS
//////////////////////////////////////////////////////
const TOC = [
  { id: "big-idea", label: "The big idea (read this first)" },
  { id: "programs", label: "1. Set up your programs" },
  { id: "teachers", label: "2. Add your teachers" },
  { id: "students", label: "3. Register students" },
  { id: "enroll", label: "4. Enroll & set tuition" },
  { id: "sessions", label: "5. Schedule sessions" },
  { id: "attendance", label: "6. Take attendance" },
  { id: "payments", label: "7. Record tuition payments" },
  { id: "progress", label: "8. Progress notes" },
  { id: "dashboard", label: "9. The dashboard" },
  { id: "glossary", label: "Glossary" },
]

//////////////////////////////////////////////////////
// CTA
//////////////////////////////////////////////////////
function CTA() {
  return (
    <section className="py-16 px-6" style={{ background: "#fff", fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto">
        <div className="rounded-[28px] border-2 p-10 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: AMBER, borderColor: INK, boxShadow: `10px 10px 0 ${INK}` }}>
          <div>
            <h3 className="text-2xl font-extrabold mb-2" style={{ color: INK }}>Ready to run your tutorial center smarter?</h3>
            <p className="text-sm font-medium" style={{ color: "#5c4a28" }}>Join tutors and center owners who manage students, tuition, and sessions on Smapey — no spreadsheets, no notebooks.</p>
          </div>
          <a href={REGISTER_URL} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 transition-transform hover:-translate-y-0.5 shrink-0" style={{ ...display, background: INK, color: "#fff", borderColor: INK }}>
            Get started for free <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

//////////////////////////////////////////////////////
// FOOTER
//////////////////////////////////////////////////////
function Footer() {
  return (
    <footer className="px-6 py-8" style={{ background: CREAM, borderTop: `2px solid ${INK}`, fontFamily: display.fontFamily }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Smapey SchoolDesk" className="w-6 h-6 rounded-md object-cover" />
          <span className="text-sm font-extrabold" style={{ color: INK }}>SchoolDesk by Smapey</span>
        </div>
        <p className="text-xs" style={{ color: "#9a948b" }}>© {new Date().getFullYear()} Smapey. All rights reserved.</p>
      </div>
    </footer>
  )
}

//////////////////////////////////////////////////////
// PAGE
//////////////////////////////////////////////////////
export default function GuideContent() {
  useFont()
  return (
    <main style={{ fontFamily: display.fontFamily }}>
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden pt-16" style={{ background: CREAM }}>
        <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
          <div className="absolute rounded-[22px] border-2" style={{ top: "28%", right: "-70px", width: 280, height: 78, background: BLUE, borderColor: INK, transform: "rotate(8deg)", boxShadow: "5px 5px 0 rgba(22,22,22,.12)" }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 pt-12 pb-14 text-center">
          <a href="/school-desk" className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors mb-8 hover:opacity-60" style={{ color: "#54514c" }}>
            <ArrowLeft className="w-3.5 h-3.5" /> Back to SchoolDesk
          </a>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 text-xs font-bold mb-5" style={{ color: INK, borderColor: INK, boxShadow: `3px 3px 0 ${BLUE}` }}>
            <BookOpen className="w-3 h-3" /> User Guide
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-6" style={{ color: INK }}>
            How to run your tutorial center with Smapey SchoolDesk
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#54514c" }}>
            Whether you run a one-room review center or tutor from home, this guide walks you through the whole system in
            plain language — programs, students, sessions, attendance, tuition, and progress notes. Follow it top to bottom.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold mt-8" style={{ color: "#54514c" }}>
            {["5-minute setup", "No training required", "Free plan available"].map((t) => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-6 py-16">

        {/* TOC */}
        <div className="rounded-[20px] border-2 p-6 mb-4" style={{ background: "#fff", borderColor: INK, boxShadow: `6px 6px 0 ${AMBER}` }}>
          <p className="flex items-center gap-2 text-sm font-extrabold mb-4" style={{ color: INK }}>
            <BookOpen className="w-4 h-4" style={{ color: BLUE }} /> What&apos;s in this guide
          </p>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {TOC.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="text-sm transition-colors flex items-center gap-1.5 hover:opacity-60" style={{ color: "#54514c" }}>
                  <ArrowRight className="w-3 h-3" style={{ color: BLUE }} /> {t.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* THE BIG IDEA */}
        <Animate>
          <H2 id="big-idea" icon={GraduationCap}>The big idea (read this first)</H2>
          <P>
            Smapey SchoolDesk is built around <strong>three things that connect to each other</strong>. Once these click,
            the whole app makes sense:
          </P>
          <div className="grid sm:grid-cols-3 gap-4 my-6">
            {[
              { icon: BookOpen, c: BLUE, n: "1. Programs", d: <>The courses you offer — a subject, grade level, or review track. Each has a tuition fee.</> },
              { icon: Users, c: AMBER, n: "2. Students", d: <>The people you teach. A student becomes an <strong>enrollment</strong> when joined to a program.</> },
              { icon: CalendarCheck, c: BLUE, n: "3. Sessions", d: <>The actual classes you hold per program — where you take attendance and write progress notes.</> },
            ].map((card, i) => (
              <div key={i} className="rounded-[18px] border-2 p-5" style={{ background: "#fff", borderColor: INK, boxShadow: `5px 5px 0 ${card.c}` }}>
                <div className="w-10 h-10 rounded-[12px] border-2 flex items-center justify-center mb-3" style={{ background: card.c, borderColor: INK }}>
                  <card.icon className="w-5 h-5" style={{ color: card.c === AMBER ? INK : "#fff" }} />
                </div>
                <p className="font-extrabold mb-1" style={{ color: INK }}>{card.n}</p>
                <p className="text-sm leading-relaxed" style={{ color: "#54514c" }}>{card.d}</p>
              </div>
            ))}
          </div>
          <Callout title="The simplest way to think about it">
            A <strong>program</strong> is the course (Grade 5 Math). An <strong>enrollment</strong> is one student joining
            that course — and it carries the tuition. A <strong>session</strong> is one class meeting where you mark who
            showed up. Set up programs once, then enroll students and run sessions all term.
          </Callout>
        </Animate>

        {/* PROGRAMS */}
        <Animate>
          <H2 id="programs" icon={BookOpen} accent={AMBER}>1. Set up your programs</H2>
          <P>Do this first. A program is anything you charge tuition for.</P>
          <Steps items={[
            { t: "Go to SchoolDesk → Programs → New Program", d: "Give it a clear name like 'Grade 3 Math Tutoring' or 'UPCAT Review Batch A'." },
            { t: "Set the tuition fee", d: "Enter the amount you charge for this program — e.g. ₱1,500." },
            { t: "Choose the billing type", d: "Monthly (recurring tuition), Per Session (pay per class), or Fixed (one-time fee for the whole course)." },
          ]} />
          <Callout title="Make one program per offering">
            If you teach Math and English to different grades, create a program for each. This keeps tuition, sessions, and
            attendance cleanly separated so your reports actually mean something.
          </Callout>
        </Animate>

        {/* TEACHERS */}
        <Animate>
          <H2 id="teachers" icon={NotebookPen}>2. Add your teachers</H2>
          <P>If you teach solo, you can skip this — but most centers have more than one tutor.</P>
          <Steps items={[
            { t: "Go to Teachers → Add Teacher", d: "Enter the teacher's name, phone, email, and subject or specialization." },
            { t: "Assign teachers to programs and sessions", d: "When you enroll a student or schedule a session, you can pick which teacher handles it." },
          ]} />
        </Animate>

        {/* STUDENTS */}
        <Animate>
          <H2 id="students" icon={Users} accent={AMBER}>3. Register students</H2>
          <P>Add every student once. Their profile follows them across every program they join.</P>
          <Steps items={[
            { t: "Go to Students → Add Student", d: "Only the full name is required. Add grade level, phone, and the guardian's name and number so parents are easy to reach." },
            { t: "Add notes if useful", d: "Anything you want to remember — learning style, schedule preferences, special needs." },
          ]} />
          <Callout title="Guardian info pays off later">
            Filling in the guardian's name and number now means that when tuition is due or you need to reach a parent, the
            contact is right there in the student's profile.
          </Callout>
        </Animate>

        {/* ENROLL */}
        <Animate>
          <H2 id="enroll" icon={CreditCard}>4. Enroll a student &amp; set tuition</H2>
          <P>An enrollment is what connects a student to a program — and it&apos;s where tuition lives.</P>
          <Steps items={[
            { t: "Go to Enrollments → Enroll Student", d: "Pick the student and the program. The tuition fee auto-fills from the program, but you can override it for scholarships or discounts." },
            { t: "Assign a teacher (optional)", d: "Choose who'll handle this student. Set a start date." },
            { t: "Track the balance", d: "From now on, the enrollment shows the tuition fee, total paid, and the outstanding balance — updated every time you record a payment." },
          ]} />
          <Example title="Example: Maria">
            <p>• Maria enrolls in &apos;Grade 5 Math&apos; → tuition ₱1,500, paid ₱0, balance <strong>₱1,500</strong>.</p>
            <p>• Her mom pays ₱1,000 → paid ₱1,000, balance <strong>₱500</strong>.</p>
            <p>• The dashboard lists Maria under &quot;Unpaid Balances&quot; until the ₱500 is settled.</p>
          </Example>
        </Animate>

        {/* SESSIONS */}
        <Animate>
          <H2 id="sessions" icon={CalendarCheck} accent={AMBER}>5. Schedule sessions</H2>
          <P>A session is one class meeting for a program.</P>
          <Steps items={[
            { t: "Go to Sessions → Schedule Session", d: "Pick the program, assign a teacher, set the date, time, and duration. Add a title like 'Chapter 3 Review' if you like." },
            { t: "Manage its status", d: "Sessions start as Scheduled. After class, mark them Done — or Cancelled if it didn't happen." },
          ]} />
          <Callout title="Upcoming sessions on the dashboard">
            Every scheduled session shows in the dashboard&apos;s &quot;Upcoming Sessions&quot; list so you and your teachers always know
            what&apos;s next.
          </Callout>
        </Animate>

        {/* ATTENDANCE */}
        <Animate>
          <H2 id="attendance" icon={ClipboardList}>6. Take attendance</H2>
          <P>Attendance is recorded per session, against the students enrolled in that program.</P>
          <Steps items={[
            { t: "Open the session and click Attendance", d: "Smapey lists every active student enrolled in that program." },
            { t: "Mark each student", d: "Present, Absent, Late, or Excused. Defaults to Present so you only tap the exceptions." },
            { t: "Save", d: "Attendance is stored per student. You can review a student's full attendance history anytime from their profile." },
          ]} />
        </Animate>

        {/* PAYMENTS */}
        <Animate>
          <H2 id="payments" icon={CreditCard} accent={AMBER}>7. Record tuition payments</H2>
          <P>Every time a parent or student pays, log it against their enrollment.</P>
          <Steps items={[
            { t: "Go to Enrollments and find the student", d: "Click Pay on any enrollment that still has a balance." },
            { t: "Enter the amount and method", d: "Cash, GCash, bank transfer, or other. Add a note if you want." },
            { t: "Record it", d: "The total paid goes up and the balance goes down instantly. Today's and this month's collections update on the dashboard." },
          ]} />
          <Callout title="No more 'who paid?' guessing">
            Because every payment is tied to an enrollment, you always know exactly who&apos;s fully paid, who still owes, and
            how much you&apos;ve collected this month.
          </Callout>
        </Animate>

        {/* PROGRESS */}
        <Animate>
          <H2 id="progress" icon={NotebookPen}>8. Progress notes</H2>
          <P>After a session, jot a quick note on how each student is doing.</P>
          <Steps items={[
            { t: "Open the student's profile → Notes", d: "Write what was covered and how they performed. Add a 1–5 rating if you grade progress." },
            { t: "Build a history", d: "Notes stack up over time, giving you (and the parents) a clear record of the student's improvement." },
          ]} />
        </Animate>

        {/* DASHBOARD */}
        <Animate>
          <H2 id="dashboard" icon={BarChart3} accent={AMBER}>9. The dashboard</H2>
          <P>One screen that answers &quot;how&apos;s the center doing today?&quot;</P>
          <Steps items={[
            { t: "Collections", d: "Today's and this month's tuition collected, at a glance." },
            { t: "Students & enrollments", d: "Total and active students, plus active enrollments." },
            { t: "Sessions", d: "How many sessions today and this month, plus your upcoming schedule." },
            { t: "Unpaid balances", d: "A live list of enrollments that still owe tuition — so nobody slips through the cracks." },
          ]} />
        </Animate>

        {/* GLOSSARY */}
        <Animate>
          <H2 id="glossary" icon={BookOpen}>Glossary</H2>
          <div className="my-6 space-y-3">
            {[
              ["Program", "A course you offer and charge for — a subject, grade level, or review track. Has a tuition fee and billing type."],
              ["Student", "A person you teach. Their profile holds contact info, guardian details, attendance, and progress notes."],
              ["Enrollment", "A student joined to a program. Carries the tuition fee, total paid, and outstanding balance."],
              ["Session", "One class meeting for a program — where you take attendance and add progress notes."],
              ["Attendance", "The per-session record of who was present, absent, late, or excused."],
              ["Progress note", "A written note (with optional 1–5 rating) about a student's performance."],
              ["Billing type", "How a program charges: Monthly, Per Session, or Fixed (one-time)."],
            ].map(([term, def]) => (
              <div key={term} className="rounded-[14px] border-2 p-4" style={{ background: "#fff", borderColor: INK }}>
                <p className="font-extrabold text-sm" style={{ color: INK }}>{term}</p>
                <p className="text-sm leading-relaxed mt-0.5" style={{ color: "#54514c" }}>{def}</p>
              </div>
            ))}
          </div>
        </Animate>

      </article>

      <CTA />
      <InternalLinks cluster="school-desk" currentPath="/school-desk/guide" />
      <Footer />
    </main>
  )
}
