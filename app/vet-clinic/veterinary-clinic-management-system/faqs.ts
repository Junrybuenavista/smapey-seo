// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "What is a veterinary clinic management system?", a: "It is software that centralizes all clinic operations, pet records, vet schedules, appointment booking, a live patient queue, vaccination tracking, and billing, in one place instead of paper cards and spreadsheets." },
  { q: "Does it work for both dog and cat clinics?", a: "Yes. Pet profiles include a species and breed field, so the system works for any animal, dogs, cats, birds, reptiles, rabbits, and more. There are no species restrictions." },
  { q: "Can I track vaccination schedules per pet?", a: "Yes. Each vaccination entry stores the vaccine name, date given, and next due date. A 30-day upcoming vaccinations list appears on the dashboard so your team can remind owners in advance." },
  { q: "How does billing work?", a: "After a visit, create a bill with line items, consultation fee, medications, procedures. Set quantity and unit price per item. Record payments via Cash, GCash, Maya, Card, or Bank Transfer. The system tracks unpaid and partial balances." },
  { q: "Is there a free plan?", a: "Yes. The free plan includes core features, pet records, appointment scheduling, live queue, vaccination tracking, and billing, at no cost. Upgrade when your clinic needs more capacity." },
]

