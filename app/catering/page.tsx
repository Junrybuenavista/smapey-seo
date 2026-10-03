import JsonLd from "@/components/JsonLd"
import {
  buildMetadata,
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo"
import CateringContent from "./CateringContent"
import { FAQS } from "./faqs"

import { postsForHub } from "@/lib/blog"

const PATH = "/catering"
const TITLE = "Catering Services Philippines - Booking & Management Software | Smapey"
const DESCRIPTION = "Catering software for Philippine caterers: online quotes, a booking calendar, recipes and market lists, payment milestones, and staff payouts. Start free."

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
            name: "Catering Manager",
            description: DESCRIPTION,
            path: PATH,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <CateringContent guides={guides} />
    </>
  )
}
