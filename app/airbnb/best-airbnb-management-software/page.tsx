import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import BestAirbnbManagementSoftwareContent from "./BestAirbnbManagementSoftwareContent"
import { FAQS } from "./faqs"

const PATH = "/airbnb/best-airbnb-management-software"
const TITLE = "Best Airbnb Management Software for Independent Hosts | Smapey"
const DESCRIPTION = "Looking for the best Airbnb management software? Smapey gives independent hosts property listings, guest profiles, reservation tracking, and revenue analytics, free to start."

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
      <BestAirbnbManagementSoftwareContent />
    </>
  )
}
