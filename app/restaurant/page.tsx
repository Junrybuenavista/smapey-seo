import JsonLd from "@/components/JsonLd"
import { buildMetadata, softwareApplicationSchema, breadcrumbSchema } from "@/lib/seo"
import RestaurantContent from "./RestaurantContent"

const PATH = "/restaurant"
const TITLE = "Food Ordering Manager | Menu, Orders & Kitchen Queue | Smapey"
const DESCRIPTION = "Smapey Food Ordering Manager handles menu building, dine-in and takeaway orders, kitchen queue tracking, and daily sales reporting for small restaurants and caf\u00e9s. Start free, no credit card required."

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
            name: "Food Ordering Manager",
            description: DESCRIPTION,
            path: PATH,
          }),
          breadcrumbSchema(PATH),
        ]}
      />
      <RestaurantContent />
    </>
  )
}
