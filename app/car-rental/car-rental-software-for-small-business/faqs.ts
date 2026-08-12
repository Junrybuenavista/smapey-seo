// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Is this really built for small businesses?", a: "Yes. Smapey was built for small to mid-sized operators who need fleet management without paying for enterprise software. The free plan covers up to 5 vehicles and 20 rentals a month, enough to start." },
  { q: "How long does it take to set up?", a: "Most users have their fleet added and first rental created within 10 minutes. There's no complex configuration, just add your vehicles, register your customers, and start renting." },
  { q: "Do I need to hire a developer or IT person?", a: "No. Smapey is a web app you access from any browser. No installation, no servers, no technical setup required." },
  { q: "Can I cancel anytime?", a: "Yes. There are no long-term contracts. You can upgrade, downgrade, or cancel your plan at any time from the billing page." },
  { q: "What if my fleet grows beyond the free plan?", a: "Upgrade to Pro (up to 30 vehicles, unlimited rentals) or Enterprise (unlimited everything) anytime. Your data stays intact when you upgrade." },
]

