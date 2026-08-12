// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  {
    q: "What should a water refilling station business plan include?",
    a: "An executive summary, company description, market analysis, products and pricing, an operations plan, a marketing plan, a management/system plan, and financial projections with startup costs, monthly expenses, and a break-even estimate.",
  },
  {
    q: "How do I project revenue for a water refilling station?",
    a: "Estimate average daily refills (store + delivery) × your price per gallon × operating days. For example, 120 refills/day × ₱25 × 26 days ≈ ₱78,000/month. Adjust for your area's demand and competition, and grow the number as you add delivery routes.",
  },
  {
    q: "What's the break-even point for a water station?",
    a: "With ₱250,000 startup and roughly ₱30,000–₱45,000 monthly net profit, many stations break even within 8–18 months. Container losses and unpaid balances are the biggest hidden drains, so tracking them tightly speeds up break-even.",
  },
  {
    q: "What management system should I put in the plan?",
    a: "Include software for daily operations. Smapey Water (free to start) handles deliveries, container deposits, returns, inventory, and payments, a concrete, low-cost line item that strengthens the operations section of your plan.",
  },
]

