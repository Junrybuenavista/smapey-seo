import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import WhatIsInvoiceContent from "./WhatIsInvoiceContent"

const PATH = "/invoice/what-is-an-invoice"
const TITLE = "What is an Invoice? Meaning, Example & Guide (2026)"
const DESCRIPTION = "Learn what an invoice is, how it works, what to include, and how to create professional invoices using modern invoicing software."

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
          breadcrumbSchema(PATH),
        ]}
      />
      <WhatIsInvoiceContent />
    </>
  )
}
