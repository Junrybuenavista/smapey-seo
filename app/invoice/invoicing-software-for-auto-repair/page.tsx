import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import InvoicingContent from "./InvoicingContent"

const PATH = "/invoice/invoicing-software-for-auto-repair"
const TITLE = "Best Invoicing Software for Auto Repair Shops"
const DESCRIPTION = "Invoicing software for auto repair shops - turn an estimate into an itemised invoice, track what is paid, and chase what is not. For full job orders and service history, see Smapey's repair shop software."

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
