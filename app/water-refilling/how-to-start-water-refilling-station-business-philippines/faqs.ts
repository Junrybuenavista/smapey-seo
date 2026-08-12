// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  {
    q: "How much capital do I need to start a water refilling station in the Philippines?",
    a: "Most small stations start between ₱150,000 and ₱500,000 depending on the purification system (reverse osmosis vs. mineral), the number of containers, store rental, and whether you buy a ready-made business package. You can start lean and expand as demand grows.",
  },
  {
    q: "Is a water refilling station business profitable?",
    a: "Yes, it's a low-cost, repeat-purchase business. Customers buy water every week, and a single round (5-gallon) container costs a few pesos to produce and sells for ₱20–₱30. The key to profit is volume, controlling container losses, and collecting on time, which is exactly what management software helps with.",
  },
  {
    q: "What permits do I need?",
    a: "Typically a DTI or SEC registration, a Mayor's / Business Permit, a Sanitary Permit and water potability test from your LGU and the Department of Health, a Barangay Clearance, and BIR registration. Requirements vary per LGU, so confirm with your local city/municipal hall.",
  },
  {
    q: "Should I buy a franchise or build my own?",
    a: "A franchise or business package gives you proven equipment and a brand but costs more upfront and may include royalties. Building your own is cheaper and more flexible. Either way, you'll still need a system to run daily operations, deliveries, customers, containers, and cash.",
  },
  {
    q: "How do I keep track of my containers and deliveries?",
    a: "This is where most stations struggle. Smapey Water is free to start and tracks every delivery order, how many containers each customer is holding, your filled stock and empties, plus payments, all from your phone or computer.",
  },
]

