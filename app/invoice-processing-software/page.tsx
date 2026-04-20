import { Metadata } from "next"
import InvoicingContent from "./InvoicingContent"

export const metadata: Metadata = {
  title: "Best Invoice Processing Software for Automation",
  description:
    "Automate billing with invoice processing software. Save time, reduce errors, and get paid faster with Smapey.",
  alternates: {
    canonical:
      "https://smapeyinvoicingsoftware.com/invoice-processing-software",
  },
}

export default function Page() {
  return <InvoicingContent />
}