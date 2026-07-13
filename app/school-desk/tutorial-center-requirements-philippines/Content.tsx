"use client"

import InternalLinks from "@/components/InternalLinks"
import {
  Navbar, Footer, CTA, Animate, ArticleHero,
  AH2, AP, Bullets, CostTable, FAQList, SoftwarePitch,
} from "../_shared"

const FAQS = [
  {
    q: "What are the basic requirements to open a tutorial center in the Philippines?",
    a: "At minimum: a registered business name (DTI for sole proprietor or SEC for corporation), a Barangay Clearance, a Mayor's/Business Permit, and BIR registration. Requirements vary per LGU, so always confirm with your local city or municipal hall.",
  },
  {
    q: "Does a tutorial center need DepEd accreditation?",
    a: "A pure tutorial/review center that supplements school learning generally does NOT need DepEd accreditation. However, if you offer formal, graded, or diploma-track instruction, additional DepEd or LGU requirements may apply. Check with your local government to be sure.",
  },
  {
    q: "How much do the permits cost?",
    a: "Registration and permit fees for a small tutorial center typically total ₱3,000–₱15,000 depending on your LGU, business size, and whether you're home-based or in a commercial space. Renewals are annual.",
  },
  {
    q: "Can I run a tutorial center from home legally?",
    a: "Yes, many tutorial centers in the Philippines are home-based. You still register the business and secure a Barangay Clearance and Mayor's Permit. Some LGUs have specific rules for home-based businesses, so verify locally.",
  },
  {
    q: "After the permits, what do I need to actually operate?",
    a: "A system to manage students, tuition, sessions, and attendance. Smapey SchoolDesk is free to start and keeps your operations organized once the paperwork is done.",
  },
]

export default function Content() {
  return (
    <main className="bg-white">
      <Navbar />

      <ArticleHero
        badge="Philippines · Requirements"
        title={<>Tutorial center requirements in the Philippines</>}
        intro="Before you open your doors, you need the right registrations and permits. Here's a clear checklist of the requirements to legally start and run a tutorial center in the Philippines, plus what you'll need to operate once the paperwork is done."
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Animate>
          <AH2>The core requirements checklist</AH2>
          <AP>
            Most tutorial centers in the Philippines need the same foundational set of documents. Requirements vary by LGU,
            so treat this as your starting checklist and confirm the specifics with your local city or municipal hall.
          </AP>
          <Bullets items={[
            "DTI Business Name Registration (sole proprietor) or SEC Registration (partnership/corporation)",
            "Barangay Business Clearance for your location",
            "Mayor's / Business Permit from your city or municipal hall",
            "BIR Registration (Certificate of Registration, Official Receipts / invoices, books of accounts)",
            "Lease contract or proof of property ownership for your space",
            "Fire Safety Inspection Certificate (often required for the Business Permit)",
            "Sanitary Permit (some LGUs require it for spaces serving the public)",
          ]} />

          <AH2>Step-by-step: how to secure them</AH2>
          <AP>The usual order keeps the process smooth, since later permits often require earlier ones:</AP>
          <Bullets items={[
            "1. Register your business name with DTI (or SEC for a corporation)",
            "2. Get your Barangay Clearance using your DTI certificate and lease",
            "3. Apply for the Mayor's / Business Permit at city hall (bring DTI, barangay clearance, lease, fire/sanitary certs)",
            "4. Register with the BIR, get your TIN/COR, and have Official Receipts printed",
            "5. Renew permits annually to stay compliant",
          ]} />

          <AH2>Estimated permit costs</AH2>
          <CostTable
            rows={[
              ["DTI business name registration", "₱200 – ₱2,000"],
              ["Barangay Clearance", "₱500 – ₱1,500"],
              ["Mayor's / Business Permit", "₱2,000 – ₱8,000"],
              ["BIR registration & receipts", "₱500 – ₱2,000"],
              ["Fire & sanitary certificates", "₱500 – ₱2,000"],
            ]}
            note="Fees vary by LGU and business size. Budget ₱3,000–₱15,000 total for a small center, plus annual renewals."
          />

          <AH2>Do you need DepEd accreditation?</AH2>
          <AP>
            This is the most common confusion. A <strong>tutorial or review center</strong> that supplements a student's
            regular schooling generally does <strong>not</strong> require DepEd accreditation. If you offer formal, graded,
            or diploma-track instruction (effectively acting like a school) you may face DepEd or additional LGU
            requirements. When in doubt, ask your local government before you advertise.
          </AP>

          <AH2>What you need beyond the permits</AH2>
          <AP>
            Paperwork gets you legal, but it doesn't run the center. Once you're open, you need a dependable way to track
            who's enrolled, who's paid tuition, who attended which session, and how each student is progressing. Starting on
            notebooks and GCash screenshots works for a week, then turns into chaos.
          </AP>
          <Bullets items={[
            "Student enrollment records and guardian contacts",
            "Tuition tracking, paid vs. outstanding balances",
            "Session scheduling and tutor assignment",
            "Attendance per session",
            "Progress notes parents can trust",
          ]} />

          <SoftwarePitch />

          <AH2>Frequently asked questions</AH2>
          <FAQList faqs={FAQS} />
        </Animate>
      </article>

      <CTA />
      <InternalLinks cluster="school-desk" currentPath="/school-desk/tutorial-center-requirements-philippines" />
      <Footer />
    </main>
  )
}
