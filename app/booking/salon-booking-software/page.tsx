import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import SalonContent from "./SalonContent"
import { FAQS } from "./faqs"

const PATH = "/booking/salon-booking-software"
const TITLE = "Salon Booking Software | Smapey Booking"
const DESCRIPTION = "Salon booking software that helps you manage appointments, assign stylists, track deposits, and keep your schedule full. Free plan for small salons."

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
      <SalonContent />
    </>
  )
}
