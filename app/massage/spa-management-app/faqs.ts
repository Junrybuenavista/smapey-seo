// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Is Smapey a full spa management app, or just bookings?", a: "Both. The spa management app covers treatments, therapists, clients, appointments, deposits, inquiries, and analytics. You can run your entire spa from this one dashboard, bookings are just one piece." },
  { q: "Can I track per-therapist performance?", a: "Yes. The Pro and Enterprise plans show per-therapist appointment counts and revenue contribution, so you can see who's busiest, plan commissions fairly, and balance the workload." },
  { q: "Does it handle multi-step spa packages?", a: "Each treatment is defined with a true session length, so a 90-minute package shows correctly on the booking page and your schedule. You can also create longer combo treatments as individual services with custom durations and pricing." },
  { q: "Can I run multiple spa locations from one account?", a: "Each Smapey account represents one spa organization. The Enterprise plan supports unlimited team members, services, and appointments, suitable for a large single-location spa or for centralized booking. For separate locations with separate revenue books, run a separate account per branch." },
]

