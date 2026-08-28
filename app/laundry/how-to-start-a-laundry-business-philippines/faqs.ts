// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  {
    q: "How much capital do I need to start a laundry business in the Philippines?",
    a: "It depends entirely on which of the three models you pick, which is why published figures range from ₱150,000 to over ₱2 million. A small drop-off shop where you do the washing can start near the bottom of that range. A full-service shop with staff and delivery sits in the middle. A self-service laundromat, where customers operate the machines themselves, is the expensive one because you are buying a whole floor of commercial washers and dryers up front. Published startup breakdowns for a standard shop total roughly ₱165,000 to ₱645,000 including permits, deposit, renovation, equipment, supplies and working capital.",
  },
  {
    q: "What permits do I need for a laundry shop?",
    a: "The usual set is DTI registration for a sole proprietorship (or SEC for a partnership or corporation), a Barangay Business Clearance, a Mayor's or Business Permit, BIR registration for your Certificate of Registration and official receipts, a Sanitary Permit from your local health office, a Fire Safety Inspection Certificate, and an Occupancy Permit for the space. You will also be asked for a Cedula and your contract of lease or proof of ownership. Budget roughly ₱5,000 to ₱20,000 for the paperwork, though every LGU sets its own schedule of fees.",
  },
  {
    q: "Are there sanitation rules specific to laundry shops?",
    a: "Yes, and most guides skip them. Public laundries have their own chapter in the Code on Sanitation of the Philippines, Presidential Decree 856, Chapter V, with its own implementing rules covering the sanitary permit, how the premises must be built, how soiled and clean linen must be kept apart, and wastewater. The wastewater requirement is the one that catches people out: laundries are expected to run an approved treatment process rather than discharge straight to a drain. Confirm what applies to your size and location with your City or Municipal Health Office before you sign a lease.",
  },
  {
    q: "Do I need a DENR permit for a laundry shop?",
    a: "You might. Under DENR Administrative Order 2016-08, establishments identified as requiring a wastewater discharge permit have to secure one, and where no public sewerage system is available the shop is expected to install its own onsite treatment with effluent meeting DENR standards. Whether this applies to a small shop or only to larger operations depends on your volume and your location, so ask your local DENR office rather than assuming you are exempt.",
  },
  {
    q: "How much do commercial washing machines cost?",
    a: "Published ranges put commercial washing machines at roughly ₱55,500 to ₱102,500 and dryers at ₱22,000 to ₱88,750, with top-load machines typically costing around half of an equivalent front-load. Most small shops run up to about five washers with matching dryers. Commercial machines are generally rated for something like 10 to 14 years or roughly 5,000 cycles, so treat them as a long-lived asset rather than a yearly expense.",
  },
  {
    q: "Is a laundry business profitable in the Philippines?",
    a: "It can be, but electricity is the line that decides it. One published worked example for a laundromat-scale shop shows about ₱120,000 in monthly gross revenue against roughly ₱65,000 in costs, of which ₱20,000 is electricity alone, leaving about ₱55,000 profit. On a ₱2.5 million laundromat build that implies a payback of a little under four years. A smaller drop-off shop has far lower revenue but also far lower capital at risk, so it usually pays back faster in percentage terms.",
  },
  {
    q: "Should I buy a laundry franchise or start independently?",
    a: "A franchise buys you a brand, a fit-out and a supplier relationship, and Philippine laundry franchise packages have been published in the ₱1.8 million to ₱2.4 million range with franchise fees from ₱100,000 to ₱350,000 depending on the brand. Starting independently costs a fraction of that but you source your own machines, build your own name, and make your own mistakes. If your capital is under a few hundred thousand pesos, the decision is usually made for you.",
  },
  {
    q: "How do I keep track of orders once the shop is busy?",
    a: "Most shops start with a notebook and a whiteboard, and it works until roughly the point where two customers arrive at once with similar bags. From there you want a claim stub on every drop-off, a status you can update as the load moves from washing to drying to folding to ready, and a record of who has paid. Smapey Laundry does exactly that, including a QR claim stub the customer can scan to check their own status, and it is free for up to 50 orders a month.",
  },
]
