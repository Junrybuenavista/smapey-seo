import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/laundry/laundry-shop-business-plan-philippines"
const TITLE = "Laundry Shop Business Plan (Philippines): Structure & Numbers | Smapey"
const DESCRIPTION = "How to write a laundry shop business plan in the Philippines: the sections that matter, the capacity calculation lenders look for, how to build revenue projections, and the break-even arithmetic."

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
