// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Do customers need to install an app?", a: "No. SMS notifications go directly to their phone number. Customers don't need to download or install anything." },
  { q: "How are ticket numbers generated?", a: "Automatically in YYMMDD-NNN format (e.g., 260518-001), unique per shop per day. You never have to think about numbering again." },
  { q: "What payment methods are supported?", a: "Cash, GCash, Maya, Bank Transfer, and Other. You can record the payment method for each order separately." },
  { q: "Can I disable SMS notifications?", a: "Yes. SMS is an optional feature you can toggle on or off from the admin panel. You stay in full control of when messages are sent." },
]

