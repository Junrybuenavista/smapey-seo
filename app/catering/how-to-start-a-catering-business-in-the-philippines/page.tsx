import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import HowToStartCateringContent from "./HowToStartCateringContent"
import { FAQS } from "./faqs"

const PATH = "/catering/how-to-start-a-catering-business-in-the-philippines"
const TITLE = "How to Start a Catering Business in the Philippines | Smapey"
const DESCRIPTION = "Step-by-step guide to starting a catering business in the Philippines, legal requirements, startup costs, finding clients, pricing packages, and managing operations with software."

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
      <HowToStartCateringContent />
    </>
  )
}
