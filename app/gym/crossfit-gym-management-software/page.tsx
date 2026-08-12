import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import CrossfitContent from "./CrossfitContent"
import { FAQS } from "./faqs"

const PATH = "/gym/crossfit-gym-management-software"
const TITLE = "CrossFit Gym Management Software | Smapey GymOS"
const DESCRIPTION = "Manage your CrossFit box with GymOS, member tracking, QR check-in, class attendance, subscription plans, and analytics. Built for CrossFit gym owners."

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
})

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <CrossfitContent />
    </>
  )
}
