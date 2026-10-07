// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Do I need an LTFRB franchise for a car rental business in the Philippines?",
    a: "It depends on one thing: whether you supply a driver. A self-drive rental, where the renter drives, is a private vehicle on hire rather than a public utility vehicle, so no LTFRB franchise is required. The moment you provide a driver for compensation you are carrying passengers for hire, which needs authority from the LTFRB. The distinction is the driver, not the vehicle and not how the booking was made.",
  },
  {
    q: "What does colorum mean for a car rental operator?",
    a: "Operating a for-hire passenger service without the authority the LTFRB requires. In practice it is what happens when an operator supplies a driver on a privately registered vehicle and assumes the private registration covers it. The consequences include impoundment of the vehicle and substantial fines, and the operator can be barred from future applications. Confirm the current penalty schedule with the LTFRB rather than relying on a figure found online, since the amounts are revised.",
  },
  {
    q: "What permits do I need for a self-drive car rental business?",
    a: "The ordinary business set plus two things specific to the trade. Register with DTI for a sole proprietorship or SEC for a corporation, then obtain a barangay clearance, a mayor's or business permit, and BIR registration for your Certificate of Registration and invoices. Beyond that, keep the vehicles properly LTO-registered with current OR/CR, and carry insurance that the insurer knows is covering a rented vehicle, since a private-use policy may not respond to a rental claim.",
  },
  {
    q: "What is Tourist Rent-a-Car Transport Service?",
    a: "A defined LTFRB classification for rent-a-car services that supply a driver, and the route most small operators take rather than a public route franchise. It requires a Certificate of Public Convenience, and two features catch applicants out: there are vehicle standards covering class, engine displacement and age, so an ordinary family car may not qualify; and the Department of Tourism endorses the application and then accredits the operator annually. The classifications sit in LTFRB Memorandum Circular 2008-009, which consolidated several earlier issuances.",
  },
  {
    q: "Is a car rental business profitable in the Philippines?",
    a: "It is a utilisation business rather than a margin business, so the figure that decides it is the share of days each vehicle is actually rented. Work out the full monthly cost of owning the vehicle — amortisation or the opportunity cost of the capital, insurance, scheduled maintenance and your own time — then divide by your daily rate to get the number of rented days per month you need simply to break even. Compare that against bookings you can realistically expect, not against a full month.",
  },
  {
    q: "What insurance does a rental car need?",
    a: "CTPL is the legal minimum, but it protects other people rather than your vehicle, which is the asset at risk. Comprehensive cover is what protects the car itself. The important part is disclosure: tell the insurer the vehicle is being rented out. A policy written for private use may not respond to a claim that arises while the car is on hire, which is the worst possible moment to discover the distinction.",
  },
  {
    q: "Do I need a written rental agreement every time?",
    a: "Yes, and it is the single cheapest protection in the business. The agreement establishes who held the vehicle, over what period, at what rate, and who is responsible for fuel, damage and traffic violations. Pair it with photographs of the vehicle at handover and return, with the odometer and fuel gauge visible, because almost every dispute in this trade is about a dent nobody can date.",
  },
]
