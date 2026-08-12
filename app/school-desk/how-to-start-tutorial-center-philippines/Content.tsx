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
        badge="Philippines · Step-by-step"
        title={<>How to start a tutorial center in the Philippines</>}
        intro="A tutorial center is one of the easiest, lowest-cost businesses to start in the Philippines, demand is everywhere and you can begin from a single room. Here's exactly how to launch one, from capital and permits to hiring tutors, pricing, and running the day-to-day."
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Animate>
          <AH2>Why start a tutorial center?</AH2>
          <AP>
            Filipino families spend on education before almost anything else, and there's never enough quality after-school
            help. A tutorial center turns your teaching ability into a <strong>recurring-revenue business</strong> with low
            startup cost and steady monthly tuition. You can begin from home with a handful of students and scale into a
            commercial branch as you grow.
          </AP>

          <AH2>Step 1: Estimate your startup capital</AH2>
          <AP>Budgets vary, but a small center usually falls in this range:</AP>
          <CostTable
            rows={[
              ["Tables, chairs & whiteboards", "₱10,000 – ₱40,000"],
              ["Learning materials & books", "₱5,000 – ₱20,000"],
              ["Permits & registration", "₱3,000 – ₱15,000"],
              ["Rent deposit & renovation (if commercial)", "₱20,000 – ₱150,000"],
              ["Signage & initial marketing", "₱3,000 – ₱20,000"],
            ]}
            note="Start home-based to skip rent and renovation entirely. Move to a commercial space once your enrollment justifies it."
          />

          <AH2>Step 2: Choose your location</AH2>
          <AP>Location decides how many students walk in. Look for:</AP>
          <Bullets items={[
            "Near schools, proximity means parents pass by every day",
            "Inside or near residential subdivisions and barangays",
            "Safe, accessible, with parking or easy drop-off",
            "Quiet enough for focused study, avoid noisy main roads if possible",
          ]} />

          <AH2>Step 3: Register and get permits</AH2>
          <AP>Keep it legal from the start so you can grow without issues:</AP>
          <Bullets items={[
            "Register your business name with DTI (sole proprietor) or SEC (corporation)",
            "Get a Barangay Clearance for your location",
            "Secure a Mayor's / Business Permit from your city or municipal hall",
            "Register with the BIR and get your Official Receipts / invoices",
            "Confirm any LGU or DepEd-related requirements for your area",
          ]} />

          <AH2>Step 4: Decide your programs and pricing</AH2>
          <AP>
            Define what you teach (by subject, grade level, or review track) and how you charge. Monthly packages give you
            predictable recurring income; per-session pricing is flexible for casual students.
          </AP>
          <CostTable
            rows={[
              ["Per-session rate", "₱150 – ₱500"],
              ["Monthly package (2–3x / week)", "₱2,000 – ₱6,000"],
              ["Entrance / board review course", "₱5,000 – ₱20,000"],
            ]}
            note="Price by your local market and the value of the program. Review courses command the highest rates."
          />

          <AH2>Step 5: Hire tutors (when you're ready)</AH2>
          <AP>
            Start solo to validate demand, then bring in part-time tutors (college students or licensed teachers) as
            enrollment grows. Assign each tutor to specific programs and sessions, and keep notes on student progress so the
            teaching quality stays high no matter who's in the room.
          </AP>

          <AH2>Step 6: Find your first students</AH2>
          <Bullets items={[
            "Post in Facebook barangay, village, and school parent groups",
            "Offer a free trial session or first-month discount",
            "Put up flyers near nearby schools",
            "Ask early students and parents for referrals",
          ]} />

          <AH2>Step 7: Run the day-to-day</AH2>
          <AP>
            Once students enroll, the real work is staying organized: who's enrolled, who paid tuition, who showed up, and
            how each student is progressing. Do this on paper and you'll lose money to forgotten balances and missed
            sessions. Do it in a system and you'll always know exactly where your center stands.
          </AP>

          <SoftwarePitch />

          <AH2>Frequently asked questions</AH2>
          <FAQList faqs={FAQS} />
        </Animate>
      </article>

      <CTA />
      <InternalLinks cluster="school-desk" currentPath="/school-desk/how-to-start-tutorial-center-philippines" />
      <Footer />
    </main>
  )
}
