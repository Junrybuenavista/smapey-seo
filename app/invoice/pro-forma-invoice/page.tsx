import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import ProFormaInvoiceContent from "./ProFormaInvoiceContent"

const PATH = "/invoice/pro-forma-invoice"
const TITLE = "Pro Forma Invoice: Meaning, Example & Free Template"
const DESCRIPTION = "Understand what a pro forma invoice is, when to use it, and how to create one. Includes examples and free templates for businesses."

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
      <ProFormaInvoiceContent />
    </>
  )
}
