import { Metadata } from "next"
import PricingContent from "./PricingContent"

export const metadata: Metadata = {
  title: "Invoice Software Pricing | Smapey",
  description:
    "Simple and affordable invoicing software pricing. Create invoices, track payments, and grow your business with Smapey.",
  alternates: {
    canonical: "https://smapey.com/invoice/pricing",
  },
}

export default function Page() {
  return <PricingContent />
}