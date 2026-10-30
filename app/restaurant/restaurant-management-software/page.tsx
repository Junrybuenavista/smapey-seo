import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import RestaurantManagementSoftwareContent from "./RestaurantManagementSoftwareContent"

const PATH = "/restaurant/restaurant-management-software"
const TITLE = "Restaurant Management Software - Free for Small Restaurants | Smapey"
const DESCRIPTION = "Restaurant management software for small restaurants, caf\u00e9s, and canteens. Menu, kitchen and cashier screens, sales, and team access. Free, no card."

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
      <RestaurantManagementSoftwareContent />
    </>
  )
}
