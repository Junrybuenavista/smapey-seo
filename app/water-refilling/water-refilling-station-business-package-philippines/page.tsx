import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/water-refilling/water-refilling-station-business-package-philippines"
const TITLE = "Water Refilling Station Business Package Philippines | What's Inside & Costs"
const DESCRIPTION = "What's included in a water refilling station business package in the Philippines, equipment, containers, installation, costs, and the management software to run it. Compare packages and start smart."

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
