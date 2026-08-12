import JsonLd from "@/components/JsonLd"
import { buildMetadata, softwareApplicationSchema, breadcrumbSchema } from "@/lib/seo"
import InvoicingContent from "./InvoiceContent"

const PATH = "/invoice"
const TITLE = "Simple Invoicing Software for Small Business | Smapey"
const DESCRIPTION = "Create invoices, send them instantly, and get paid faster with Smapey. Simple invoicing software for freelancers and small businesses. Start free."

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
          softwareApplicationSchema({
            name: "Invoicing Software",
            description: DESCRIPTION,
            path: PATH,
          }),
          breadcrumbSchema(PATH),
        ]}
      />
      <InvoicingContent />
    </>
  )
}
