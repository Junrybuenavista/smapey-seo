// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Is the official receipt still required in the Philippines?",
    a: "Not as evidence of a sale. Revenue Regulations No. 7-2024, issued 11 April 2024 to implement the Ease of Paying Taxes Act, made the invoice the primary document for sales of goods and of services alike. The official receipt was not abolished, but it was demoted to a supplementary document whose role is to evidence that payment was made. You may still issue one; you may not issue one instead of an invoice.",
  },
  {
    q: "What is an official receipt used for now?",
    a: "Proof of payment, and nothing more. It sits in the same category as a collection receipt or a payment receipt. The practical consequence is that a supplementary document cannot support an input VAT claim, so a VAT-registered customer who receives only an official receipt has paper they cannot use and will come back asking for the invoice.",
  },
  {
    q: "What must be written on an official receipt after RR 7-2024?",
    a: "An official receipt used as a supplementary document must carry the statement \"THIS DOCUMENT IS NOT VALID FOR CLAIM OF INPUT TAX\" on its face. Without it the document is not a valid supplementary receipt and the omission can attract a penalty. Beyond that it carries the usual elements: your registered name, address and TIN, a serial number, the date, who you received the payment from, the amount in words and figures, what it settles, and the mode of payment.",
  },
  {
    q: "Can I still use my unused official receipt booklets?",
    a: "Yes. Unused or unissued official receipts may still be used as supplementary documents until the stock is consumed, provided the phrase \"THIS DOCUMENT IS NOT VALID FOR CLAIM OF INPUT TAX\" is stamped on the face of the document. You do not have to destroy them. What you cannot do is keep issuing them in place of an invoice.",
  },
  {
    q: "What is the difference between an official receipt and a collection receipt?",
    a: "In current practice, very little. Both are supplementary documents under RR 7-2024, both evidence payment rather than the sale, and both need the input-tax statement when used that way. The conventional sequence is that the invoice is issued when the sale is made and the collection receipt when the payment is actually collected, with the collection receipt being optional or issued on the customer's request.",
  },
  {
    q: "Is an acknowledgement receipt the same as an official receipt?",
    a: "No, and the difference matters. An acknowledgement receipt is a general business record confirming that something was received. It is not part of the BIR invoicing framework at all, so it has no standing as a supplementary receipt and should never be offered to a customer who is asking for a document to support a claim. An official receipt, by contrast, is a recognised supplementary document.",
  },
  {
    q: "Do service businesses still issue official receipts?",
    a: "Not as their primary document. Before April 2024, sellers of goods issued a sales invoice and sellers of services issued an official receipt. RR 7-2024 removed that split: a service business now issues an invoice for the sale, and may issue an official receipt alongside it as proof of payment. Issuing only an official receipt for a service is the single most common mistake, because for years it was the correct thing to do.",
  },
  {
    q: "What does a non-VAT official receipt look like?",
    a: "The hierarchy is identical: a non-VAT business issues a non-VAT invoice as its primary document and may issue a non-VAT official receipt as a supplementary one, carrying the same input-tax statement. What differs on the face of the document is that there is no 12% VAT line to separate out, and the invoice should be marked as non-VAT so nobody mistakes the total for a VAT-inclusive figure.",
  },
]
