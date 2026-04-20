import { Metadata } from "next"
import PrivacyContent from "./PrivacyContent"

export const metadata: Metadata = {
  title: "Privacy Policy | Smapey Invoicing Software",
  description:
    "Learn how Smapey collects, uses, and protects your personal data when using our invoicing software.",
  alternates: {
    canonical:
      "https://smapeyinvoicingsoftware.com/privacy-policy",
  },
}

export default function Page() {
  return <PrivacyContent />
}