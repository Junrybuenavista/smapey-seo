import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/sports-courts/pickleball-court-construction-cost-philippines"
const TITLE = "Pickleball Court Construction Cost Philippines (2026) | Smapey"
const DESCRIPTION = "What a pickleball court costs to build in the Philippines in 2026, open or under a roof, line by line, and how many courts fit on your lot or basketball court."

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
