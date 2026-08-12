import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import CateringBusinessPhilippinesContent from "./CateringBusinessPhilippinesContent"
import { FAQS } from "./faqs"

const PATH = "/catering/catering-business-philippines"
const TITLE = "Catering Business Philippines - Run It Smarter with Smapey"
const DESCRIPTION = "Running a catering business in the Philippines? Smapey helps you manage bookings, packages, payment collections, supply costs, and staff, all from one dashboard."

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
      <CateringBusinessPhilippinesContent />
    </>
  )
}
