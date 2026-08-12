// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "What information does the system store?", a: "It stores patient profiles (name, contact, DOB, notes), doctor records (specialty, schedule, contact), appointment history (dates, doctors, status, chief complaints), and queue logs." },
  { q: "Can I search for a specific patient?", a: "Yes. The patient directory has a real-time search by name or phone number. Results appear as you type, no need to scroll through a long list." },
  { q: "Is appointment history saved permanently?", a: "Yes. Every appointment, including completed and cancelled ones, is retained in your clinic's history. You can filter by date range, doctor, or status." },
  { q: "How is the data backed up?", a: "Your clinic's data is stored in a managed cloud database with regular automated backups. You don't need to manage backups yourself." },
]

