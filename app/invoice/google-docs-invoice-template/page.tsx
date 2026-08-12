import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import GoogleDocsInvoiceContent from "./GoogleDocsInvoiceContent"

const PATH = "/invoice/google-docs-invoice-template"
const TITLE = "Free Google Docs Invoice Template (Download & Customize)"
const DESCRIPTION = "Download a free Google Docs invoice template and learn how to create invoices \u0628\u0633\u0647\u0648\u0644\u0629. Or switch to automated invoicing software."

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
      <GoogleDocsInvoiceContent />
    </>
  )
}
