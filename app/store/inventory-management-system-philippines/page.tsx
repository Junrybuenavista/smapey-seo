import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import InventoryManagementSystemPhilippinesContent from "./InventoryManagementSystemPhilippinesContent"

const PATH = "/store/inventory-management-system-philippines"
const TITLE = "Inventory Management System Philippines - Free | Smapey"
const DESCRIPTION = "Free inventory management system for Philippine sari-sari stores, retail shops, and mini groceries. Track stock, ring up sales in pesos, manage suppliers, and view analytics. No card required."

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
      <InventoryManagementSystemPhilippinesContent />
    </>
  )
}
