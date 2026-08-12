// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Is Smapey really the best car rental software for small operators?", a: "It's built specifically for small to mid-sized rental businesses. You get fleet tracking, reservation management, overdue detection, and revenue dashboards, without paying for features you don't need." },
  { q: "How is it different from generic rental tools?", a: "Smapey is purpose-built for car rental, not a generic service booking tool. Every feature (vehicle status, return date tracking, maintenance flags) is designed around how a rental business actually works." },
  { q: "Can I try it before paying?", a: "Yes. The free plan gives you up to 5 vehicles and 20 rentals per month with no credit card required. Upgrade when you're ready to grow." },
  { q: "Does it handle deposits?", a: "Yes. Each rental has a deposit amount field so you can track what's been collected before a vehicle leaves the lot." },
]

