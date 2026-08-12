import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/water-refilling/business-plan-for-water-refilling-station-philippines"
const TITLE = "Business Plan for a Water Refilling Station Philippines (Free Sample Outline)"
const DESCRIPTION = "A sample business plan for a water refilling station in the Philippines, executive summary, market, pricing, startup costs, operations, marketing, and financials. Free outline you can copy."

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
