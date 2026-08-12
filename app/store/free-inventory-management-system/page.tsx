import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import FreeInventoryManagementSystemContent from "./FreeInventoryManagementSystemContent"

const PATH = "/store/free-inventory-management-system"
const TITLE = "Free Inventory Management System for Small Stores | Smapey"
const DESCRIPTION = "Smapey offers a permanently free inventory management system, track up to 50 products, 200 sales per month, low stock alerts, POS, and supplier management. No credit card required."

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
      <FreeInventoryManagementSystemContent />
    </>
  )
}
