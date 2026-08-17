// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Can I use this app for a laundry shop in any city or barangay in the Philippines?", a: "Yes. LaundryOS works for any local laundry shop, whether you're in Metro Manila, Cebu, Davao, or any province. No location restrictions." },
  { q: "How do nearby customers get notified when their laundry is ready?", a: "Two ways, and neither needs an app. They receive an SMS when you mark their order ready, and they can scan the QR code on their printed claim stub at any time to see which stage their laundry is at and what they owe." },
  { q: "Do I need internet to use the app?", a: "Yes, LaundryOS is a cloud-based web app. You'll need an internet connection to accept orders and send SMS notifications. Any smartphone or tablet with internet access works." },
  { q: "Can I track multiple orders for customers in the same neighborhood?", a: "Yes. Each order has its own ticket number and status. You can have dozens of open orders at once and see all of them in your dashboard." },
]

