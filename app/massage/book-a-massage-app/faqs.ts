// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Do my clients need to download an app to book a massage?", a: "No. The booking page is a regular web link, clients tap it in their browser on any phone, tablet, or desktop. There's no app to install, no account to create, and no friction." },
  { q: "Can clients book a massage outside business hours?", a: "Yes. The booking page is online 24/7. Clients can book at midnight if they want, the inquiry waits in your dashboard until you review and confirm in the morning." },
  { q: "What does the client see when they book?", a: "They see your branded page with your treatments, prices, durations, and (optionally) your therapists. They pick a service, optionally request a therapist, choose a date and time, fill in name + phone, and submit. That's it." },
  { q: "Can I block bookings during my off-hours?", a: "The current setup uses a request-and-confirm model, you review every inquiry before it becomes an appointment. That gives you flexibility without strict calendar rules. Most small spas prefer this over rigid availability slots." },
]

