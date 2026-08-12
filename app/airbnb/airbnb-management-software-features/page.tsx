import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import AirbnbManagementSoftwareFeaturesContent from "./AirbnbManagementSoftwareFeaturesContent"

const PATH = "/airbnb/airbnb-management-software-features"
const TITLE = "Airbnb Management Software Features: What You Actually Need | Smapey"
const DESCRIPTION = "A complete breakdown of Airbnb management software features, from property listings and guest profiles to double-booking protection and revenue analytics."

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
      <AirbnbManagementSoftwareFeaturesContent />
    </>
  )
}
