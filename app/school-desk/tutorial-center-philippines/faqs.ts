// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  {
    q: "What is a tutorial center?",
    a: "A tutorial center is a small learning business that offers after-school tutoring, homework help, and exam review to students, usually in groups or one-on-one. In the Philippines they range from a single room in a subdivision to multi-branch review centers.",
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
    a: "Typically DTI business name registration, a Barangay Clearance, a Mayor's/Business Permit, and BIR registration. Larger centers offering formal instruction may need additional LGU or DepEd-related requirements, confirm with your local city hall.",
  },
  {
    q: "How do tutorial centers manage students and tuition?",
    a: "Most start with notebooks and GCash receipts, which break down fast. Smapey SchoolDesk tracks every student enrollment, tuition balance, session, and attendance record in one place, free to start.",
  },
]

