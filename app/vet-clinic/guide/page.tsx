import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import VetClinicGuideContent from "./VetClinicGuideContent"

const PATH = "/vet-clinic/guide"
const TITLE = "Veterinary Clinic Management System Guide - How to Use Smapey Vet | Smapey"
const DESCRIPTION = "Step-by-step guide to using Smapey Vet Clinic Manager, from setting up vets and schedules to booking appointments, managing the queue board, tracking vaccinations, and billing."

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
          breadcrumbSchema(PATH),
        ]}
      />
      <VetClinicGuideContent />
    </>
  )
}
