import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import ClinicThesisContent from "./ClinicThesisContent"

const PATH = "/clinic/clinic-management-system-thesis"
const TITLE = "Clinic Management System Thesis - Modules, Architecture & Implementation | Smapey"
const DESCRIPTION = "A comprehensive guide to clinic management system thesis topics, key modules, system architecture, database design, and a ready-to-use live example built with Smapey."

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
      <ClinicThesisContent />
    </>
  )
}
