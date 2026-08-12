import JsonLd from "@/components/JsonLd"
import {
  buildMetadata,
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo"
import AirbnbContent from "./AirbnbContent"
import { FAQS } from "./faqs"

const PATH = "/airbnb"
const TITLE = "Airbnb & Short-term Rental Management Software | Smapey"
const DESCRIPTION = "Smapey Airbnb is a management app for short-term rental hosts. Track properties, guests, and reservations, with double-booking protection and revenue analytics. Free plan available."

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
            name: "Airbnb Management Software",
            description: DESCRIPTION,
            path: PATH,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <AirbnbContent />
    </>
  )
}
