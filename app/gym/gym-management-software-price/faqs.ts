// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Is the free plan really free forever?",
    a: "Yes. The Free plan has no time limit. You can run your gym on it as long as you like. Upgrade only when you need more capacity.",
  },
  {
    q: "Are there any hidden fees?",
    a: "No. The price you see is what you pay. No setup fees, no per-member fees, no surprise charges.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes. Cancel anytime from your dashboard. You keep access until the end of your billing period.",
  },
  {
    q: "Do you offer annual billing?",
    a: "Monthly billing is available now. Annual plans with a discount are coming soon, contact us if you need one today.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept PayPal worldwide. For Philippine customers, we also accept GCash, QR Ph, and card payments via PayMongo.",
  },
]

