import { Metadata } from "next"
import GoogleDocsInvoiceContent from "./GoogleDocsInvoiceContent"

export const metadata: Metadata = {
  title: "Free Google Docs Invoice Template (Download & Customize)",
  description:
    "Download a free Google Docs invoice template and learn how to create invoices بسهولة. Or switch to automated invoicing software.",
  alternates: {
    canonical:
      "https://smapey.com/google-docs-invoice-template",
  },
}

export default function Page() {
  return <GoogleDocsInvoiceContent />
}