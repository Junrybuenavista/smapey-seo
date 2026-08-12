// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Is this specifically built for dental clinics?", a: "The system works for any clinic type, including dental. You can name your practitioners as dentists, add procedure types as services, and use the queue board to manage chairs instead of rooms." },
  { q: "Can I manage multiple dentists?", a: "Yes. Add each dentist with their own schedule slots, specialty, and contact info. Appointments are assigned per dentist so the queue board stays clear." },
  { q: "Does it handle appointment reminders?", a: "Currently the system is front-desk operated, staff create and manage appointments. The dashboard shows today's schedule so your team is always prepared." },
  { q: "Is there a free plan?", a: "Yes. The free plan lets you run a small dental practice with core features (patient records, appointment booking, and the live queue board) at no cost." },
]

