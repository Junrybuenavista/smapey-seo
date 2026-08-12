import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import GymPricingContent from "./GymPricingContent"
import { FAQS } from "./faqs"

const PATH = "/gym/gym-management-software-price"
const TITLE = "Gym Management Software Price & Plans | Smapey GymOS"
const DESCRIPTION = "See transparent gym management software pricing. Free plan for small gyms, Pro at $19/mo, Enterprise at $29/mo. No hidden fees, cancel anytime."

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
      <GymPricingContent />
    </>
  )
}
