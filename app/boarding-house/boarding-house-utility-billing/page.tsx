import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema, SITE } from "@/lib/seo"
import { siloNode } from "@/lib/silo"
import UtilityBillingContent from "./UtilityBillingContent"

const PATH = "/boarding-house/boarding-house-utility-billing"
const TITLE = "Boarding House Utility Billing Explained | Smapey"
const DESCRIPTION =
  "How boarding house utility billing works in the Philippines - splitting one electric or water bill across a room, the three allocation methods, sub-meters, and handling disputes."

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
      <UtilityBillingContent />
    </>
  )
}
