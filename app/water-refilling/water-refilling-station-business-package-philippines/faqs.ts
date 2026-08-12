// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  {
    q: "How much does a water refilling station business package cost in the Philippines?",
    a: "Packages typically range from ₱150,000 for a basic setup to ₱500,000+ for a complete mineral + purified station with delivery. Price depends on the purification technology, daily output capacity, number of containers, and whether installation and training are included.",
  },
  {
    q: "What's usually included in a package?",
    a: "Most packages bundle the purification system (RO and/or mineral), storage tanks, a filling and sealing station, an initial set of containers, plumbing and installation, basic training, and sometimes signage. Always confirm exactly what's included before paying.",
  },
  {
    q: "Is a package better than buying equipment separately?",
    a: "A package is convenient and gets you running fast with matched, installed equipment and support. Buying separately can be cheaper and more flexible if you know what you're doing. Either way, the package rarely includes a system to manage daily operations, that's something you add.",
  },
  {
    q: "Does a business package include software to run the station?",
    a: "Almost never. Packages cover equipment, not operations. That's why owners pair their station with Smapey Water (free to start) to track deliveries, containers, stock, and payments from day one.",
  },
]

