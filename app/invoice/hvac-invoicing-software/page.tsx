import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import Content from "./HvacContent"

const PATH = "/invoice/hvac-invoicing-software"
const TITLE = "HVAC Invoicing Software for Contractors"
const DESCRIPTION = "Simplify billing and get paid faster with Smapey HVAC invoicing software. Create invoices and track payments \u0628\u0633\u0647\u0648\u0644\u0629."

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
