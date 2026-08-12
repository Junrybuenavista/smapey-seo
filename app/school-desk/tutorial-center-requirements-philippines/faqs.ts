// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
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

