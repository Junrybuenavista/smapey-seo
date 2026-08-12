// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Is this built for medical clinics specifically?", a: "Yes, the workflow maps directly to how clinics operate. Assign doctors, track consultation fees, manage patient appointment slots, and move bookings through a Pending → Confirmed → Completed flow." },
  { q: "Can we assign appointments to specific doctors?", a: "Yes. Each appointment has a staff assignment field. You can assign Dr. Santos to one booking and Dr. Reyes to another, all tracked separately." },
  { q: "How does deposit/fee tracking work?", a: "When creating an appointment you can record a fee or deposit amount and mark it as paid or unpaid. It's a simple record-keeping field, no payment processing at the appointment level." },
  { q: "Can our receptionist use this without full admin access?", a: "Yes. You can invite staff with limited access so they can create and manage appointments without seeing billing or admin settings." },
]

