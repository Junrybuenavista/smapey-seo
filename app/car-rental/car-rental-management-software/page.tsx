import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import CarRentalManagementContent from "./CarRentalManagementContent"
import { FAQS } from "./faqs"

const PATH = "/car-rental/car-rental-management-software"
const TITLE = "Car Rental Management Software | Smapey"
const DESCRIPTION = "Smapey is car rental management software that helps you track your fleet, manage reservations, and run your rental business from one dashboard."

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
      <CarRentalManagementContent />
    </>
  )
}
