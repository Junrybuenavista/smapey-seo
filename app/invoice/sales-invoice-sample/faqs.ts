// Kept out of the "use client" content module so the server page can
// read it directly to emit FAQPage JSON-LD.
export const FAQS: { q: string; a: string }[] = [
  {
    q: "What does a sales invoice look like in the Philippines?",
    a: "At minimum it carries your business name and address, the words identifying you as VAT-registered along with your TIN and branch code, an invoice number, the date, the buyer's details, a line for each item with quantity and unit cost, and the total broken out so the VAT is visible separately from the net amount. The sample on this page shows all of that filled in. Layouts differ between printers, but those elements have to be present wherever they sit on the page.",
  },
  {
    q: "How do I fill up a sales invoice?",
    a: "Work top to bottom. Your own details are usually pre-printed. Fill the date and the buyer's name, address and TIN, then one line per item with quantity, description and unit cost, multiplying out to the amount. Total the lines to get your net sales, compute 12% VAT on that, and add the two for the amount due. Write legibly, do not skip invoice numbers, and keep the customer copy and your file copy identical.",
  },
  {
    q: "Do I need to put the buyer's TIN on every invoice?",
    a: "Not on every one. The buyer's name, address and TIN are required for sales of ₱1,000 or more to a VAT-registered buyer. Below that, or for an ordinary consumer, you can issue without them. In practice many businesses capture the buyer's details anyway, because a customer who later needs to claim input VAT will come back and ask for a corrected invoice, and re-issuing is more work than asking at the counter.",
  },
  {
    q: "How is the VAT computed on a sales invoice?",
    a: "VAT is 12% of the net selling price. In the sample here, three line items total ₱12,780.00 in VATable sales; 12% of that is ₱1,533.60, giving an amount due of ₱14,313.60. The regulation requires the VAT to be shown separately rather than folded into a single figure, so a customer can see exactly what portion is tax.",
  },
  {
    q: "What if I am not VAT-registered?",
    a: "Your invoice must not say VAT-registered, must not show a VAT line, and should be marked as a non-VAT invoice. You show a single total with no tax broken out. This matters more than it sounds: a non-VAT taxpayer who issues a VAT invoice becomes liable for the VAT on that transaction on top of the percentage tax already owed, plus a 50 percent surcharge.",
  },
  {
    q: "Is a sales invoice the same as an official receipt now?",
    a: "No, and the relationship changed in 2024. Under the Ease of Paying Taxes Act and RR 7-2024, the invoice became the primary document for both goods and services, and the official receipt was demoted to a supplementary document that no longer supports a buyer's input VAT claim. If you are still issuing official receipts for services, that is the habit to change.",
  },
  {
    q: "Can I design my own sales invoice?",
    a: "The content is prescribed, the layout largely is not. What you cannot do is print and issue whatever you like: printed invoices come from a BIR-accredited printer under an Authority to Print, and computerised or electronic issuance has its own registration path. Design freedom sits inside those rules, so settle the registration question with your RDO before you commission artwork.",
  },
  {
    q: "What are the most common mistakes on a sales invoice?",
    a: "Four come up repeatedly: folding VAT into one total instead of showing it separately, skipping or reusing invoice numbers, leaving the buyer's TIN blank on a sale where it was required, and a non-VAT business using a template that says VAT-registered. The first three annoy your customer and your bookkeeper. The fourth is the one with a surcharge attached.",
  },
]
