import { Metadata } from "next"
import InvoicingContent from "./InvoicingContent"

export const metadata: Metadata = {
  title: "Best Invoicing Software for Contractors (Fast & Easy)",
  description:
    "Invoicing software for contractors to create invoices, track payments, and get paid faster. Simple billing, automation, and estimates in one tool.",
  alternates: {
    canonical:
      "https://smapey.com/invoice/invoicing-software-for-contractors",
  },
}

export default function Page() {
  return <InvoicingContent />
}