import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/invoice/sales-invoice-philippines"
const TITLE = "Sales Invoice Philippines: What BIR Requires | Smapey"
const DESCRIPTION = "Cash, charge, credit and billing invoices are the same BIR document. What a valid sales invoice must contain, and how to compute the 12% VAT."

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
