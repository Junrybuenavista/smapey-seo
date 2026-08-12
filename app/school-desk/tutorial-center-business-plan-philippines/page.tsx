import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/school-desk/tutorial-center-business-plan-philippines"
const TITLE = "Tutorial Center Business Plan Philippines (Free Sample & Template 2026)"
const DESCRIPTION = "A sample tutorial center business plan for the Philippines, executive summary, market, services, pricing, costs, marketing, and operations. Plus the free software to run it day to day."

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
