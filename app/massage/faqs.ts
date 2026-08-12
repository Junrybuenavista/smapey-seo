// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Is there really a free plan?", a: "Yes. The free plan includes up to 10 treatments, 30 appointments per month, 2 team members, and a full public booking page. No credit card required, no time limit, no surprise upgrades." },
  { q: "Can clients book online?", a: "Yes. Every business gets a unique public URL (e.g. smapey.com/massage/your-spa) where clients can browse treatments, optionally request a therapist, and send a booking inquiry. Approve or decline from your dashboard." },
  { q: "Can I track therapist assignments?", a: "Yes. Add your therapists, assign them to appointments, and filter the schedule by therapist. Each appointment also captures the client's pressure preference and focus areas." },
  { q: "Do you store health information securely?", a: "Yes. Health notes are stored on each client profile and only visible to authenticated staff in your organization. They never appear on the public booking page." },
  { q: "Can I take deposits?", a: "On Pro and Enterprise plans, you can upload a payment QR (GCash, Maya, bank) and require a reference number before clients can submit a booking request, reducing no-shows on premium treatments." },
]

