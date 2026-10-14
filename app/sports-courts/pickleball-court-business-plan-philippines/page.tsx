import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/sports-courts/pickleball-court-business-plan-philippines"
const TITLE = "Pickleball Court Business Plan Philippines: ROI Calculator | Smapey"
const DESCRIPTION = "A pickleball court business plan sample for the Philippines: each section to fill in, court rates, building costs, permits, and a free ROI calculator."

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
})

export default function Page() {
  return (
    <>
      <JsonLd schema={[faqSchema(FAQS), breadcrumbSchema(PATH)]} />
      <Content />
    </>
  )
}
