import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import InvoicingContent from "./InvoicingContent"

const PATH = "/invoice/legal-billing-software"
const TITLE = "Best Legal Billing Software for Law Firms"
const DESCRIPTION = "Automate invoices, track billable hours, and get paid faster with the best legal billing software for lawyers and law firms."

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
