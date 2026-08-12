// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Can I manage multiple stylists on one account?", a: "Yes. You can invite your stylists as team members and assign each appointment to the right person. Everyone sees only what they need." },
  { q: "How does deposit tracking help reduce no-shows?", a: "When you require a deposit at booking, clients have skin in the game. You record the deposit amount and mark it as paid, giving you a clear record and reducing last-minute cancellations." },
  { q: "Can I list different services with different durations?", a: "Yes. Each service has its own name, duration, and price. You can set a haircut to 45 mins and a color treatment to 2 hours, and availability is managed accordingly." },
  { q: "Do clients book online themselves?", a: "Currently appointments are created by your staff through the dashboard. It's designed as an internal scheduling tool, ideal for salons where clients call or walk in and staff enters the booking." },
]

