import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import AirbnbManagementSoftwareContent from "./AirbnbManagementSoftwareContent"
import { FAQS } from "./faqs"

const PATH = "/airbnb/airbnb-management-software"
const TITLE = "Airbnb Management Software | All-in-One Rental Dashboard | Smapey"
const DESCRIPTION = "Airbnb management software for independent hosts. Manage properties, guests, reservations, and revenue, with double-booking protection built in. Free plan available."

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
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <AirbnbManagementSoftwareContent />
    </>
  )
}
