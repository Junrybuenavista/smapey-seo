import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import NailSalonContent from "./NailSalonContent"
import { FAQS } from "./faqs"

const PATH = "/booking/nail-salon-booking-software"
const TITLE = "Nail Salon Booking Software | Smapey Booking"
const DESCRIPTION = "Booking software built for nail salons, manage nail appointments, assign nail techs, track deposits, and reduce no-shows. Start free today."

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
      <NailSalonContent />
    </>
  )
}
