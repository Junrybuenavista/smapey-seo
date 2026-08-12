// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Can I manage vehicles across different statuses?", a: "Yes. Each vehicle is always in one of three states, Available, Rented, or Maintenance. You can change status manually, and the system updates automatically when a rental is activated or returned." },
  { q: "How does overdue detection work?", a: "When a rental's return date passes and it's still Active, Smapey automatically changes its status to Overdue. You'll see it highlighted on your dashboard so you can follow up with the customer." },
  { q: "Can I see which vehicles earn the most?", a: "Your dashboard shows monthly revenue and rental counts. You can see how much each month has brought in and track trends over time." },
  { q: "How many team members can I add?", a: "Free plan supports 2. Pro supports 5. Enterprise has no limit. All team members have role-based access, owners control everything, members handle day-to-day operations." },
]

