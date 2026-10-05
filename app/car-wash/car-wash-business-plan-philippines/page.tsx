import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/car-wash/car-wash-business-plan-philippines"
const TITLE = "Car Wash Business Plan Philippines: Sample, Template and Break-Even Calculator | Smapey"
const DESCRIPTION = "A car wash business plan sample for the Philippines: what to write in each section, the capacity calculation, a costs worksheet, and a free break-even calculator. With sourced startup costs."

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
