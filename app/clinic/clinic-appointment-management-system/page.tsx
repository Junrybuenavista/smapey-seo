import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import ClinicApptContent from "./ClinicApptContent"
import { FAQS } from "./faqs"

const PATH = "/clinic/clinic-appointment-management-system"
const TITLE = "Clinic Appointment Management System - Free | Smapey"
const DESCRIPTION = "A clinic appointment management system that handles booking, doctor assignment, queue tracking, and status workflows, all in one clean dashboard. Free plan available."

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
      <ClinicApptContent />
    </>
  )
}
