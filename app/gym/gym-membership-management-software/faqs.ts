// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "How does expiry tracking work?", a: "When you assign a membership plan to a member, GymOS calculates the expiry date automatically. Expired members are flagged on your dashboard the moment their plan ends." },
  { q: "Can I have different membership tiers?", a: "Yes. You can create as many plans as you need (day passes, monthly, quarterly, annual, or any custom duration) each with its own price." },
  { q: "What happens when a member's subscription expires?", a: "The member is automatically marked as expired and flagged on your dashboard. You can renew them with a single click." },
  { q: "Can staff renew memberships without admin access?", a: "Yes. You can grant staff the ability to renew memberships without giving them full admin access to your gym account." },
]

