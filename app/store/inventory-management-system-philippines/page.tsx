import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import InventoryManagementSystemPhilippinesContent from "./InventoryManagementSystemPhilippinesContent"
import { FAQS } from "../faqs"

const PATH = "/store/inventory-management-system-philippines"
const TITLE = "Inventory Management System Philippines with Utang Tracker - Free | Smapey"
const DESCRIPTION = "Free inventory management system for Philippine sari-sari stores, retail shops, and mini groceries. Track stock, ring up sales in pesos, record suki utang and payments, accept GCash and Maya, and view analytics. No card required."

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
      <InventoryManagementSystemPhilippinesContent />
    </>
  )
}
