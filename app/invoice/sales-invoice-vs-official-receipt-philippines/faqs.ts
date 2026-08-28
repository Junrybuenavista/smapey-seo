// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  {
    q: "What is the difference between a sales invoice and an official receipt now?",
    a: "Since the Ease of Paying Taxes Act (RA 11976) and Revenue Regulations No. 7-2024, the invoice is the primary document for a sale, whether you sold goods or rendered a service. The official receipt was demoted to a supplementary document. The practical consequence is the one that matters: an official receipt is no longer valid support for a buyer claiming input VAT. If your customer needs to claim input tax, they need an invoice from you.",
  },
  {
    q: "Do I still need to issue an official receipt for services?",
    a: "No. That is the change most business owners missed. Before RA 11976, services were documented with an official receipt and goods with a sales invoice. Now both are documented with an invoice. You may still issue an official receipt as a supplementary document if it suits your workflow, but it does not replace the invoice and it will not support your customer's input VAT claim.",
  },
  {
    q: "When am I required to issue an invoice?",
    a: "It depends on your registration. A VAT-registered taxpayer must issue an invoice for every sale, regardless of the amount. A non-VAT taxpayer must issue one for transactions valued at ₱500 or more, and must also issue one whenever the buyer asks, no matter how small the sale. Because the buyer can always ask, most shops find it simpler to issue one every time.",
  },
  {
    q: "What has to be printed on a valid invoice?",
    a: "Section 3(B) of RR 7-2024 lists the required contents: a statement that the seller is VAT-registered together with the seller's TIN and branch code, the total amount payable with the VAT shown separately, the date of the transaction, the quantity and unit cost, a description of the goods or the nature of the service, and, for sales of ₱1,000 or more to a VAT-registered buyer, the buyer's name, address and TIN. Transactions that are VAT-exempt or zero-rated must be labelled as such on the face of the invoice.",
  },
  {
    q: "What happened to my unused official receipts?",
    a: "The transition ran through 2024. RR 11-2024 allowed unused official receipts to be converted by striking through the words 'Official Receipt' and stamping 'Invoice' on them. Official receipts kept in use as supplementary documents had to be stamped 'THIS DOCUMENT IS NOT VALID FOR CLAIM OF INPUT TAX'. Those windows have long closed, so if you are still holding unconverted booklets, ask your RDO what to do with them rather than issuing from them.",
  },
  {
    q: "What is the penalty for issuing the wrong document?",
    a: "The one worth knowing is for a non-VAT taxpayer who issues a VAT invoice. Under the Tax Code they become liable for the VAT under Section 106 or 108 on that transaction, in addition to any percentage tax they already owe, plus a 50 percent surcharge. That is an expensive mistake for a small business, and it usually happens by accident when someone reuses a template or an old printed booklet.",
  },
  {
    q: "Does the invoice have to be printed, or can it be electronic?",
    a: "Both exist. Printed invoices come from a BIR-registered printer under an Authority to Print, and electronic invoicing is being rolled out under its own rules. Which applies to you depends on your registration and your RDO, so confirm before you commit to a system. Whichever route you take, the required contents in RR 7-2024 are the same.",
  },
  {
    q: "Can software issue BIR-compliant invoices for me?",
    a: "Software can build the document, number it in sequence, keep the running record and stop you leaving a required field blank, and Smapey Invoice does that. What software cannot do is register you, secure your Authority to Print, or accredit a system with your RDO. Treat the tool as the thing that keeps you consistent once your registration is in order, not as a substitute for it.",
  },
]
