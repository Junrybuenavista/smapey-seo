import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/water-refilling/how-to-start-water-refilling-station-business-philippines"
const TITLE = "How to Start a Water Refilling Station Business in the Philippines (2026 Guide)"
const DESCRIPTION = "A step-by-step guide on how to start a water refilling station business in the Philippines, capital needed, permits, equipment, location, pricing, and the software to run it. Free plan available."

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
