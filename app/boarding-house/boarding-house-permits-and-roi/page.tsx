import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema, SITE } from "@/lib/seo"
import { siloNode } from "@/lib/silo"
import PermitsAndRoiContent from "./PermitsAndRoiContent"

const PATH = "/boarding-house/boarding-house-permits-and-roi"
const TITLE = "Boarding House Permits, Costs, and Returns | Smapey"
const DESCRIPTION =
  "What it takes to register a boarding house in the Philippines and what it returns - the permits typically involved, where capital goes, the real cost side, and how to model payback honestly."

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
      <PermitsAndRoiContent />
    </>
  )
}
