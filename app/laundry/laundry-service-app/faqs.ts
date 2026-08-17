// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Does the laundry service app work for pickup and delivery?", a: "You can run a pickup-and-delivery service with it today by recording the address and instructions in the order notes and charging the delivery fee as an add-on. Dedicated delivery features - a separate address field, rider assignment, and in-transit statuses - are not in the product yet. The order pipeline covers what happens inside the shop: Received, Washing, Drying, Folding, Ready, and Released." },
  { q: "Can customers check their order status on their own?", a: "Yes. Every order gets a printed claim stub with a QR code. The customer scans it and sees which stage their laundry is at and what they owe - no account, no app, no calling your shop. They're also notified by SMS when you accept the order and when it's ready." },
  { q: "How do I handle orders with multiple service types?", a: "You can attach add-ons to any order. For example, a Wash Dry Fold order can include a fabric conditioner add-on at a separate price." },
  { q: "Is there a limit to how many orders I can process per day?", a: "On the Free plan, you can process up to 50 orders per month. The Pro plan removes this limit entirely." },
]

