// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "How fast can I accept a new on-demand order?", a: "Under 30 seconds. Enter the customer's phone number (or select a returning customer), choose the service type, enter kilos, and submit. Ticket number is auto-generated instantly." },
  { q: "Do customers get notified automatically?", a: "Yes. Customers receive an automatic SMS when you accept their order and another when it's ready for pickup. SMS uses credits - the Pro plan includes 1,000 and you can top up a prepaid balance on any plan. On every plan, including Free, customers can also scan the QR code on their printed claim stub to check the status themselves." },
  { q: "Can I handle multiple on-demand orders at the same time?", a: "Yes. All open orders appear in your dashboard. You can update each order's status independently, there's no limit to how many you can have in progress simultaneously (on Pro)." },
  { q: "What if a customer wants express processing?", a: "Add express processing as an add-on service with its own price. It's attached to the specific order and shown in the customer's receipt." },
]

