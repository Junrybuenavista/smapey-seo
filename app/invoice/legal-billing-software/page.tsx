import { Metadata } from "next"
import InvoicingContent from "./InvoicingContent"

export const metadata: Metadata = {
  title: "Best Legal Billing Software for Law Firms",
  description:
    "Automate invoices, track billable hours, and get paid faster with the best legal billing software for lawyers and law firms.",
  alternates: {
    canonical:
      "https://smapey.com/invoice/legal-billing-software",
  },
}

export default function Page() {
  return <InvoicingContent />
}