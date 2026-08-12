import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import InvoicingContent from "./InvoicingContent"

const PATH = "/invoice/invoicing-software-for-consultants"
const TITLE = "Best Invoicing Software for Consultants (2026)"
const DESCRIPTION = "Discover the best invoicing software for consultants. Automate billing, track payments, and get paid faster with simple tools."

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
