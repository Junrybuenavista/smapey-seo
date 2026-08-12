import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import DentalClinicContent from "./DentalClinicContent"
import { FAQS } from "./faqs"

const PATH = "/clinic/dental-clinic-management-system"
const TITLE = "Dental Clinic Management System - Free Plan Available | Smapey"
const DESCRIPTION = "Smapey is a dental clinic management system that helps dentists manage patients, schedule appointments, assign chairs, and run a live queue, without complex software."

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
      <DentalClinicContent />
    </>
  )
}
