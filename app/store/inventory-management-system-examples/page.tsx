import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import InventoryManagementSystemExamplesContent from "./InventoryManagementSystemExamplesContent"

const PATH = "/store/inventory-management-system-examples"
const TITLE = "Inventory Management System Examples for Small Stores | Smapey"
const DESCRIPTION = "Real-world inventory management system examples for sari-sari stores, hardware shops, mini groceries, and boutiques, and how Smapey handles each use case for free."

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
      <InventoryManagementSystemExamplesContent />
    </>
  )
}
