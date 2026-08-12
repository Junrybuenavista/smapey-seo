import JsonLd from "@/components/JsonLd"
import {
  buildMetadata,
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo"
import ClinicManagerContent from "./ClinicManagerContent"
import { FAQS } from "./faqs"

const PATH = "/clinic"
const TITLE = "Clinic Management System - Free for Small Clinics | Smapey"
const DESCRIPTION = "Smapey Clinic Manager is a free clinic management system for small and mid-size medical practices. Manage patients, doctors, appointments, and a live queue board, all in one dashboard."

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
          softwareApplicationSchema({
            name: "Clinic Management System",
            description: DESCRIPTION,
            path: PATH,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <ClinicManagerContent />
    </>
  )
}
