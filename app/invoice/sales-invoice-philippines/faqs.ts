// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  {
    q: "What is a sales invoice?",
    a: "A sales invoice is the document that records a sale and, since 2024, it is the primary evidence of that sale for Philippine tax purposes — for goods and for services alike. It names the seller and buyer, describes what was sold, shows the amounts with VAT separated out where it applies, and carries a sequential number and a date. Your customer needs it to claim input VAT; you need it as the record the sale ever happened.",
  },
  {
    q: "What is the difference between a charge invoice and a sales invoice?",
    a: "The name describes the payment terms, not a different kind of document. A cash invoice covers a sale paid on the spot, a charge or credit invoice covers one where the customer pays later, and a billing invoice is typically issued as work progresses. All of them are invoices under RR 7-2024. The regulation is explicit on this: renaming a document to Invoice, Cash Invoice, Charge Invoice, Credit Invoice, Billing Invoice or any name describing the transaction is treated as a minor change that does not even require notifying your Revenue District Office.",
  },
  {
    q: "Is a service invoice different from a sales invoice?",
    a: "Only in what it describes. Before 2024, services were documented with an official receipt and goods with a sales invoice. The Ease of Paying Taxes Act removed that split — services are now documented with an invoice too, which many businesses label a service invoice for clarity. Legally it is the same instrument with the same required contents.",
  },
  {
    q: "How do you compute VAT on a sales invoice?",
    a: "VAT is 12% of the net selling price, and it must appear on its own line rather than being folded into the total. If your line items add up to ₱12,780.00, the VAT is 12% of that, ₱1,533.60, and the amount due is ₱14,313.60. If your prices are quoted VAT-inclusive, work backwards instead: divide the gross by 1.12 to get the net, then the difference is the VAT.",
  },
  {
    q: "Is a sales invoice the same as an official receipt?",
    a: "Not any more, and the direction of the change surprises people. The invoice is now the primary document and the official receipt was demoted to a supplementary one. A manual or looseleaf official receipt issued without a stamped 'Invoice' is a supplementary document and cannot be used by your buyer to claim input tax. If you are still issuing official receipts as your main document for services, that is the habit to change.",
  },
  {
    q: "When do I have to issue an invoice?",
    a: "If you are VAT-registered, for every sale regardless of amount. If you are not VAT-registered, for sales of ₱500 or more, and also whenever the buyer asks, at any amount. Since a buyer can always ask, most shops issue one every time rather than judging the threshold mid-transaction.",
  },
  {
    q: "What makes an invoice valid rather than just a piece of paper?",
    a: "The required contents. RR 7-2024 sets them out: the VAT-registered statement with your TIN and branch code, the total payable with VAT shown separately, the date, quantity and unit cost, a description of the goods or nature of the service, and the buyer's name, address and TIN for sales of ₱1,000 or more to a VAT-registered buyer. Miss those and what you have issued is a supplementary document, whatever the heading says.",
  },
  {
    q: "Can I still use my old billing statements?",
    a: "RR 11-2024 allowed Billing Statements, Statements of Account and Statements of Charges to be converted into a Billing Invoice and used until fully consumed, provided they carry the required elements. Those transitional windows ran through 2024, so if you are still holding old stock, ask your RDO rather than assuming — the answer depends on what exactly you are holding and how it was converted.",
  },
]
