// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "How fast can I accept a new on-demand order?", a: "Under 30 seconds. Enter the customer's phone number (or select a returning customer), choose the service type, enter kilos, and submit. Ticket number is auto-generated instantly." },
  { q: "Do customers get notified automatically?", a: "Yes. On the Pro plan, customers receive an automatic SMS when you accept their order and another when it's ready for pickup. On the Free plan, SMS can be sent manually." },
  { q: "Can I handle multiple on-demand orders at the same time?", a: "Yes. All open orders appear in your dashboard. You can update each order's status independently, there's no limit to how many you can have in progress simultaneously (on Pro)." },
  { q: "What if a customer wants express processing?", a: "Add express processing as an add-on service with its own price. It's attached to the specific order and shown in the customer's receipt." },
]

