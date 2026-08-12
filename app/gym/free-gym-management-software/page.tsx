import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import FreeContent from "./FreeContent"
import { FAQS } from "./faqs"

const PATH = "/gym/free-gym-management-software"
const TITLE = "Free Gym Management Software | No Credit Card | Smapey GymOS"
const DESCRIPTION = "Start managing your gym for free. GymOS free plan includes up to 50 members, walk-in tracking, and manual check-in, no credit card required, free forever."

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
      <FreeContent />
    </>
  )
}
