// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "What makes Smapey the best Airbnb management software for small hosts?", a: "Smapey focuses on what independent hosts actually need: a place to track their properties, guests, and bookings without paying for features built for hotel chains. It's free to start, simple to set up, and covers double-booking protection, payment tracking, and revenue analytics out of the box." },
  { q: "How does Smapey compare to channel managers?", a: "Channel managers sync your calendar across Airbnb, Booking.com, and other OTAs automatically. Smapey doesn't sync channels, instead, it's a single dashboard where you manually log each reservation after it's confirmed, regardless of which platform it came from. It's best for hosts who prefer a lightweight, centralized record over automated multi-platform sync." },
  { q: "Is there a free plan?", a: "Yes. The free plan includes 2 properties, 10 reservations per month, and the full analytics dashboard, no credit card required." },
  { q: "Can I upgrade later?", a: "Yes. Start on the free plan and upgrade to Pro (10 properties, 3 team users, unlimited reservations) or Enterprise (unlimited everything) whenever your portfolio grows." },
]

