import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import AirbnbCleaningManagementSoftwareContent from "./AirbnbCleaningManagementSoftwareContent"
import { FAQS } from "./faqs"

const PATH = "/airbnb/airbnb-cleaning-management-software"
const TITLE = "Airbnb Cleaning Management Software | Track Turnovers Between Guests | Smapey"
const DESCRIPTION = "Airbnb cleaning management software for short-term rental hosts. Know exactly which properties need a turnover, track cleanings, and keep every unit guest-ready."

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
      <AirbnbCleaningManagementSoftwareContent />
    </>
  )
}
