// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Is the free plan really free forever?", a: "Yes. The Free plan has no time limit and no credit card is required. You can run your laundry shop on it as long as you like." },
  { q: "What happens when I hit 50 orders per month?", a: "You'll be prompted to upgrade to the Pro plan to process more orders. Your existing orders and customer data are never deleted." },
  { q: "Can I upgrade anytime?", a: "Yes. You can upgrade from Free to Pro or Enterprise at any time directly from your dashboard. No data migration required." },
  { q: "Is SMS included in the free plan?", a: "No. The Free plan doesn't include SMS credits - the Pro plan includes 1,000, and you can top up a prepaid balance on any plan. What you do get free is printed claim stubs with a QR code, so customers check their own laundry status without you texting or answering calls." },
  { q: "What do I actually get on the free plan?", a: "Up to 50 orders a month with the full order pipeline, customer profiles and history, per-kilo pricing with minimum weights, payment recording for Cash, GCash, Maya and Bank Transfer, printable claim stubs, customer QR order tracking, ticket editing with an audit trail, and the shop dashboard." },
]
