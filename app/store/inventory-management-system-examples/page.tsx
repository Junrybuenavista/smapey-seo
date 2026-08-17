import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import InventoryManagementSystemExamplesContent from "./InventoryManagementSystemExamplesContent"
import { FAQS } from "../faqs"

const PATH = "/store/inventory-management-system-examples"
const TITLE = "Inventory Management System Examples for Small Stores | Smapey"
const DESCRIPTION = "Real-world inventory management system examples for sari-sari stores, hardware shops, mini groceries, and boutiques, from stock takes to suki utang, and how Smapey handles each use case for free."

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
      <InventoryManagementSystemExamplesContent />
    </>
  )
}
