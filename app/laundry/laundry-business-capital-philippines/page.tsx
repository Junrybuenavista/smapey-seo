import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/laundry/laundry-business-capital-philippines"
const TITLE = "Laundry Business Capital in the Philippines: What You Need | Smapey"
const DESCRIPTION = "How much capital a laundry business really needs in the Philippines: startup versus working capital, how much runway to hold back, capital by business model, the costs most plans leave out, and permit fees."

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
