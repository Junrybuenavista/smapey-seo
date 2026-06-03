"use client"

import {
  GraduationCap, BookOpen, Users, CalendarCheck, ClipboardList, CreditCard,
  NotebookPen, BarChart3, Lightbulb, ArrowRight,
} from "lucide-react"
import InternalLinks from "@/components/InternalLinks"
import { Navbar, Footer, CTA, Animate, HeroShell, HeroBadge } from "../_shared"

//////////////////////////////////////////////////////
// SMALL BUILDING BLOCKS
//////////////////////////////////////////////////////
function Callout({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="my-6 rounded-2xl border border-indigo-200 bg-indigo-50/70 p-5">
      <div className="flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          {title && <p className="font-semibold text-indigo-900 mb-1">{title}</p>}
          <div className="text-sm text-indigo-900/80 leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}

function Example({ children, title = "Quick example" }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{title}</p>
      <div className="text-sm text-slate-600 leading-relaxed space-y-2">{children}</div>
    </div>
  )
}

function Steps({ items }: { items: { t: string; d: string }[] }) {
  return (
    <ol className="my-6 space-y-4">
      {items.map((s, i) => (
        <li key={i} className="flex gap-4">
          <span className="shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
          <div className="pt-0.5">
            <p className="font-semibold text-slate-800">{s.t}</p>
            <p className="text-sm text-slate-500 leading-relaxed mt-0.5">{s.d}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function H2({ id, icon: Icon, children }: { id: string; icon: any; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 flex items-center gap-3 text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mt-16 mb-4">
      <span className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-indigo-600" />
      </span>
      {children}
    </h2>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-slate-600 leading-relaxed my-4">{children}</p>
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

export default function GuideContent() {
  return (
    <main className="bg-white">
      <Navbar />

      <HeroShell>
        <div className="max-w-3xl mx-auto text-center">
          <HeroBadge>Step-by-step guide</HeroBadge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
            How to run your tutorial center with Smapey SchoolDesk
          </h1>
          <p className="text-lg text-white/50 leading-relaxed">
            Whether you run a one-room review center or tutor from home, this guide walks you through the whole system in
            plain language — programs, students, sessions, attendance, tuition, and progress notes. Follow it top to bottom.
          </p>
        </div>
      </HeroShell>

      <article className="max-w-3xl mx-auto px-6 py-16">

        {/* TOC */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 mb-4">
          <p className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-4">
            <BookOpen className="w-4 h-4 text-indigo-600" /> What's in this guide
          </p>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {TOC.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="text-sm text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-indigo-400" /> {t.label}
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
            <div className="rounded-2xl border border-slate-200 p-5 bg-white shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center mb-3">
                <BookOpen className="w-5 h-5 text-indigo-600" />
              </div>
              <p className="font-bold text-slate-800 mb-1">1. Programs</p>
              <p className="text-sm text-slate-500 leading-relaxed">
                The courses you offer — a subject, grade level, or review track. Each has a tuition fee.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-5 bg-white shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-violet-600" />
              </div>
              <p className="font-bold text-slate-800 mb-1">2. Students</p>
              <p className="text-sm text-slate-500 leading-relaxed">
                The people you teach. A student becomes an <strong>enrollment</strong> when joined to a program.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-5 bg-white shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mb-3">
                <CalendarCheck className="w-5 h-5 text-purple-600" />
              </div>
              <p className="font-bold text-slate-800 mb-1">3. Sessions</p>
              <p className="text-sm text-slate-500 leading-relaxed">
                The actual classes you hold per program — where you take attendance and write progress notes.
              </p>
            </div>
          </div>
          <Callout title="The simplest way to think about it">
            A <strong>program</strong> is the course (Grade 5 Math). An <strong>enrollment</strong> is one student joining
            that course — and it carries the tuition. A <strong>session</strong> is one class meeting where you mark who
            showed up. Set up programs once, then enroll students and run sessions all term.
          </Callout>
        </Animate>

        {/* PROGRAMS */}
        <Animate>
          <H2 id="programs" icon={BookOpen}>1. Set up your programs</H2>
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
          <H2 id="students" icon={Users}>3. Register students</H2>
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
          <P>An enrollment is what connects a student to a program — and it's where tuition lives.</P>
          <Steps items={[
            { t: "Go to Enrollments → Enroll Student", d: "Pick the student and the program. The tuition fee auto-fills from the program, but you can override it for scholarships or discounts." },
            { t: "Assign a teacher (optional)", d: "Choose who'll handle this student. Set a start date." },
            { t: "Track the balance", d: "From now on, the enrollment shows the tuition fee, total paid, and the outstanding balance — updated every time you record a payment." },
          ]} />
          <Example title="Example: Maria">
            <p>• Maria enrolls in 'Grade 5 Math' → tuition ₱1,500, paid ₱0, balance <strong>₱1,500</strong>.</p>
            <p>• Her mom pays ₱1,000 → paid ₱1,000, balance <strong>₱500</strong>.</p>
            <p>• The dashboard lists Maria under "Unpaid Balances" until the ₱500 is settled.</p>
          </Example>
        </Animate>

        {/* SESSIONS */}
        <Animate>
          <H2 id="sessions" icon={CalendarCheck}>5. Schedule sessions</H2>
          <P>A session is one class meeting for a program.</P>
          <Steps items={[
            { t: "Go to Sessions → Schedule Session", d: "Pick the program, assign a teacher, set the date, time, and duration. Add a title like 'Chapter 3 Review' if you like." },
            { t: "Manage its status", d: "Sessions start as Scheduled. After class, mark them Done — or Cancelled if it didn't happen." },
          ]} />
          <Callout title="Upcoming sessions on the dashboard">
            Every scheduled session shows in the dashboard's "Upcoming Sessions" list so you and your teachers always know
            what's next.
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
          <H2 id="payments" icon={CreditCard}>7. Record tuition payments</H2>
          <P>Every time a parent or student pays, log it against their enrollment.</P>
          <Steps items={[
            { t: "Go to Enrollments and find the student", d: "Click Pay on any enrollment that still has a balance." },
            { t: "Enter the amount and method", d: "Cash, GCash, bank transfer, or other. Add a note if you want." },
            { t: "Record it", d: "The total paid goes up and the balance goes down instantly. Today's and this month's collections update on the dashboard." },
          ]} />
          <Callout title="No more 'who paid?' guessing">
            Because every payment is tied to an enrollment, you always know exactly who's fully paid, who still owes, and
            how much you've collected this month.
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
          <H2 id="dashboard" icon={BarChart3}>9. The dashboard</H2>
          <P>One screen that answers "how's the center doing today?"</P>
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
              <div key={term} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="font-bold text-slate-800 text-sm">{term}</p>
                <p className="text-sm text-slate-500 leading-relaxed mt-0.5">{def}</p>
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
