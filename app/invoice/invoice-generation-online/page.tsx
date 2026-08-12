import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import Content from "./InvoiceGeneratorContent"

const PATH = "/invoice/invoice-generation-online"
const TITLE = "Free Invoice Generator | Create Invoices Online"
const DESCRIPTION = "Generate professional invoices online for free. Customize, download, and send invoices instantly with Smapey."

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
