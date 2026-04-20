import { Metadata } from "next"
import InvoicingContent from "./InvoicingContent"

export const metadata: Metadata = {
  title: "Best Invoicing Software for Consultants (2026)",
  description:
    "Discover the best invoicing software for consultants. Automate billing, track payments, and get paid faster with simple tools.",
  alternates: {
    canonical:
      "https://smapey.com/invoice/invoicing-software-for-consultants",
  },
}

export default function Page() {
  return <InvoicingContent />
}