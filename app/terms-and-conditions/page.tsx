import { Metadata } from "next"
import TermsContent from "./TermsContent"

export const metadata: Metadata = {
  title: "Terms and Conditions | Smapey Invoicing Software",
  description:
    "Read the terms and conditions for using Smapey invoicing software, including user responsibilities, limitations, and service terms.",
  alternates: {
    canonical:
      "https://smapey.com/terms-and-conditions",
  },
}

export default function Page() {
  return <TermsContent />
}