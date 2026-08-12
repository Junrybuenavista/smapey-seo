// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  { q: "What does water refilling station software actually do?", a: "It replaces the notebook. Smapey tracks every delivery order, how many gallons you have in stock, how much each customer owes, and (the tricky part) how many of your containers each customer is still holding. It also handles payments and a simple revenue dashboard." },
  { q: "How does container deposit tracking work?", a: "Every customer has a running count: containers you've lent out minus containers they've returned. When you deliver gallons, the count goes up; when they return empties (on the Returns page or with a delivery), it goes down. You always know who is holding your bottles." },
  { q: "What happens to empty containers when they come back?", a: "Returned empties lower the customer's outstanding count but don't become sellable stock until they're refilled. Smapey shows an 'Empties on Hand' number, and a one-click Refill turns them back into filled, sellable gallons." },
  { q: "Do my customers need to install an app?", a: "No. Customers don't need anything. Optional SMS notifications go straight to their phone number when a delivery is on the way." },
  { q: "Can I use it on my phone during deliveries?", a: "Yes. Smapey runs in any web browser on your phone, tablet, or computer, nothing to download. Your rider can update order status from the road." },
  { q: "Is there a free plan?", a: "Yes. The Free plan lets you run a small station at no cost with no credit card. Upgrade to Pro only when you outgrow the limits." },
]

