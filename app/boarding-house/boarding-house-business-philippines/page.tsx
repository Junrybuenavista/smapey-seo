import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema, SITE } from "@/lib/seo"
import { siloNode } from "@/lib/silo"
import BoardingHouseBusinessContent from "./BoardingHouseBusinessContent"

const PATH = "/boarding-house/boarding-house-business-philippines"
const TITLE = "Starting and Running a Boarding House Business | Smapey"
const DESCRIPTION =
  "How the boarding house business works in the Philippines - the model, capital, registration and permits, tenant screening, house rules, contracts, maintenance, and what actually drives profit."

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
      <BoardingHouseBusinessContent />
    </>
  )
}
