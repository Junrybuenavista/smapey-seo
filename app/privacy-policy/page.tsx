import { Metadata } from "next"
import PrivacyContent from "./PrivacyContent"

export const metadata: Metadata = {
  title: "Privacy Policy | Smapey",
  description:
    "Learn how Smapey collects, uses, and protects your personal data across all Smapey business management tools.",
  alternates: {
    canonical:
      "https://smapey.com/privacy-policy",
  },
}

export default function Page() {
  return <PrivacyContent />
}