import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import Content from "./ElectricianContent"

const PATH = "/invoice/electrician-invoicing-software"
const TITLE = "Invoicing Software for Electricians | Invoice App | Smapey"
const DESCRIPTION = "Send invoices, track jobs, and manage payments with Smapey invoicing software for electricians. Fast, simple, and reliable."

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
