import JsonLd from "@/components/JsonLd"
import {
  buildMetadata,
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo"
import AutoRepairContent from "./AutoRepairContent"
import { FAQS } from "./faqs"

const PATH = "/auto-repair-shop-software-philippines"
const TITLE = "Auto Repair Shop Software Philippines | Job Orders & Service History | Smapey"
const DESCRIPTION = "Auto repair shop software for Philippine car shops. Job orders with parts and labour, full service history by plate number, parts inventory with margin, and GCash or cash payments. Free plan, no credit card."

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
            name: "Auto Repair Shop Software",
            description: DESCRIPTION,
            path: PATH,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <AutoRepairContent />
    </>
  )
}
