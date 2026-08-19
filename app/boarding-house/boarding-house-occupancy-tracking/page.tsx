import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema, SITE } from "@/lib/seo"
import { siloNode } from "@/lib/silo"
import OccupancyTrackingContent from "./OccupancyTrackingContent"

const PATH = "/boarding-house/boarding-house-occupancy-tracking"
const TITLE = "Tracking Occupancy in a Boarding House | Smapey"
const DESCRIPTION =
  "How to track boarding house occupancy in the Philippines - bed-based versus room-based rates, what counts as capacity, seasonality, and the numbers that show a house is filling or emptying."

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH, type: "article" })

export default function Page() {
  const node = siloNode(PATH)
  return (
    <>
      <JsonLd
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: node?.h1 ?? TITLE,
            description: DESCRIPTION,
            mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}${PATH}` },
            publisher: { "@id": `${SITE}/#organization` },
          },
          breadcrumbSchema(PATH),
        ]}
      />
      <OccupancyTrackingContent />
    </>
  )
}
