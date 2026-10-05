import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/car-wash/how-to-start-a-car-wash-business-philippines"
const TITLE = "How to Start a Car Wash Business in the Philippines (2026 Guide) | Smapey"
const DESCRIPTION = "How to start a car wash business in the Philippines: capital for renting or building, the permits a car wash needs including the DENR discharge permit, equipment, water use, crew pay and pricing. With sources."

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
