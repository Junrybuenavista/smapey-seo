// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Can two customers book the same car at the same time?", a: "No. Once a vehicle is in an Active or Reserved rental, it's marked as Rented and can't be booked again until it's returned or the rental is cancelled." },
  { q: "How do I track deposits?", a: "Each rental has a deposit amount field. You enter the expected deposit when creating the booking and mark it as collected. No separate sheet required." },
  { q: "What happens when a booking goes overdue?", a: "If the return date passes and the rental is still Active, Smapey automatically flags it as Overdue. It appears on your dashboard so you can contact the customer immediately." },
  { q: "Can I set different pickup and return locations?", a: "Yes. Each rental has separate pickup and return location fields so you can track one-way rentals or cross-location pickups." },
]

