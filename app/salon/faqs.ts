// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Does the app include a public booking page?", a: "Yes. Every salon account gets a unique URL like smapey.com/salon/your-salon-name. Clients can browse your services and send a booking inquiry directly from that page." },
  { q: "Can I manage multiple staff members?", a: "Yes. You can add team members to your account and assign appointments to specific staff. The Pro plan supports up to 5 team members." },
  { q: "How do I accept payments?", a: "Smapey SalonOS tracks appointment totals and completion status. You can record cash, GCash, or bank transfer payments per appointment." },
  { q: "Is there a free plan?", a: "Yes. The free plan supports up to 50 appointments per month, 5 services, and a public booking page, no credit card required." },
]

