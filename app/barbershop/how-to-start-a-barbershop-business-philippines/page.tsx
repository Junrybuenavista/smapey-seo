import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/barbershop/how-to-start-a-barbershop-business-philippines"
const TITLE = "Barber Shop Business Plan Philippines: How to Start (2026) | Smapey"
const DESCRIPTION = "How to start a barber shop business in the Philippines: capital, barber chair prices, the sanitary permit and health certificates, barber commission, haircut prices, and a business plan with a break-even calculator."

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
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
