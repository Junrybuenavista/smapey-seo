// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "How does the inquiry-to-appointment flow work?", a: "Clients visit your public booking page and submit a booking inquiry with their preferred service, date, and time. The inquiry appears in your Inquiries tab. You review it, accept it, and it converts into a confirmed appointment automatically." },
  { q: "Can clients book directly without me approving?", a: "Currently, all bookings go through an inquiry flow where you confirm the appointment. This gives you full control over your schedule and prevents conflicts." },
  { q: "What appointment statuses are available?", a: "Appointments move through three statuses: Booked (confirmed), In Progress (client is currently being served), and Completed (service is done and payment recorded)." },
  { q: "Can I see all appointments for the week at once?", a: "Yes. The appointment dashboard gives you a full list view that you can filter by date range, staff member, or service type, so you can plan ahead and avoid scheduling conflicts." },
]

