// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "How is this different from other massage booking apps?", a: "Most booking apps are designed for hair salons or general appointments. Smapey is built around what spas actually need, therapist specialties, treatment durations, client intake notes, and deposit collection, without enterprise complexity or pricing." },
  { q: "Can clients book a specific therapist online?", a: "Yes. Your booking page lets clients optionally pick their preferred therapist before submitting the inquiry. The choice flows into your inbox so you can honor it on confirmation." },
  { q: "Do I need to install anything?", a: "No. Smapey runs entirely in the cloud. You sign in from any browser on any device, and your data is always in sync. No app store download, no installs, no IT setup." },
  { q: "Is there really a free plan?", a: "Yes, no expiration, no card required. The free plan supports up to 50 appointments per month, 10 treatments, and 2 therapists. Perfect for a solo therapist or a small studio." },
]

