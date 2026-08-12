import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import Content from "./InvoiceTemplateContent"

const PATH = "/invoice/free-invoice-template"
const TITLE = "Free Invoice Template (Download & Customize)"
const DESCRIPTION = "Download free invoice templates and customize them. Create professional invoices and save time."

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
