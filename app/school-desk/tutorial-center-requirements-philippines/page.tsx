import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/school-desk/tutorial-center-requirements-philippines"
const TITLE = "Tutorial Center Requirements Philippines: Permits & Checklist (2026)"
const DESCRIPTION = "The complete requirements to open a tutorial center in the Philippines, DTI/SEC, Barangay Clearance, Mayor's Permit, BIR, and LGU/DepEd considerations. Plus the free software to run it."

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
