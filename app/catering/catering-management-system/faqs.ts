// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "What does a catering management system do?", a: "A catering management system helps catering businesses manage the full event lifecycle, from client registration and booking creation, to package assignment, payment milestone tracking, supply catalog management, and staff assignment. It replaces spreadsheets and paper records with a single digital dashboard." },
  { q: "Can it handle payment milestones for each booking?", a: "Yes. Each booking can have multiple payment milestones, for example, a reservation fee, a partial payment before the event, and a final balance on event day. You record each payment against its milestone and the system tracks outstanding balances automatically." },
  { q: "Does it support multiple catering packages?", a: "Yes. You can build a catalog of catering packages with name, description, and price per head. Multiple packages can be attached to a single booking, useful when a client books both a buffet package and a drinks package, for example." },
  { q: "Can I track ingredients and supply costs?", a: "Yes. The supply catalog lets you add ingredients and materials with unit type (kg, liters, pieces) and cost per unit. This gives you a reference point for estimating procurement cost when planning for an event." },
  { q: "Is the system free to use?", a: "Yes, Smapey Catering Manager has a free plan that covers bookings, client profiles, packages, payment milestones, supply catalog, and staff assignment at no cost. Upgrade to PRO or ENTERPRISE when your business needs more capacity." },
]

