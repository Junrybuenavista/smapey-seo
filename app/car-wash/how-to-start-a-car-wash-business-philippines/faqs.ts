// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD. Every figure is sourced on the page.
export const FAQS: { q: string; a: string }[] = [
  {
    q: "How much capital do I need to start a car wash in the Philippines?",
    a: "It depends mostly on whether you rent a space that is already paved or build your own. A 2023 Moneymax guide gave a starter budget of ₱106,000 for a rented space: ₱40,000 rent, ₱30,000 of equipment, ₱25,000 for two workers, and smaller amounts for supplies, water, electricity and marketing. That is one month of running costs plus equipment, with nothing for permits, a deposit or building work. Building a three-bay hand wash with a steel canopy, drains, an office and a silt and oil interceptor came to about ₱1.6 million to ₱2.7 million in building works alone on AEDO Construction's 2026 planning rates, before land and equipment.",
  },
  {
    q: "What permits does a car wash need?",
    a: "The usual set is a DTI business name registration (or SEC for a partnership or corporation), a barangay clearance, the Mayor's or Business Permit, BIR registration and a Fire Safety Inspection Certificate. A car wash adds a wastewater discharge permit from the DENR Environmental Management Bureau, with the ECC or Certificate of Non-Coverage the application asks for. If you build, you need a building permit, and if you draw your own groundwater, a water permit. The order varies by LGU.",
  },
  {
    q: "Does a car wash need a DENR discharge permit?",
    a: "If wash water leaves your lot, yes. Section 14 of the Clean Water Act (RA 9275) requires a permit to discharge, and the implementing rules (DAO 2005-10, Rule 14.1) say anyone discharging wastewater into Philippine waters or land must get a wastewater discharge permit from the EMB Regional Office. A first application needs an engineer's report. Discharging without a permit carries fines of ₱10,000 to ₱200,000 for every day of violation under Section 28.",
  },
  {
    q: "What equipment do I need to start a car wash?",
    a: "A typical starter list is high-pressure washers, hoses, a foam cannon, buckets, brushes and sponges, wheel and tire brushes, car shampoo, microfiber cloths and drying towels, an air blower, glass cleaner, vacuum cleaners, upholstery cleaner, a two-step ladder, a polisher, and wax with applicators. Price it from supplier quotes: brands and second-hand units vary too much for a single range to be honest. Moneymax's 2023 example put equipment such as a pressure washer at ₱30,000.",
  },
  {
    q: "How much water does a car wash use?",
    a: "The best published per-car figures come from the US EPA: about 57 litres per vehicle for hand-held wand washing, which is closest to a Philippine hand wash with a pressure washer, and about 170 litres for an in-bay automatic. That is roughly 5.7 cubic metres for every 100 cars washed by hand. They are American figures, so check your own meter in the first week.",
  },
  {
    q: "Is a car wash business profitable in the Philippines?",
    a: "It can be, and the location decides most of it. A 2023 Moneymax guide estimated a net income of around ₱35,000 a month, depending on the size of the car wash. Treat that as an example, not a forecast: work out your own numbers from your rent, your prices and how many cars actually pass your lot.",
  },
  {
    q: "How should I pay my car wash crew?",
    a: "You can pay a daily rate, a share of each car, or a mix. Whichever you choose, the Labor Code sets a floor: workers paid by results, including piecework, pakyaw, takay or task basis, must receive at least the prescribed minimum wage for eight hours of work a day, or a proportion of it for less. A share-per-car scheme still has to reach the regional minimum wage on a full day.",
  },
]
