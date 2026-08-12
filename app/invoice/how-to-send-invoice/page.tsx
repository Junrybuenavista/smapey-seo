import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import Content from "./HowToSendContent"

const PATH = "/invoice/how-to-send-invoice"
const TITLE = "How to Send an Invoice to Clients and Get Paid Faster"
const DESCRIPTION = "Discover how to send invoices professionally, avoid delays, and improve your cash flow with simple invoicing tips."

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
