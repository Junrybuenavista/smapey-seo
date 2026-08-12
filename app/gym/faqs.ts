// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Do members need to install an app?", a: "No. Members receive a QR code they can save to their phone or print. No app needed." },
  { q: "Can I track walk-in revenue separately?", a: "Yes. Walk-in revenue is tracked separately from subscription revenue in your dashboard." },
  { q: "What happens when a subscription expires?", a: "Expired members are flagged on your dashboard. You can renew them with one click." },
  { q: "Can I assign different trainers to different members?", a: "Yes. You can assign any active trainer to any member and change assignments anytime." },
]

