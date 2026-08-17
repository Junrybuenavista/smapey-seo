import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import InventoryManagementSystemContent from "./InventoryManagementSystemContent"
import { FAQS } from "../faqs"

const PATH = "/store/inventory-management-system"
const TITLE = "Inventory Management System - Free for Small Stores | Smapey"
const DESCRIPTION = "Smapey is a free inventory management system for small retail stores. Track stock levels, get low stock alerts, manage suppliers, run a POS, record customer utang, and view sales analytics, no card required."

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
      <InventoryManagementSystemContent />
    </>
  )
}
