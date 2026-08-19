import JsonLd from "@/components/JsonLd"
import {
  buildMetadata,
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo"
import BoardingHouseContent from "./BoardingHouseContent"
import { FAQS } from "./faqs"

const PATH = "/boarding-house"
const TITLE = "Boarding House Management System for Philippine Landlords | Smapey"
const DESCRIPTION = "Smapey Boarding House Manager is a free boarding house management system for the Philippines. Rooms and beds, tenant ledgers, rent billing with automatic email statements, utility Quick Fill and Excel import, cashflow and expense tracking, and maintenance with QR issue reporting."

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
          softwareApplicationSchema({
            name: "Boarding House Management System",
            description: DESCRIPTION,
            path: PATH,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <BoardingHouseContent />
    </>
  )
}
