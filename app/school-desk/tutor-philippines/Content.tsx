"use client"

import InternalLinks from "@/components/InternalLinks"
import {
  Navbar, Footer, CTA, Animate, ArticleHero,
  AH2, AP, Bullets, CostTable, FAQList, SoftwarePitch,
} from "../_shared"
import { FAQS } from "./faqs"

export default function Content() {
  return (
    <main className="bg-white">
      <Navbar />

      <ArticleHero
        badge="Philippines · Tutoring"
        title={<>How to become a tutor in the Philippines (and run it like a business)</>}
        intro="Tutoring is one of the easiest businesses to start in the Philippines, you already have the knowledge, and demand is everywhere. Here's how to find students, set your rates, run sessions professionally, and get paid on time."
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Animate>
          <AH2>Why tutoring is a great business in the Philippines</AH2>
          <AP>
            Filipino parents invest heavily in education, and demand for tutors spans every level, from grade-school
            reading and math to UPCAT and board-exam review. You don't need capital or a storefront: a single tutor with a
            few subjects can build a steady income from home or online. The hard part isn't teaching, it's staying
            organized as students pile up.
          </AP>

          <AH2>Step 1: Pick your subjects and level</AH2>
          <AP>Focus where you're strongest and where demand is high. Popular tutoring niches in the Philippines include:</AP>
          <Bullets items={[
            "Grade-school core subjects, Math, English, Science, Reading",
            "High-school Math and Science (Algebra, Geometry, Chemistry, Physics)",
            "Entrance exam review, UPCAT, ACET, DLSUCET, USTET",
            "Board exam and licensure review",
            "English fluency / ESL for kids and professionals",
            "Music, art, and coding for kids",
          ]} />

          <AH2>Step 2: Set your rates</AH2>
          <AP>Price by the hour for one-on-one, or as a monthly package for regular students. Typical ranges:</AP>
          <CostTable
            rows={[
              ["Grade-school tutoring (per hour)", "₱150 – ₱350"],
              ["High-school tutoring (per hour)", "₱250 – ₱500"],
              ["Entrance / board exam review (per hour)", "₱400 – ₱1,000+"],
              ["Monthly package (2–3x per week)", "₱2,000 – ₱6,000"],
            ]}
            note="Rates depend on subject, location, and whether sessions are online or in person. Charge more for specialized prep."
          />

          <AH2>Step 3: Find your first students</AH2>
          <AP>You don't need ads. The most reliable channels in the Philippines are:</AP>
          <Bullets items={[
            "Facebook, post in barangay, village, and school parent groups",
            "Referrals, ask happy students and parents to recommend you",
            "Your old school, teachers and guidance offices refer struggling students",
            "A simple rate sheet you can send on Messenger in one tap",
          ]} />

          <AH2>Step 4: Run sessions professionally</AH2>
          <AP>
            What separates a hobby from a business is consistency. Schedule sessions in advance, show up prepared, take
            attendance, and keep a short note on each student's progress so you can show parents real improvement. Parents
            renew when they see a system, not just goodwill.
          </AP>

          <AH2>Step 5: Get paid on time</AH2>
          <AP>
            Decide upfront: pay-per-session or monthly in advance. GCash makes collection easy, but receipts scattered
            across chat threads make it impossible to know who actually paid. Track every payment against each student so
            you always know your balance and never chase the wrong parent.
          </AP>

          <SoftwarePitch />

          <AH2>Frequently asked questions</AH2>
          <FAQList faqs={FAQS} />
        </Animate>
      </article>

      <CTA />
      <InternalLinks cluster="school-desk" currentPath="/school-desk/tutor-philippines" />
      <Footer />
    </main>
  )
}
