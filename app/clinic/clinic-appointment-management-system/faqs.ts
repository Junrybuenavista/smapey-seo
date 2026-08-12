// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "What is a clinic appointment management system?", a: "It's software that handles the full lifecycle of a clinic appointment, from booking and doctor assignment through to completion or cancellation. It replaces paper appointment books and scattered spreadsheets." },
  { q: "Can I filter appointments by doctor or date?", a: "Yes. The appointments page lets you filter by doctor, date, status, or search by patient name, so you always find exactly what you need." },
  { q: "What statuses can an appointment go through?", a: "Appointments move through: Pending → Confirmed → In Queue → In Progress → Completed. You can also mark a patient as Cancelled or No Show at any stage." },
  { q: "How many appointments can I manage per month?", a: "The free plan includes a monthly appointment limit. Pro and Enterprise plans have higher or unlimited appointment quotas, check the pricing section above." },
]

