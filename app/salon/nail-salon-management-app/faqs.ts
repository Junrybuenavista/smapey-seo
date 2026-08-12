// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Can I track each client's nail preferences?", a: "Yes. Each client profile includes a notes section where you can record preferred nail shape, favorite gel colors, acrylic vs. gel preference, and any sensitivities or allergies." },
  { q: "How does online booking work for nail salons?", a: "Your nail salon gets a unique booking page URL. Clients browse your service menu and submit a booking inquiry with their preferred date, time, and service. You confirm it from your dashboard." },
  { q: "Can I manage multiple nail technicians?", a: "Yes. Add your nail techs as team members and assign appointments to specific individuals. The Pro plan supports up to 5 team members." },
  { q: "Does the app work for home-based nail technicians?", a: "Absolutely. The free plan is ideal for solo nail technicians. Add your services, share your booking link, and manage all appointments from your phone." },
]

