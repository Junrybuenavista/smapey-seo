import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import SalonAppointmentManagerAppContent from "./SalonAppointmentManagerAppContent"
import { FAQS } from "./faqs"

const PATH = "/salon/salon-appointment-manager-app"
const TITLE = "Salon Appointment Manager App | Schedule & Track Bookings | Smapey"
const DESCRIPTION = "Smapey's salon appointment manager app lets you schedule appointments, accept online inquiries, track statuses, and never miss a booking, free to start."

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
      <SalonAppointmentManagerAppContent />
    </>
  )
}
