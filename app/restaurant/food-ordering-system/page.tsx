import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import FoodOrderingSystemContent from "./FoodOrderingSystemContent"

const PATH = "/restaurant/food-ordering-system"
const TITLE = "Food Order Management System - Free for Small Restaurants | Smapey"
const DESCRIPTION = "A food order management system built for small restaurants, caf\u00e9s, and canteens. Menu builder, kitchen queue, dine-in and takeaway orders, daily sales tracking. Free plan, no credit card."

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
      <FoodOrderingSystemContent />
    </>
  )
}
