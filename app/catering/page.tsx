import JsonLd from "@/components/JsonLd"
import {
  buildMetadata,
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo"
import CateringContent from "./CateringContent"
import { FAQS } from "./faqs"

const PATH = "/catering"
const TITLE = "Catering Services Philippines - Booking & Management Software | Smapey"
const DESCRIPTION = "Smapey Catering Manager helps Philippine catering businesses manage bookings, packages, supply catalog, payment milestones, and staff, all in one dashboard. Start free."

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
            name: "Catering Manager",
            description: DESCRIPTION,
            path: PATH,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <CateringContent />
    </>
  )
}
