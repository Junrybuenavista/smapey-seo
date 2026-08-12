// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "What is catering management software?", a: "Catering management software is a digital tool that helps catering businesses in the Philippines manage event bookings, client information, packages and menus, payment collection, supply catalogs, and staff assignments, all in one dashboard instead of spreadsheets and paper records." },
  { q: "Can I track multiple events at the same time?", a: "Yes. You can have as many simultaneous bookings as your plan allows. Each booking has its own status, assigned packages, payment milestones, and staff list, all visible from the main bookings list." },
  { q: "How do payment milestones work?", a: "You create milestones per booking, for example, a 30% reservation fee, a 50% partial payment two weeks before the event, and the remaining balance on event day. Each milestone tracks amount, due date, payment method, and paid/unpaid status. When a booking is marked Completed, all outstanding milestones are auto-settled." },
  { q: "Can I manage my supply catalog and estimate food cost?", a: "Yes. The supply catalog lets you add ingredients and materials with unit type (kg, liters, pieces) and cost per unit. You can link supplies to packages to estimate procurement cost per booking." },
  { q: "Is it suitable for a small catering business in the Philippines?", a: "Absolutely. Smapey Catering Manager is built for small to mid-sized Philippine catering businesses, from solo operators handling weekend events to teams running 10+ bookings a month. The free plan lets you get started at no cost." },
  { q: "Is there a free plan?", a: "Yes. The free plan lets you manage a small catering operation with bookings, client profiles, packages, a supply catalog, payment milestones, and staff assignments, at no cost." },
]

