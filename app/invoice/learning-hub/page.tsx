import { Metadata } from "next"
import BlogContent from "./BlogContent"

export const metadata: Metadata = {
  title: "Invoicing Blog | Guides, Templates & Tips | Smapey",
  description:
    "Learn how to create, send, and manage invoices with step-by-step guides, templates, and tips for freelancers and small businesses.",
  keywords: [
    "invoice blog",
    "how to create invoice",
    "invoice templates",
    "freelance invoicing tips",
    "billing guides",
    "invoice examples",
  ],
  alternates: {
    canonical: "https://smapey.com/invoice/learning-hub",
  },
  openGraph: {
    title: "Invoicing Blog | Guides, Templates & Tips",
    description:
      "Explore invoicing guides, templates, and tips to help you get paid faster and manage billing professionally.",
    url: "https://smapey.com/learning-hub",
    siteName: "Smapey Invoicing Software",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoicing Blog | Guides, Templates & Tips",
    description:
      "Step-by-step invoicing guides, templates, and tips for freelancers and businesses.",
  },
}

export default function Page() {
  return <BlogContent />
}