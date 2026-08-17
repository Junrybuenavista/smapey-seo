import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import InventoryManagementSystemsContent from "./InventoryManagementSystemsContent"
import { FAQS } from "../faqs"

const PATH = "/store/inventory-management-systems"
const TITLE = "Inventory Management Systems for Small Retailers | Smapey"
const DESCRIPTION = "Compare inventory management systems for small businesses. Smapey offers stock tracking, POS, low stock alerts, supplier management, customer utang tracking, and sales analytics, free to start."

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
      <InventoryManagementSystemsContent />
    </>
  )
}
