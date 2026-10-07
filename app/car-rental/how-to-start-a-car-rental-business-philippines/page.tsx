import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/car-rental/how-to-start-a-car-rental-business-philippines"
const TITLE = "How to Start a Car Rental Business in the Philippines"
const DESCRIPTION = "Self-drive or with a driver decides everything - only one needs an LTFRB franchise. The permits, the insurance, and the number that decides profitability."

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
      <Content />
    </>
  )
}
