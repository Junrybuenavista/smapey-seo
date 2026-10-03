// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "What does a catering management system do?", a: "It runs the whole life of an event in one place: the client inquiry, a quotation the client accepts online, the booking on your calendar, the menu and headcount, the market list from your recipes, payment milestones, and the staff who work it. It replaces spreadsheets, Messenger threads, and paper records with one dashboard." },
  { q: "Can it handle payment milestones for each booking?", a: "Yes. Each booking can have multiple payment milestones, for example, a reservation fee, a partial payment before the event, and a final balance on event day. You record each payment against its milestone and the system tracks outstanding balances automatically." },
  { q: "Does it support multiple catering packages?", a: "Yes. You can build a catalog of catering packages with name, description, price per head, and the dishes on the menu. Multiple packages can be attached to a single booking, useful when a client books both a buffet package and a drinks package, for example." },
  { q: "Can I track ingredients and supply costs?", a: "Yes. Add ingredients with their unit (kg, liters, pieces) and cost, then build recipes from them. Each package shows its food cost per guest, and each booking calculates its market list for the exact headcount and compares estimated vs. actual spend." },
  { q: "Can clients accept quotations online?", a: "Yes. Create a quote from any booking and send the link through Messenger, Viber, or SMS. Your client sees the menu, charges, payment schedule, and your terms on their phone, then accepts by typing their name or asks for changes. You're notified either way." },
  { q: "Does it help prevent double bookings?", a: "Yes. Set how many events you can run in a day, and the calendar marks full days. Smapey warns you before you book or confirm an event on a full day, and flags staff who are already on another event that day." },
  { q: "Is the system free to use?", a: "Yes. Smapey Catering Manager has a free plan for small catering businesses, with limits on how many bookings, clients, and menu packages you keep. Upgrade to PRO or ENTERPRISE when your business needs more capacity." },
]

