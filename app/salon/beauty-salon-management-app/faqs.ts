// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Can I store client hair color formulas in the app?", a: "Yes. Each client profile has a notes field where you can record specific information, including hair color formulas, skin type, allergies, and any preferences your staff should know before the appointment." },
  { q: "How does the booking page work for beauty salons?", a: "Your beauty salon gets a unique URL. Clients visit the page, see your full service menu with prices, and submit a booking inquiry. You review and confirm it from your dashboard, no phone tag required." },
  { q: "Is the app suitable for a home-based beauty studio?", a: "Yes. The free plan is perfect for solo beauticians working from home. Add your services, share your booking link, and manage all your appointments from your phone." },
  { q: "Can I list different services for hair, skin, and nails?", a: "Yes. You can add as many service categories as you offer. The free plan supports up to 5 services, and the Pro plan supports up to 20, enough for most full-service beauty salons." },
]

