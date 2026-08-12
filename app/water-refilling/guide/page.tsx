import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import GuideContent from "./GuideContent"

const PATH = "/water-refilling/guide"
const TITLE = "Water Refilling Station Software Guide | How to Use Smapey Water"
const DESCRIPTION = "A plain-English, step-by-step guide to running a water refilling station with Smapey, station setup, deliveries, container deposit tracking, empties returns, inventory refills, payments, and the dashboard."

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
      <GuideContent />
    </>
  )
}
