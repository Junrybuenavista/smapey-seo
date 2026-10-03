import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import CateringManagementBillingContent from "./CateringManagementBillingContent"
import { FAQS } from "./faqs"

const PATH = "/catering/catering-management-and-billing-system"
const TITLE = "Catering Management and Billing System - Free for Philippine Caterers | Smapey"
const DESCRIPTION = "Catering management and billing in one system: quotes with a payment schedule, a booking calendar, payment milestones, recipes and food cost, and staff payouts."

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
