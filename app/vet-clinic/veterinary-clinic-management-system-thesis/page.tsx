import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import VetThesisContent from "./VetThesisContent"

const PATH = "/vet-clinic/veterinary-clinic-management-system-thesis"
const TITLE = "Veterinary Clinic Management System Thesis - Modules, Architecture & Live Demo | Smapey"
const DESCRIPTION = "A comprehensive guide to veterinary clinic management system thesis topics, key modules, system architecture, database entities, and a ready-to-use live example built with Smapey."

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
      <VetThesisContent />
    </>
  )
}
