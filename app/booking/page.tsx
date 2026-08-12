import JsonLd from "@/components/JsonLd"
import {
  buildMetadata,
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo"
import BookingContent from "./BookingContent"
import { FAQS } from "./faqs"

const PATH = "/booking"
const TITLE = "Appointment Scheduling Software for Small Business | Smapey Booking"
const DESCRIPTION = "Smapey Booking is appointment scheduling software for small business, manage appointments, track deposits, assign staff, and confirm clients. Free plan available."

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
            name: "Booking & Appointments",
            description: DESCRIPTION,
            path: PATH,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <BookingContent />
    </>
  )
}
