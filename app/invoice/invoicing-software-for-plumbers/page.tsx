import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import Content from "./PlumberContent"

const PATH = "/invoice/invoicing-software-for-plumbers"
const TITLE = "Invoicing Software for Plumbers"
const DESCRIPTION = "Create plumbing invoices, track payments, and get paid faster with Smapey. Built for plumbers and service professionals."

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
