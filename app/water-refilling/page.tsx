import JsonLd from "@/components/JsonLd"
import {
  buildMetadata,
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo"
import WaterContent from "./WaterContent"
import { FAQS } from "./faqs"

import { postsForHub } from "@/lib/blog"

const PATH = "/water-refilling"
const TITLE = "Water Refilling Station Software Philippines | Smapey Water Manager"
const DESCRIPTION = "Smapey is water refilling station management software for the Philippines. Track deliveries, customers, container deposits, returns, and inventory, and accept GCash or cash. Free plan available."

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
})

export default async function Page() {
  const guides = await postsForHub(PATH)

  return (
    <>
      <JsonLd
        schema={[
          softwareApplicationSchema({
            name: "Water Refilling Station Software",
            description: DESCRIPTION,
            path: PATH,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <WaterContent guides={guides} />
    </>
  )
}
