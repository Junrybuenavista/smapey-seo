// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Does Smapey require any software installation?", a: "No. Smapey is entirely browser-based, you access it at smapey.com from any device. There's nothing to download or install." },
  { q: "Can multiple staff members use it at the same time?", a: "Yes. Smapey is a multi-user online system. You can invite vets, receptionists, and admin staff (each with their own login) and they can all work simultaneously on the same live data." },
  { q: "Is the data stored securely online?", a: "All data is stored in a secure cloud database. Your clinic's records are isolated from other organizations, and you don't need to manage any local backups." },
  { q: "Can I access it from a phone?", a: "Yes. The interface is responsive and works on mobile browsers. Staff can check the queue board, update appointment status, or look up a pet record from a smartphone." },
  { q: "Is there a free plan?", a: "Yes, Smapey's free plan lets you get started with no credit card required. You can manage pets, appointments, vaccinations, and billing at no cost." },
]

