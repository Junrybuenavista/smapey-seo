import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import AirbnbPropertyManagementSoftwareContent from "./AirbnbPropertyManagementSoftwareContent"
import { FAQS } from "./faqs"

const PATH = "/airbnb/airbnb-property-management-software"
const TITLE = "Airbnb Property Management Software | Track Every Property & Booking | Smapey"
const DESCRIPTION = "Airbnb property management software for short-term rental hosts. Track every property, guest, and reservation from one dashboard, with occupancy and revenue analytics."

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
      <AirbnbPropertyManagementSoftwareContent />
    </>
  )
}
