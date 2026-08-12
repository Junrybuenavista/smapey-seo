import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import VetClinicSystemContent from "./VetClinicSystemContent"
import { FAQS } from "./faqs"

const PATH = "/vet-clinic/veterinary-clinic-management-system"
const TITLE = "Veterinary Clinic Management System - Free Plan Available | Smapey"
const DESCRIPTION = "Smapey is a veterinary clinic management system that helps vet clinics manage pets, schedule appointments, track vaccinations, run a live queue, and generate billing, all in one place."

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
      <VetClinicSystemContent />
    </>
  )
}
