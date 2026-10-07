import JsonLd from "@/components/JsonLd"
import {
  buildMetadata,
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo"
import LaundryContent from "./LaundryContent"
import { FAQS } from "./faqs"

import { postsForHub } from "@/lib/blog"

const PATH = "/laundry"
const TITLE = "Laundry App & Shop Management Software | Smapey"
const DESCRIPTION = "Track laundry orders, send SMS when loads are ready, manage customers and accept GCash or cash. Built for small Philippine shops. Free plan."

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
            name: "Laundry Shop App",
            description: DESCRIPTION,
            path: PATH,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <LaundryContent guides={guides} />
    </>
  )
}
