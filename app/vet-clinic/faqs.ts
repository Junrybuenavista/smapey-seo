// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "What is a veterinary clinic management system?", a: "A veterinary clinic management system is software that helps animal clinics track pet records, manage vet schedules, book appointments, run a patient queue, record vaccinations, and generate billing, all in one place instead of spreadsheets and paper cards." },
  { q: "Can I manage multiple veterinarians?", a: "Yes. You can add multiple vets with individual schedules and specialties. Appointments are assigned to specific vets, and the queue board shows all active pets per vet at a glance." },
  { q: "How does vaccination tracking work?", a: "When you log a vaccination for a pet, you record the vaccine name, date given, and the next due date. The dashboard shows all upcoming vaccinations within 30 days so you can call owners before it's overdue." },
  { q: "Can I generate bills after each visit?", a: "Yes. Create an itemized bill with line items, quantities, and unit prices, consultation fee, medicines, procedures. Record partial or full payments via Cash, GCash, Maya, Card, or Bank Transfer." },
  { q: "What types of animals does it support?", a: "Pet profiles include a species and breed field, so it works for dogs, cats, birds, reptiles, and any other animal your clinic treats. There are no restrictions on species." },
  { q: "Is there a free plan?", a: "Yes. The free plan lets you run a small vet clinic with core features (pet records, appointment booking, live queue, vaccination tracking, and billing) at no cost." },
]

