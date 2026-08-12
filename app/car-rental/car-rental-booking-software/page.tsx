import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import CarRentalBookingContent from "./CarRentalBookingContent"
import { FAQS } from "./faqs"

const PATH = "/car-rental/car-rental-booking-software"
const TITLE = "Car Rental Booking Software | Smapey"
const DESCRIPTION = "Smapey car rental booking software lets you create and manage reservations, track deposits, set pickup and return dates, and keep your fleet fully booked."

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
      <CarRentalBookingContent />
    </>
  )
}
