import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import InvoicingContent from "./InvoicingContent"

const PATH = "/invoice/invoicing-software-for-freelancers"
const TITLE = "Best Invoicing Software for Freelancers (Fast & Easy)"
const DESCRIPTION = "Discover the best invoicing software for freelancers. Automate invoices, track payments, and get paid faster with Smapey."

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
