import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import InventoryManagementSystemsContent from "./InventoryManagementSystemsContent"

const PATH = "/store/inventory-management-systems"
const TITLE = "Inventory Management Systems for Small Retailers | Smapey"
const DESCRIPTION = "Compare inventory management systems for small businesses. Smapey offers stock tracking, POS, low stock alerts, supplier management, and sales analytics, free to start."

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
      <InventoryManagementSystemsContent />
    </>
  )
}
