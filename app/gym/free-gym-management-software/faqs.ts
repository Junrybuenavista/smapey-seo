// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Is the free plan really free forever?", a: "Yes. The Free plan has no time limit and no credit card is required. You can run your gym on it as long as you like." },
  { q: "What happens when I hit 50 members?", a: "You'll be prompted to upgrade to the Pro plan to add more members. Your existing data is never deleted." },
  { q: "Can I upgrade anytime?", a: "Yes. You can upgrade from Free to Pro or Enterprise at any time directly from your dashboard." },
  { q: "Is QR code check-in available on the free plan?", a: "QR code check-in is a Pro feature. The Free plan includes manual check-in. You can upgrade anytime to unlock QR check-in." },
]

