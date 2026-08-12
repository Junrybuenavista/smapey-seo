import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import BoardingHouseGuideContent from "./BoardingHouseGuideContent"

const PATH = "/boarding-house/guide"
const TITLE = "Boarding House Manager Guide - How to Use Smapey Boarding House | Smapey"
const DESCRIPTION = "Step-by-step guide to using Smapey Boarding House Manager, from setting up rooms and beds to move-ins, rent and utility billing, maintenance tracking with QR issue reporting, and reading the occupancy dashboard."

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
      <BoardingHouseGuideContent />
    </>
  )
}
