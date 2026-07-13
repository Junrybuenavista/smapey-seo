import { Metadata } from "next"
import TermsContent from "./TermsContent"

export const metadata: Metadata = {
  title: "Terms and Conditions | Smapey",
  description:
    "Read the terms and conditions for using Smapey business management software, including accounts, billing, acceptable use, and service terms.",
  alternates: {
    canonical:
      "https://smapey.com/terms-and-conditions",
  },
}

export default function Page() {
  return <TermsContent />
}