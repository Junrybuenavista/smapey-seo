import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/invoice/sales-invoice-sample-philippines"
const TITLE = "Sales Invoice Sample Philippines (2026 BIR Format) | Smapey"
const DESCRIPTION = "A filled-in Philippine VAT sales invoice sample with every element RR 7-2024 requires, a field-by-field walkthrough of how to fill it up, the non-VAT version, and the four mistakes that come up most."

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
