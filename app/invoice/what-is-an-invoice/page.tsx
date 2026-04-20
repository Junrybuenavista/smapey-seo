import { Metadata } from "next"
import WhatIsInvoiceContent from "./WhatIsInvoiceContent"

export const metadata: Metadata = {
  title: "What is an Invoice? Meaning, Example & Guide (2026)",
  description:
    "Learn what an invoice is, how it works, what to include, and how to create professional invoices using modern invoicing software.",
  alternates: {
    canonical:
      "https://smapey.com/what-is-an-invoice",
  },
}

export default function Page() {
  return <WhatIsInvoiceContent />
}