import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import FreeInventoryManagementSystemContent from "./FreeInventoryManagementSystemContent"
import { FAQS } from "../faqs"

const PATH = "/store/free-inventory-management-system"
const TITLE = "Free Inventory Management System for Small Stores | Smapey"
const DESCRIPTION = "Smapey offers a permanently free inventory management system, track up to 50 products, 200 sales per month, low stock alerts, POS, supplier management, and unlimited customer utang tracking. No credit card required."

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
      <FreeInventoryManagementSystemContent />
    </>
  )
}
