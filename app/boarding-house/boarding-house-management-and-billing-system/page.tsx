import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema, SITE } from "@/lib/seo"
import { siloNode } from "@/lib/silo"
import BoardingHouseBillingContent from "./BoardingHouseBillingContent"

const PATH = "/boarding-house/boarding-house-management-and-billing-system"
const TITLE = "Rent Collection and Billing for Boarding Houses | Smapey"
const DESCRIPTION =
  "How rent collection and billing works in a Philippine boarding house - computing what each tenant owes, due dates, deposits, partial payments, arrears, statements, and the tenant ledger."

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
      <BoardingHouseBillingContent />
    </>
  )
}
