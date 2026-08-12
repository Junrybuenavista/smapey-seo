import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import Content from "./HowToCreateInvoiceContent"

const PATH = "/invoice/how-to-create-invoice"
const TITLE = "How to Create an Invoice (Step-by-Step Guide)"
const DESCRIPTION = "Learn how to create a professional invoice step by step with examples, templates, and tips to get paid faster."

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
