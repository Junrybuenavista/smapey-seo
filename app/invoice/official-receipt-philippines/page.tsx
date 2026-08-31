import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/invoice/official-receipt-philippines"
const TITLE = "Official Receipt Philippines: What It's For After RR 7-2024 | Smapey"
const DESCRIPTION = "The official receipt is no longer evidence of a sale in the Philippines - RR 7-2024 made the invoice primary for goods and services alike. What an official receipt is now, a correct sample, the input-tax statement it must carry, and how it differs from a collection receipt."

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
