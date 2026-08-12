import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import CateringManagementSystemContent from "./CateringManagementSystemContent"
import { FAQS } from "./faqs"

const PATH = "/catering/catering-management-system"
const TITLE = "Catering Management System - Free for Philippine Caterers | Smapey"
const DESCRIPTION = "Smapey is a catering management system for Philippine catering businesses. Manage bookings, packages, payment milestones, supply catalog, and staff, all in one dashboard."

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
      <CateringManagementSystemContent />
    </>
  )
}
