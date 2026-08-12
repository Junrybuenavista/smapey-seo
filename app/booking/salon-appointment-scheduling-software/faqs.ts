// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Can I schedule appointments for multiple stylists at the same time?", a: "Yes. Each stylist has their own availability schedule. When you book a client, you assign them to a specific stylist, preventing double bookings automatically." },
  { q: "How does service duration affect scheduling?", a: "Each service has a custom duration you define. The system uses that duration to block off the right amount of time for each appointment, preventing overlap." },
  { q: "Can I require a deposit when booking?", a: "Yes. You can record a deposit amount when creating an appointment and mark it as paid or unpaid. This helps reduce no-shows significantly." },
  { q: "Is this for online booking or internal scheduling?", a: "It's an internal scheduling tool, your staff books appointments through the dashboard when clients call or walk in. Ideal for salons that prefer to control their own booking process." },
]

