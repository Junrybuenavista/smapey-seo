// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "What does Airbnb management software actually do?", a: "It replaces the spreadsheets and manual notes most hosts use to track their properties, guests, and bookings. Good software centralizes reservation creation, check-in/check-out status, payment tracking, and revenue reporting in one dashboard." },
  { q: "Is Smapey only for Airbnb listings?", a: "No. Smapey tracks bookings from any source, Airbnb, Booking.com, Agoda, Direct, Facebook, Referral, or Other. It's useful for any short-term or transient rental host regardless of where their bookings come from." },
  { q: "How does Smapey prevent double bookings?", a: "When you create a reservation, the system checks whether the chosen property has any confirmed overlapping bookings for those dates. If a conflict exists, the booking is blocked before it saves." },
  { q: "Can I start for free?", a: "Yes. The free plan includes 2 properties, 10 reservations per month, and full access to the dashboard, no credit card, no trial expiry." },
]

