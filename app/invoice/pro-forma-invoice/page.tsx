import { Metadata } from "next"
import ProFormaInvoiceContent from "./ProFormaInvoiceContent"

export const metadata: Metadata = {
  title: "Pro Forma Invoice: Meaning, Example & Free Template",
  description:
    "Understand what a pro forma invoice is, when to use it, and how to create one. Includes examples and free templates for businesses.",
  alternates: {
    canonical:
      "https://smapey.com/invoice/pro-forma-invoice",
  },
}

export default function Page() {
  return <ProFormaInvoiceContent />
}