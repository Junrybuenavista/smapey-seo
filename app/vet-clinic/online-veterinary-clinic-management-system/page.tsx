import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import OnlineVetClinicContent from "./OnlineVetClinicContent"
import { FAQS } from "./faqs"

const PATH = "/vet-clinic/online-veterinary-clinic-management-system"
const TITLE = "Online Veterinary Clinic Management System - Cloud-Based & Free to Start | Smapey"
const DESCRIPTION = "Smapey is a fully online veterinary clinic management system, manage pets, appointments, vaccinations, and billing from any browser, anywhere. Free to start, no install needed."

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
      <OnlineVetClinicContent />
    </>
  )
}
