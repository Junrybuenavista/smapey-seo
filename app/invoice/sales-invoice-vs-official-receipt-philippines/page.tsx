import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/invoice/sales-invoice-vs-official-receipt-philippines"
const TITLE = "Sales Invoice vs Official Receipt Philippines (2026 BIR Guide) | Smapey"
const DESCRIPTION = "Since RA 11976 and RR 7-2024 the invoice is the primary document for goods and services, and the official receipt is supplementary and not valid for input VAT. What to issue, when, and what must be on it."

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
