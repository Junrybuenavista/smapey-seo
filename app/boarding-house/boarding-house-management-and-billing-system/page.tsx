import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import BoardingHouseBillingContent from "./BoardingHouseBillingContent"

const PATH = "/boarding-house/boarding-house-management-and-billing-system"
const TITLE = "Boarding House Management and Billing System - Free | Smapey"
const DESCRIPTION = "Smapey is a boarding house management and billing system for the Philippines. Manage rooms, tenants, and issue rent and utility bills, all in one dashboard."

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
      <BoardingHouseBillingContent />
    </>
  )
}
