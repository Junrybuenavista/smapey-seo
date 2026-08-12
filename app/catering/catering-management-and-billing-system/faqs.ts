// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "What is a catering management and billing system?", a: "A catering management and billing system combines event booking management with payment tracking in one tool. It handles client registration, event booking, package assignment, payment milestone creation and collection, supply catalog management, and staff assignment, replacing separate spreadsheets, paper records, and manual invoicing." },
  { q: "How does billing work in Smapey's catering system?", a: "Billing is milestone-based per booking. You create milestones for each booking (e.g., 30% reservation fee, 50% partial payment two weeks before the event, 20% balance on event day). Each milestone records the amount, due date, payment method, and paid/unpaid status. The dashboard shows all outstanding milestones at a glance." },
  { q: "Does the billing system support partial payments?", a: "Yes. Each milestone can be marked as paid, partially paid, pending, or overdue. This matches how Philippine catering payments typically work, clients rarely pay in full upfront, so milestone tracking is central to the billing process." },
  { q: "What payment methods can I log?", a: "You can record collections as Cash, GCash, Maya, Card, or Bank Transfer. Smapey doesn't process payments, it records what you collect and keeps your milestone history accurate." },
  { q: "Is there a difference between the management system and billing system?", a: "In Smapey, they're the same system. The catering management module handles the operational side (bookings, packages, staff, supplies) and the billing side (payment milestones, collections, revenue tracking) together. You don't need separate software for each." },
  { q: "Is it free?", a: "Yes, Smapey's free plan includes full catering management and billing capabilities. Upgrade to PRO or ENTERPRISE when your business needs higher limits." },
]

