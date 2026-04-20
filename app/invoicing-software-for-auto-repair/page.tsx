import { Metadata } from "next"
import InvoicingContent from "./InvoicingContent"

export const metadata: Metadata = {
  title: "Best Invoicing Software for Auto Repair Shops",
  description:
    "Manage billing faster with invoicing software for auto repair. Automate invoices, track payments, and get paid faster with Smapey.",
  alternates: {
    canonical:
      "https://smapeyinvoicingsoftware.com/invoicing-software-for-auto-repair",
  },
}

export default function Page() {
  return <InvoicingContent />
}