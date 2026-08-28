import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/invoice/sales-invoice-philippines"
const TITLE = "Sales Invoice Philippines: What It Is and What BIR Requires (2026) | Smapey"
const DESCRIPTION = "What a sales invoice is in the Philippines, why cash, charge, credit, billing and service invoices are all the same document, how to compute the 12% VAT, when you must issue one, and what separates a valid invoice from a supplementary document."

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
