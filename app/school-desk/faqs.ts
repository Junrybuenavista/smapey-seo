// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Who is Smapey SchoolDesk for?", a: "Tutorial centers, review centers, home-based tutors, and private learning centers in the Philippines. Whether you have 5 students or 500, SchoolDesk replaces your notebook and spreadsheet with one clean system." },
  { q: "Can I track multiple subjects or programs?", a: "Yes. You can create as many programs as you need, one per subject, grade level, or course. Each program has its own tuition fee, teacher assignment, and session schedule." },
  { q: "How does tuition tracking work?", a: "Each enrollment has a tuition fee and a running total of payments recorded. You can see the balance at any time, who's fully paid, who still owes, and how much you've collected this month." },
  { q: "Can multiple teachers use the system?", a: "Yes. You can invite team members and assign them roles. Teachers can view their assigned programs and sessions; the owner sees everything including financials." },
  { q: "Is there a printable report card or summary?", a: "The progress notes feature lets you add written notes and a rating per student after each session. Printable reports are on the roadmap for a future update." },
  { q: "Is there a free plan?", a: "Yes. The Free plan lets you manage up to 50 students at no cost. Upgrade to Pro when your center grows." },
]

