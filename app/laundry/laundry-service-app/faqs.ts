// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "Does the laundry service app work for pickup and delivery?", a: "Yes. You can add delivery addresses and notes per order. The status pipeline tracks whether an order is at the shop, in transit, or delivered." },
  { q: "Can customers check their order status on their own?", a: "Customers are notified by SMS at key stages, when you accept their order and when it's ready. They don't need an account or app." },
  { q: "How do I handle orders with multiple service types?", a: "You can attach add-ons to any order. For example, a Wash Dry Fold order can include a fabric conditioner add-on at a separate price." },
  { q: "Is there a limit to how many orders I can process per day?", a: "On the Free plan, you can process up to 50 orders per month. The Pro plan removes this limit entirely." },
]

