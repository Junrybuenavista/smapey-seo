import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import CateringGuideContent from "./CateringGuideContent"

const PATH = "/catering/guide"
const TITLE = "Catering Manager Guide - How to Use Smapey Catering | Smapey"
const DESCRIPTION = "Step-by-step guide to using Smapey Catering Manager, from setting up packages and your supply catalog to creating bookings, tracking payment milestones, assigning staff, and reading the revenue dashboard."

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
      <CateringGuideContent />
    </>
  )
}
