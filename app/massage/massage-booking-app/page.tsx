import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import MassageBookingAppContent from "./MassageBookingAppContent"
import { FAQS } from "./faqs"

const PATH = "/massage/massage-booking-app"
const TITLE = "Massage Booking App | Online Booking for Massage Businesses | Smapey"
const DESCRIPTION = "Smapey is a massage booking app that lets your clients book therapists, treatments, and times from your own branded page, with deposit collection built in. Free plan available."

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
      <MassageBookingAppContent />
    </>
  )
}
