import JsonLd from "@/components/JsonLd"
import {
  buildMetadata,
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo"
import CarRentalContent from "./CarRentalContent"
import { FAQS } from "./faqs"

const PATH = "/car-rental"
const TITLE = "Car Rental Software | Smapey"
const DESCRIPTION = "Smapey is car rental software that helps you manage your fleet, track rentals, handle customers, and monitor revenue, all from one dashboard. Free plan available."

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
          softwareApplicationSchema({
            name: "Car Rental",
            description: DESCRIPTION,
            path: PATH,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <CarRentalContent />
    </>
  )
}
