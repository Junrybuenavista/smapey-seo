// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Can I manage multiple Airbnb properties from one account?", a: "Yes. Each property gets its own listing with photos, pricing, and room details. The free plan supports 2 properties, Pro supports 10, and Enterprise is unlimited." },
  { q: "How do I see which properties are available on a given date?", a: "Filter the Reservations list by property and status. You can quickly see what's booked, checked in, or open for a specific unit without checking a separate calendar." },
  { q: "Does each property have its own cleaning fee?", a: "Yes. Each property carries its own nightly rate and cleaning fee. When a reservation is created for that property, the cleaning fee is automatically included in the total cost." },
  { q: "What's the difference between Pro and Enterprise?", a: "Pro supports 10 properties and 3 team users with unlimited reservations. Enterprise removes all limits (unlimited properties, users, and reservations) plus priority support." },
]

