import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import Content from "./InvoiceExampleContent"

const PATH = "/invoice/invoice-example"
const TITLE = "Invoice Example (Simple Format & Template)"
const DESCRIPTION = "View a real invoice example with proper structure. Learn how to format invoices professionally and get paid faster."

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
      <Content />
    </>
  )
}
