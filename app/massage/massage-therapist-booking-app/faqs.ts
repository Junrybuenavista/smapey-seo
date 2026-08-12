// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Can clients actually request a specific therapist when booking?", a: "Yes. On the public booking page, after picking a treatment, clients see an optional therapist selector with names and specialties. The request flows into your inquiry inbox so you can honor it when confirming the appointment." },
  { q: "What if my preferred therapist is busy at the requested time?", a: "Smapey uses a request-and-confirm model, clients send a booking inquiry, you decide whether to accept it. If the requested therapist isn't available, you can reassign on confirmation and message the client. No double-booking, no automatic conflicts." },
  { q: "Can each therapist see only their own bookings?", a: "Yes. Team members with the MEMBER role see only the appointments assigned to them, not the spa's full schedule or revenue. Owners and admins see everything. You control access through user roles." },
  { q: "Does this work for solo massage therapists too?", a: "Absolutely. Solo therapists use Smapey to run their own branded booking page, your name, your services, your specialties, your clients. The free plan supports a solo practice with an optional second team member (often a receptionist or assistant)." },
]

