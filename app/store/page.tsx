import JsonLd from "@/components/JsonLd"
import { buildMetadata, softwareApplicationSchema, faqSchema, breadcrumbSchema } from "@/lib/seo"
import StoreContent from "./StoreContent"
import { FAQS } from "./faqs"

const PATH = "/store"
const TITLE = "Inventory & POS Manager for Small Stores | Free | Smapey"
const DESCRIPTION = "Smapey Store Manager tracks your inventory, runs a tap-to-sell POS, records customer utang, manages suppliers, and shows daily sales analytics, all in one dashboard. Free forever, no card required."

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
          softwareApplicationSchema({
            name: "Inventory & POS Manager",
            description: DESCRIPTION,
            path: PATH,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <StoreContent />
    </>
  )
}
