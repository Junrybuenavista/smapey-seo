// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Is there really a free plan?", a: "Yes. The free plan includes up to 2 properties, 10 reservations per month, and the full dashboard, no credit card required, no trial timer. Upgrade only when your portfolio grows." },
  { q: "Is there a calendar view of my bookings?", a: "Yes. The availability calendar shows all your properties as rows and the days of the month as columns, with color-coded bars for booked, checked-in, and completed stays. Click any empty day to create a booking for that property and date, or click a bar to check the guest in or out." },
  { q: "Does it actually prevent double bookings?", a: "Yes. When you create a reservation, the system checks whether the selected property has any overlapping confirmed bookings for those dates. If a conflict is found, the reservation is blocked before it's saved." },
  { q: "Can I track bookings from Airbnb and Booking.com separately?", a: "Yes. Every reservation has a source field: Airbnb, Booking.com, Agoda, Direct, Facebook, Referral, or Other. You can filter by source and see which channels bring in the most revenue." },
  { q: "How does payment tracking work?", a: "Every reservation has a payment ledger. Record each payment as it comes in (a GCash deposit today, the cash balance at check-in) with the amount, method, and date. Smapey totals the ledger, shows the remaining balance, and sets the status to Unpaid, Partial, or Paid automatically." },
  { q: "Can I manage multiple properties from one account?", a: "Yes. The Pro plan supports up to 10 properties and the Enterprise plan is unlimited. Each property has its own listing, photos, and pricing, and all reservations flow into a single shared calendar and dashboard." },
]

