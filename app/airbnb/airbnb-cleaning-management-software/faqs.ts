// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Does Smapey have a dedicated cleaning schedule feature?", a: "Not as a standalone module, Smapey tracks cleaning through the reservation lifecycle. When a reservation is Checked Out, the property needs a turnover. The Checked Out filter and Staff Notes cover most cleaning coordination without a separate schedule tool." },
  { q: "How do I track which properties have been cleaned?", a: "Use the Staff Notes field on the outgoing reservation to log cleaning completion. When the next reservation is confirmed ready, your team knows the unit is prepared. For multi-property operations, filter by Checked Out status daily to see the full turnover queue." },
  { q: "Can I give my cleaner access to the dashboard?", a: "Yes. On Pro and Enterprise plans, add team members with limited permissions. Role-based access means your cleaner can see reservation notes and dates without touching billing or guest financial records." },
  { q: "What happens between a checkout and the next check-in?", a: "The reservation status sits at Checked Out until the next reservation is created. The upcoming check-in on the dashboard shows you the gap, and the Staff Notes field on both reservations is where you coordinate the turnover." },
]

