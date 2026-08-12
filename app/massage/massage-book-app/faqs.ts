// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Is this really a digital replacement for a paper massage book?", a: "Yes. Every appointment your team takes lives in one shared, searchable book, with the client's name, treatment, therapist, time, and notes. Unlike paper, it's visible to everyone with access and backed up automatically." },
  { q: "How long does it take to switch from a paper book?", a: "Most small spas finish their setup in under 10 minutes, add your treatments, your therapists, and a couple of clients. You can keep using paper alongside the app for a week if you'd like to ease in." },
  { q: "What if my internet goes down at the front desk?", a: "Once a page is loaded, you can keep viewing it. The app syncs as soon as you reconnect. For most small spas the bigger risk is losing a paper book, and that's the problem this app solves." },
  { q: "Can multiple staff see the same massage book?", a: "Yes. Add team members to your account and everyone sees the same up-to-the-minute book. Permissions decide who can edit, view, or add bookings, no more arguments over who wrote what." },
]

