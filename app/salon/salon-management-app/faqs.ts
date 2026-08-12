// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "What makes Smapey different from other salon management apps?", a: "Smapey focuses on the essentials (appointments, clients, services, and a public booking page) without the complexity of large enterprise tools. It's built for small salons that need to get started quickly and affordably." },
  { q: "How does the public booking page work?", a: "Every salon account gets a unique URL. When clients visit the page, they see your service menu and can submit a booking inquiry with their preferred date and time. You review and confirm the booking in your dashboard." },
  { q: "Can I manage staff with the app?", a: "Yes. You can add team members and assign appointments to specific staff. The free plan supports 2 team members. The Pro plan supports up to 5." },
  { q: "Is the free plan really free forever?", a: "Yes. The free plan has no time limit. It supports up to 50 appointments per month, 5 services, and 2 team members. You only need to upgrade when your volume grows." },
]

