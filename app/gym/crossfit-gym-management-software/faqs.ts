// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Is this built specifically for CrossFit gyms?", a: "GymOS works for any gym type, including CrossFit boxes. Features like drop-in tracking, QR check-in, and coach assignment map directly to how CrossFit boxes operate." },
  { q: "Can I track drop-in athletes separately from members?", a: "Yes. Walk-in/drop-in visits are tracked separately from subscriptions, with their own revenue line in your dashboard." },
  { q: "Do athletes need to download an app?", a: "No. Athletes receive a personal QR code they can save to their phone or print. No app install required." },
  { q: "Can I assign coaches to specific athletes?", a: "Yes. You can assign any active coach to any member and update assignments anytime." },
]

