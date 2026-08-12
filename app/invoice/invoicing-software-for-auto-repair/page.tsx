import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import InvoicingContent from "./InvoicingContent"

const PATH = "/invoice/invoicing-software-for-auto-repair"
const TITLE = "Best Invoicing Software for Auto Repair Shops"
const DESCRIPTION = "Manage billing faster with invoicing software for auto repair. Automate invoices, track payments, and get paid faster with Smapey."

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
      <InvoicingContent />
    </>
  )
}
