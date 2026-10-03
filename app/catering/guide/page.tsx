import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import CateringGuideContent from "./CateringGuideContent"

const PATH = "/catering/guide"
const TITLE = "Catering Manager Guide - How to Use Smapey Catering | Smapey"
const DESCRIPTION = "Step-by-step guide to Smapey Catering Manager: packages, recipes and market lists, client quotations, the event calendar, payment milestones, and staff payouts."

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
