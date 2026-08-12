import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import BestCarRentalContent from "./BestCarRentalContent"
import { FAQS } from "./faqs"

const PATH = "/car-rental/best-car-rental-software"
const TITLE = "Best Car Rental Software for Small Business | Smapey"
const DESCRIPTION = "Looking for the best car rental software? Smapey helps you manage your fleet, track rentals, and monitor revenue, with a free plan to get started."

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
      <BestCarRentalContent />
    </>
  )
}
