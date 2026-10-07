import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/invoice/official-receipt-philippines"
const TITLE = "Official Receipt Philippines: What It's For Now | Smapey"
const DESCRIPTION = "Since RR 7-2024 the invoice proves the sale, not the official receipt. What an OR is for now, a correct sample, and the input-tax line it must carry."

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
