import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema, SITE } from "@/lib/seo"
import { siloNode } from "@/lib/silo"
import BedSpaceRoomsContent from "./BedSpaceRoomsContent"

const PATH = "/boarding-house/bed-space-and-room-management"
const TITLE = "Bed Space and Room Management for Boarding Houses | Smapey"
const DESCRIPTION =
  "How to manage rooms and bed spaces in a Philippine boarding house - bed-level inventory, upper and lower deck rates, move-ins, transfers, vacancy, and occupancy."

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
})

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
      <BedSpaceRoomsContent />
    </>
  )
}
