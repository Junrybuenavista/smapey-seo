import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import FreeRestaurantManagementSoftwareContent from "./FreeRestaurantManagementSoftwareContent"

const PATH = "/restaurant/free-restaurant-management-software"
const TITLE = "Free Restaurant Management Software - No Credit Card | Smapey"
const DESCRIPTION = "Free restaurant management software for small restaurants and caf\u00e9s. Menu builder with photos, kitchen order queue, dine-in and takeaway orders, daily sales dashboard. Permanently free plan."

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
      <FreeRestaurantManagementSoftwareContent />
    </>
  )
}
