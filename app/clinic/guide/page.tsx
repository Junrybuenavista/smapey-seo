import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import ClinicGuideContent from "./ClinicGuideContent"

const PATH = "/clinic/guide"
const TITLE = "Clinic Management System Guide - How to Use Smapey Clinic | Smapey"
const DESCRIPTION = "Step-by-step guide to using Smapey Clinic Manager, from setting up doctors and schedules to booking appointments and running the live queue board."

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
      <ClinicGuideContent />
    </>
  )
}
