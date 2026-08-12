import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import BoardingHouseSystemContent from "./BoardingHouseSystemContent"
import { FAQS } from "./faqs"

const PATH = "/boarding-house/boarding-house-management-system"
const TITLE = "Boarding House Management System - Free Plan Available | Smapey"
const DESCRIPTION = "Smapey is a boarding house management system that helps Philippine landlords manage rooms, tenants, rent billing, utility billing, and occupancy, all in one place."

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
      <BoardingHouseSystemContent />
    </>
  )
}
