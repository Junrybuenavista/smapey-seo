import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema, SITE } from "@/lib/seo"
import { siloNode } from "@/lib/silo"
import BoardingHousePlanContent from "./BoardingHousePlanContent"

const PATH = "/boarding-house/boarding-house-business-plan-sample-philippines"
const TITLE = "Boarding House Business Plan Sample Philippines - Free Template | Smapey"
const DESCRIPTION = "Sample boarding house business plan for the Philippines. Covers business overview, target market, services, pricing, and how to use a management system to run it efficiently."

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
})

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: siloNode(PATH)?.h1 ?? TITLE,
            description: DESCRIPTION,
            mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}${PATH}` },
            publisher: { "@id": `${SITE}/#organization` },
          },
          breadcrumbSchema(PATH),
        ]}
      />
      <BoardingHousePlanContent />
    </>
  )
}
