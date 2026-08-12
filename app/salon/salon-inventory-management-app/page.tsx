import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import SalonInventoryManagementAppContent from "./SalonInventoryManagementAppContent"
import { FAQS } from "./faqs"

const PATH = "/salon/salon-inventory-management-app"
const TITLE = "Salon Inventory Management App | Service & Product Tracking | Smapey"
const DESCRIPTION = "Smapey helps salons manage their service menu, track what's being used, and stay organized, a simple salon inventory management app for small beauty businesses."

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
      <SalonInventoryManagementAppContent />
    </>
  )
}
