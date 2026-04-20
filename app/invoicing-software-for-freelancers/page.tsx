import { Metadata } from "next"
import InvoicingContent from "./InvoicingContent"

export const metadata: Metadata = {
  title: "Best Invoicing Software for Freelancers (Fast & Easy)",
  description:
    "Discover the best invoicing software for freelancers. Automate invoices, track payments, and get paid faster with Smapey.",
  alternates: {
    canonical:
      "https://smapeyinvoicingsoftware.com/invoicing-software-for-freelancers",
  },
}

export default function Page() {
  return <InvoicingContent />
}