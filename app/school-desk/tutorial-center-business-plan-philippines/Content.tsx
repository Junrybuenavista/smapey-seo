"use client"

import InternalLinks from "@/components/InternalLinks"
import {
  Navbar, Footer, CTA, Animate, ArticleHero,
  AH2, AP, Bullets, CostTable, FAQList, SoftwarePitch,
} from "../_shared"

const FAQS = [
  {
    q: "Do I need a business plan to start a tutorial center?",
    a: "You don't legally need one, but a simple plan keeps you focused, it forces you to think through your market, pricing, costs, and break-even point before you spend money. Even a one-page plan dramatically improves your odds.",
  },
  {
    q: "How much profit can a tutorial center make?",
    a: "Margins are healthy because overhead is low. A small center with 30–40 students paying ₱2,000–₱3,000/month can gross ₱60,000–₱120,000 monthly, with tutor pay and rent as the main costs. Profit hinges on filling seats and collecting tuition on time.",
  },
  {
    q: "What's the break-even point for a tutorial center?",
    a: "Most home-based centers break even within the first 2–4 months once they reach 15–20 paying students. Commercial spaces take longer because of rent. Tracking tuition collection tightly is what gets you to break-even faster.",
  },
  {
    q: "How do I project income in my business plan?",
    a: "Estimate students × monthly tuition, minus tutor pay, rent, utilities, and materials. Build a conservative case (low enrollment) and a target case. Then track actuals against it, which is far easier with software than spreadsheets.",
  },
  {
    q: "What tool should I use to run the center after planning?",
    a: "Smapey SchoolDesk is free to start and manages the operations your plan describes (enrollments, tuition tracking, sessions, and attendance) so your real numbers stay visible.",
  },
]

export default function Content() {
  return (
    <main className="bg-white">
      <Navbar />

      <ArticleHero
        badge="Philippines · Business Plan"
        title={<>A sample tutorial center business plan for the Philippines</>}
        intro="A business plan turns a good idea into a real business. Here's a simple, practical tutorial center business plan template for the Philippines, covering market, services, pricing, costs, marketing, and operations you can adapt in an afternoon."
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Animate>
          <AH2>1. Executive summary</AH2>
          <AP>
            One short paragraph describing your center: what it does, who it serves, and why it'll succeed. Example:
            <em> "BrightMinds Tutorial Center provides after-school tutoring and exam review for Grades 1–10 students in
            Barangay San Jose. We offer small-group and one-on-one sessions in Math, English, and Science, with monthly
            tuition packages. Our edge is consistent tutors, progress tracking, and a convenient location near three
            schools."</em>
          </AP>

          <AH2>2. Market analysis</AH2>
          <AP>Show you understand your local demand and competition:</AP>
          <Bullets items={[
            "Target customers, parents of grade-school and high-school students in your area",
            "Demand drivers, competitive school standards, entrance exams, working parents",
            "Competition, other centers nearby, their pricing, and what they lack",
            "Your differentiator, location, specialization, results, or better organization",
          ]} />

          <AH2>3. Services & programs</AH2>
          <AP>List exactly what you'll offer and how it's structured:</AP>
          <Bullets items={[
            "Subject tutoring, Math, English, Science (per grade level)",
            "Homework help and after-school supervision",
            "Entrance exam review, UPCAT, ACET, and high-school admission tests",
            "Small-group vs. one-on-one options",
          ]} />

          <AH2>4. Pricing</AH2>
          <AP>Define your tuition model, most centers mix monthly packages with per-session rates:</AP>
          <CostTable
            rows={[
              ["Per-session (one-on-one)", "₱250 – ₱500"],
              ["Monthly package (2x / week)", "₱2,000 – ₱3,500"],
              ["Monthly package (3x / week)", "₱3,500 – ₱6,000"],
              ["Entrance exam review course", "₱5,000 – ₱15,000"],
            ]}
            note="Set prices against your local market. Packages give you predictable recurring revenue."
          />

          <AH2>5. Startup costs</AH2>
          <CostTable
            rows={[
              ["Furniture & whiteboards", "₱10,000 – ₱40,000"],
              ["Learning materials", "₱5,000 – ₱20,000"],
              ["Permits & registration", "₱3,000 – ₱15,000"],
              ["Rent deposit & renovation", "₱0 – ₱150,000"],
              ["Marketing & signage", "₱3,000 – ₱20,000"],
              ["Total (home-based → commercial)", "₱20,000 – ₱245,000"],
            ]}
            note="Start home-based to keep startup cost minimal, then reinvest tuition into a commercial space."
          />

          <AH2>6. Marketing plan</AH2>
          <Bullets items={[
            "Facebook posts in barangay, village, and school parent groups",
            "Free trial session or first-month discount to convert leads",
            "Flyers and tarpaulins near nearby schools",
            "Referral incentives for parents who bring friends",
          ]} />

          <AH2>7. Operations plan</AH2>
          <AP>
            This is where plans usually go vague, and where centers actually fail. Spell out how you'll handle daily
            operations: enrolling students, scheduling sessions, assigning tutors, taking attendance, collecting tuition,
            and tracking progress. A center that can't tell you who owes money or who skipped class is leaking profit.
          </AP>
          <Bullets items={[
            "Enrollment, register each student and the program they join",
            "Scheduling, plan sessions per program and assign tutors",
            "Attendance, record who attends every session",
            "Tuition, track balances and collect on time",
            "Progress, keep notes parents can see at renewal",
          ]} />

          <AH2>8. Financial projection</AH2>
          <AP>
            Project monthly: students × tuition = gross revenue, minus tutor pay, rent, utilities, and materials = net
            profit. Build a conservative case and a target case, then track your real numbers against the plan every month.
          </AP>

          <SoftwarePitch />

          <AH2>Frequently asked questions</AH2>
          <FAQList faqs={FAQS} />
        </Animate>
      </article>

      <CTA />
      <InternalLinks cluster="school-desk" currentPath="/school-desk/tutorial-center-business-plan-philippines" />
      <Footer />
    </main>
  )
}
