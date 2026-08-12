// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Can I track which vehicles are available right now?", a: "Yes. The fleet page shows every vehicle's current status, Available, Rented, or Maintenance. The dashboard also shows a live count so you always know your fleet state at a glance." },
  { q: "What happens when a rental goes past its return date?", a: "Smapey automatically flags it as Overdue. You'll see overdue rentals highlighted on your dashboard so you can follow up with customers immediately." },
  { q: "Can I delete a customer who completed their rental?", a: "Customers with rental history can't be hard-deleted to protect your revenue records. Instead, you can deactivate them, they're hidden from active views but their history is preserved." },
  { q: "How do I track revenue?", a: "Each rental has a total amount field. Your dashboard shows monthly revenue from active and returned rentals, plus a 7-day trend chart." },
  { q: "Can my team use this too?", a: "Yes. You can invite staff with role-based access. Owners and admins can manage everything, while members can handle day-to-day rental operations." },
]

