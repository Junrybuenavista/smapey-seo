// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  {
    q: "How much do tutors charge in the Philippines?",
    a: "Rates vary widely by subject, level, and location. Home-based and online tutors commonly charge ₱150–₱500 per hour, while specialized tutors (review prep, college subjects, music) charge ₱400–₱1,000+ per hour. Tutorial centers often bill monthly packages instead of hourly.",
  },
  {
    q: "Do I need a license to be a tutor in the Philippines?",
    a: "A private one-on-one tutor generally doesn't need a special license. But if you register as a business or open a tutorial center, you'll need DTI registration, a Mayor's/Business Permit, BIR registration, and sometimes LGU and DepEd-related clearances. Confirm requirements with your local city hall.",
  },
  {
    q: "How do I find tutoring students?",
    a: "Word of mouth and Facebook groups are the biggest channels in the Philippines. Parents ask in barangay and school parent groups; referrals from happy students compound over time. A clear rate sheet and reliable scheduling keep them coming back.",
  },
  {
    q: "How do I keep track of multiple students and payments?",
    a: "Once you pass a handful of students, GCash receipts and a notebook stop working. Smapey SchoolDesk is free to start and tracks every student, their tuition balance, session schedule, and attendance, from your phone.",
  },
  {
    q: "Can I tutor online and in person with the same system?",
    a: "Yes. Smapey doesn't care whether your session is at a kitchen table or over Zoom, you still schedule sessions, take attendance, and collect tuition the same way.",
  },
]

