import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import ClinicInfoContent from "./ClinicInfoContent"
import { FAQS } from "./faqs"

const PATH = "/clinic/clinic-information-management-system"
const TITLE = "Clinic Information Management System - Free | Smapey"
const DESCRIPTION = "A clinic information management system that stores patient records, doctor profiles, appointment history, and analytics, all organized, secure, and instantly accessible."

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
      <ClinicInfoContent />
    </>
  )
}
