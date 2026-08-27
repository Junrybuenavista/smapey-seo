import JsonLd from "@/components/JsonLd"
import {
  buildMetadata,
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo"
import MotorcycleContent from "./MotorcycleContent"
import { FAQS } from "./faqs"

const PATH = "/motorcycle-repair-shop-software-philippines"
const TITLE = "Motorcycle Repair Shop Software Philippines | Job Orders & Service History | Smapey"
const DESCRIPTION = "Motorcycle repair shop software for Philippine motor shops. Job orders with parts and labour, service history by plate, chain and sprocket to valve adjustment, PMS reminders at 2,000 km. Free plan, no credit card."

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
            name: "Motorcycle Repair Shop Software",
            description: DESCRIPTION,
            path: PATH,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <MotorcycleContent />
    </>
  )
}
