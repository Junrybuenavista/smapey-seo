// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Is the free plan really free forever?", a: "Yes. The Free plan has no time limit and no credit card is required. You can run your laundry shop on it as long as you like." },
  { q: "What happens when I hit 50 orders per month?", a: "You'll be prompted to upgrade to the Pro plan to process more orders. Your existing orders and customer data are never deleted." },
  { q: "Can I upgrade anytime?", a: "Yes. You can upgrade from Free to Pro or Enterprise at any time directly from your dashboard. No data migration required." },
  { q: "Is auto-SMS available on the free plan?", a: "Auto-SMS (triggered automatically when an order status changes) is a Pro feature. The Free plan includes manual SMS sending. You can upgrade anytime to unlock auto-notifications." },
]

