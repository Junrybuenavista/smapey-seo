import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import MainContent from "./MainContent"

const PATH = "/"
const TITLE = "Smapey | All-in-One Business Software."
const DESCRIPTION = "Smapey helps you run your business smarter with tools for invoicing and gym management. Create invoices, manage members, and grow faster."

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
      <MainContent />
    </>
  )
}
