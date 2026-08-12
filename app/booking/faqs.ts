// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Who is this built for?", a: "Any service-based business with appointments, dental clinics, hair salons, massage studios, tutoring centers, beauty spas, and more. If clients book time slots with your staff, this is for you." },
  { q: "Can clients book appointments themselves online?", a: "Currently, appointments are created by your staff through the dashboard. This is designed as an internal scheduling tool, ideal for businesses where clients call or walk in and staff enters the booking." },
  { q: "How does deposit tracking work?", a: "When creating an appointment, you can record a deposit amount and mark it as Paid or Unpaid. It's a simple record-keeping field, no payment processing is involved at the appointment level." },
  { q: "Can I assign different staff to different appointments?", a: "Yes. Each appointment has an optional staff name field. You can assign Dr. Santos to one booking and Dr. Reyes to another, all tracked separately." },
  { q: "What happens when an appointment is completed?", a: "You mark it as Completed in the dashboard. It stays in your appointment history so you can track your monthly totals, completion rates, and client records over time." },
]

