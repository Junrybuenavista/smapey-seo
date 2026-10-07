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
const TITLE = "Boarding House Management System Philippines | Smapey"
const DESCRIPTION = "Free boarding house software for the Philippines: rooms and beds, tenant ledgers, rent billing with email statements, utilities and expense tracking."

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
