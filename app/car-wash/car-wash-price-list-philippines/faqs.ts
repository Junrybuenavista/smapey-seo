// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD. Every figure here matches the
// typical price table on the page, which matches the board the app seeds.
export const FAQS: { q: string; a: string }[] = [
  {
    q: "How much is a car wash in the Philippines?",
    a: "On the price lists Philippine car washes have published, a plain wash averaged ₱130 for a sedan or hatchback, ₱160 for an SUV, AUV or MPV, ₱190 for a pick-up and ₱230 for a van. Most of those lists date from 2020. A 2023 Moneymax guide put a car wash at ₱200 to ₱500 per car, so many shops charge more today.",
  },
  {
    q: "How much is a motor wash?",
    a: "On the published lists that priced motorcycles, a motor wash averaged ₱110, and a big bike came out at the same ₱110 once rounded. None of the lists priced a motorcycle wash and wax or a chain clean and lube, so there is no typical figure for those.",
  },
  {
    q: "How much is a car wash with wax?",
    a: "Wax is usually sold on top of a wash. Taken as each shop's wash-and-wax price minus its own wash price, wax averaged ₱410 for a sedan, ₱490 for an SUV, ₱590 for a pick-up and ₱820 for a van, so a wash and wax for a sedan comes to about ₱540 in total.",
  },
  {
    q: "How much does interior detailing cost?",
    a: "Interior detailing averaged ₱3,000 for a sedan, ₱3,800 for an SUV, ₱4,100 for a pick-up and ₱4,700 for a van, from four shop quotes in Marikina, Quezon City and Rizal reported in 2020. A 2023 Moneymax guide gave a wider range for auto detailing, ₱2,000 to ₱15,000 per car, since full detailing covers far more than the interior.",
  },
  {
    q: "Why does the price depend on the vehicle size?",
    a: "A bigger vehicle has more surface to wash and dry, uses more water and soap, and keeps a washer busy for longer. Most shops group vehicles into a few sizes, commonly sedan or hatchback, SUV, AUV or MPV, pick-up, and van, and set one price per size.",
  },
  {
    q: "Can I make a price list tarpaulin from my prices?",
    a: "Yes. Our free car wash tarpaulin maker turns your prices by vehicle size into a print-ready tarpaulin, from 2 × 3 ft to 4 × 3 ft or A4, with no sign-up. In Smapey Carwash, the price board prints the same tarpaulin straight from your own prices, on every plan.",
  },
]
