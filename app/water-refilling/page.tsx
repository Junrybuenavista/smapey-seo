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
const TITLE = "Water Refilling Station Software Philippines | Smapey"
const DESCRIPTION = "Track deliveries, customers, container deposits and returns for your water refilling station. Accept GCash or cash. Free plan, no card needed."

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
