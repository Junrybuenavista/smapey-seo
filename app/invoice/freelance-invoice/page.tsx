import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import Content from "./FreelanceContent"

const PATH = "/invoice/freelance-invoice"
const TITLE = "Freelance Invoice Guide | Get Paid Faster"
const DESCRIPTION = "Learn how to create freelance invoices, send them professionally, and get paid faster using simple invoicing tools."

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
