import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/school-desk/tutorial-center-requirements-philippines"
const TITLE = "Tutorial Center Requirements Philippines (2026 Checklist)"
const DESCRIPTION = "Every permit needed to open a tutorial center in the Philippines: DTI or SEC, barangay clearance, mayor's permit, BIR, and DepEd considerations."

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
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <Content />
    </>
  )
}
