import JsonLd from "@/components/JsonLd"
import {
  buildMetadata,
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo"
import CarWashContent from "./CarWashContent"
import { FAQS } from "./faqs"

const PATH = "/car-wash"
const TITLE = "Car Wash POS & Management System Philippines | Smapey Carwash"
const DESCRIPTION = "Car wash POS and management system for Philippine car wash and motor wash shops. Records by plate, a price board by vehicle size, crew share per car and end-of-day closing. Free plan."

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
            name: "Smapey Carwash",
            description: DESCRIPTION,
            path: PATH,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <CarWashContent />
    </>
  )
}
