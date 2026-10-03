import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import CateringManagementSystemContent from "./CateringManagementSystemContent"
import { FAQS } from "./faqs"

const PATH = "/catering/catering-management-system"
const TITLE = "Catering Management System - Free for Philippine Caterers | Smapey"
const DESCRIPTION = "Catering management system for Philippine caterers: bookings and calendar, online quotes, recipes and market lists, payment milestones, and staff payouts."

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
