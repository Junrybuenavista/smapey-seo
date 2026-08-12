import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import CateringManagementBillingContent from "./CateringManagementBillingContent"
import { FAQS } from "./faqs"

const PATH = "/catering/catering-management-and-billing-system"
const TITLE = "Catering Management and Billing System - Free for Philippine Caterers | Smapey"
const DESCRIPTION = "Smapey combines catering management and billing in one system, bookings, packages, payment milestones, supply catalog, and staff assignment. Free plan available."

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
      <CateringManagementBillingContent />
    </>
  )
}
