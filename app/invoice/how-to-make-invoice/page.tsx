import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import Content from "./HowToMakeInvoiceContent"

const PATH = "/invoice/how-to-make-invoice"
const TITLE = "How to Make an Invoice (Simple Beginner Guide)"
const DESCRIPTION = "Learn how to make an invoice quickly and easily. Includes examples and tips for freelancers and small businesses."

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
