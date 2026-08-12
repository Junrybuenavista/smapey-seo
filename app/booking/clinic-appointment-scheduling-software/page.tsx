import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import ClinicContent from "./ClinicContent"
import { FAQS } from "./faqs"

const PATH = "/booking/clinic-appointment-scheduling-software"
const TITLE = "Clinic Appointment Scheduling Software | Smapey Booking"
const DESCRIPTION = "Manage patient appointments, track deposits, assign doctors and staff, and run your clinic's schedule with zero chaos. Start free, no credit card required."

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
      <ClinicContent />
    </>
  )
}
