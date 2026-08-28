import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/laundry/how-to-start-a-laundry-business-philippines"
const TITLE = "How to Start a Laundry Business in the Philippines (2026 Guide) | Smapey"
const DESCRIPTION = "How to start a laundry business in the Philippines: the three business models and what each really costs, capital and permits, the sanitation rules specific to laundries, machine sizing, and the monthly numbers. Free plan available."

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
