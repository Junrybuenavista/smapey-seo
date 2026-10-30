import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import RestaurantPosSystemContent from "./RestaurantPosSystemContent"

const PATH = "/restaurant/restaurant-pos-system"
const TITLE = "Restaurant POS System - Free Software for Small Restaurants | Smapey"
const DESCRIPTION = "A free restaurant POS system for small restaurants and caf\u00e9s. Cashier and kitchen screens, cash change, GCash, and daily sales. No hardware, no POS fees."

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
      <RestaurantPosSystemContent />
    </>
  )
}
