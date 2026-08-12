// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Can I manage multiple nail techs on one account?", a: "Yes. Invite your nail techs as team members and assign each appointment to the right person. Everyone sees their own schedule." },
  { q: "How does deposit tracking work?", a: "When booking an appointment, you can record a deposit amount and mark it as paid or unpaid. It reduces no-shows and keeps your cash flow visible." },
  { q: "Can I list different nail services with different prices?", a: "Yes. Each service (manicure, pedicure, gel, acrylics) has its own name, duration, and price." },
  { q: "Do clients book online themselves?", a: "Currently appointments are created by your staff through the dashboard. It's an internal scheduling tool, ideal for salons where clients call or walk in." },
]

