import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import SalonSchedulingContent from "./SalonSchedulingContent"
import { FAQS } from "./faqs"

const PATH = "/booking/salon-appointment-scheduling-software"
const TITLE = "Salon Appointment Scheduling Software | Smapey Booking"
const DESCRIPTION = "Powerful salon appointment scheduling software, manage your full book, assign stylists, send confirmations, and track every appointment from one dashboard."

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
      <SalonSchedulingContent />
    </>
  )
}
