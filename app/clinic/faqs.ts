// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "What is a clinic management system?", a: "A clinic management system is software that helps medical practices track patients, manage doctor schedules, book appointments, and run a patient queue, all in one place instead of spreadsheets and paper logs." },
  { q: "Can I manage multiple doctors in one clinic?", a: "Yes. You can add multiple doctors with individual schedules and specialties. Appointments are assigned to specific doctors, and the queue board shows all active patients per doctor at a glance." },
  { q: "How does the live queue board work?", a: "The queue board is a real-time kanban view with three columns: Waiting, In Consultation, and Done. You can move patients between columns with one click, Confirm, Enqueue, Start, Complete, or mark No Show." },
  { q: "Is this built for a specific clinic type?", a: "Smapey Clinic Manager works for general practice clinics, dental clinics, dermatology offices, pediatric clinics, physiotherapy centers, and any medical practice that manages patient appointments." },
  { q: "How is patient data protected?", a: "Every clinic account is fully isolated, your patient records, appointment history, and doctor data are never visible to other businesses on the platform. Data is encrypted at rest and in transit." },
]

