"use client"

import InternalLinks from "@/components/InternalLinks"
import {
  Navbar, Footer, CTA, Animate, ArticleHero,
  AH2, AP, Bullets, CostTable, FAQList, SoftwarePitch,
} from "../_shared"

const FAQS = [
  {
    q: "What is a tutorial center?",
    a: "A tutorial center is a small learning business that offers after-school tutoring, homework help, and exam review to students — usually in groups or one-on-one. In the Philippines they range from a single room in a subdivision to multi-branch review centers.",
  },
  {
    q: "Is a tutorial center profitable in the Philippines?",
    a: "Yes. Tutorial centers have recurring monthly tuition, low overhead (one room and a few tutors), and strong demand because Filipino parents prioritize education. Profit depends on enrollment volume, tutor costs, and collecting tuition on time.",
  },
  {
    q: "How much does it cost to start a tutorial center?",
    a: "A small home-based center can start for ₱20,000–₱80,000 (tables, whiteboards, materials, permits). A commercial space with multiple rooms costs more for rent and renovation. You can start lean and grow as enrollment increases.",
  },
  {
    q: "What permits does a tutorial center need in the Philippines?",
    a: "Typically DTI business name registration, a Barangay Clearance, a Mayor's/Business Permit, and BIR registration. Larger centers offering formal instruction may need additional LGU or DepEd-related requirements — confirm with your local city hall.",
  },
  {
    q: "How do tutorial centers manage students and tuition?",
    a: "Most start with notebooks and GCash receipts, which break down fast. Smapey SchoolDesk tracks every student enrollment, tuition balance, session, and attendance record in one place — free to start.",
  },
]

export default function Content() {
  return (
    <main className="bg-white">
      <Navbar />

      <ArticleHero
        badge="Philippines · Tutorial Centers"
        title={<>Running a tutorial center in the Philippines: the complete guide</>}
        intro="Tutorial centers are everywhere in the Philippines — from one-room review centers in the provinces to home-based tutors in every subdivision. Here's what a tutorial center is, how it makes money, and how to run one without drowning in paperwork."
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Animate>
          <AH2>What is a tutorial center?</AH2>
          <AP>
            A tutorial center is a small education business offering after-school help, subject tutoring, and exam review.
            Unlike a school, it's flexible: students come for specific subjects, on their own schedule, and pay tuition per
            month, per session, or per course. It's one of the most accessible businesses in the Philippines because the
            barrier to entry is knowledge, not capital.
          </AP>

          <AH2>Why tutorial centers thrive in the Philippines</AH2>
          <Bullets items={[
            "Education-first culture — parents invest heavily in their kids' academic success",
            "Recurring revenue — most students pay monthly and stay for a whole term or school year",
            "Low overhead — a single room and a few tutors can serve dozens of students",
            "High demand for review — entrance exams (UPCAT, ACET) and board reviews fill seats every year",
            "Word-of-mouth growth — happy parents refer their friends in the same village",
          ]} />

          <AH2>How a tutorial center makes money</AH2>
          <AP>The model is simple: tuition in, tutor pay out. A rough monthly picture for a small center:</AP>
          <CostTable
            rows={[
              ["Tuition per student (monthly)", "₱1,500 – ₱4,000"],
              ["Students enrolled", "20 – 60"],
              ["Monthly gross tuition", "₱30,000 – ₱200,000+"],
              ["Tutor pay (per hour or share)", "₱150 – ₱400 / hr"],
              ["Rent & utilities", "₱5,000 – ₱25,000"],
            ]}
            note="Illustrative only. Margins improve as you fill more seats per session and keep tuition collection tight."
          />

          <AH2>What you need to run one well</AH2>
          <AP>Beyond a room and tutors, the centers that survive are the organized ones. You need a reliable way to:</AP>
          <Bullets items={[
            "Track every student's enrollment and which program they're in",
            "Know exactly who has paid tuition and who still owes",
            "Schedule sessions and assign the right tutor",
            "Take attendance so parents trust their kids are showing up",
            "Record progress so you can prove results at renewal time",
          ]} />
          <AP>
            That's the difference between a center that quietly leaks money and one that grows. When you can't answer "who
            owes tuition this month?" in five seconds, you're losing income you earned.
          </AP>

          <SoftwarePitch />

          <AH2>Common questions about tutorial centers</AH2>
          <FAQList faqs={FAQS} />
        </Animate>
      </article>

      <CTA />
      <InternalLinks cluster="school-desk" currentPath="/school-desk/tutorial-center-philippines" />
      <Footer />
    </main>
  )
}
