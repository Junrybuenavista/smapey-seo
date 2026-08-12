import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import MassageTherapistBookingAppContent from "./MassageTherapistBookingAppContent"
import { FAQS } from "./faqs"

const PATH = "/massage/massage-therapist-booking-app"
const TITLE = "Massage Therapist Booking App | Book by Therapist | Smapey"
const DESCRIPTION = "A massage therapist booking app, clients pick their preferred therapist by specialty, see availability, and book directly. Built for spas, clinics, and independent therapists."

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
      <MassageTherapistBookingAppContent />
    </>
  )
}
