import JsonLd from "@/components/JsonLd"
import { buildMetadata, softwareApplicationSchema, breadcrumbSchema, faqSchema } from "@/lib/seo"
import RestaurantContent from "./RestaurantContent"
import { FAQS } from "@/components/restaurant/faqs"

import { postsForHub } from "@/lib/blog"

const PATH = "/restaurant"
const TITLE = "Food Ordering Manager | Menu, Orders & Kitchen Queue | Smapey"
const DESCRIPTION = "Smapey Food Ordering Manager: counter and QR phone orders, a kitchen screen, TV order calling, GCash, and daily sales for small restaurants. Start free."

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
            name: "Food Ordering Manager",
            description: DESCRIPTION,
            path: PATH,
          }),
          breadcrumbSchema(PATH),
          // Only here: the other restaurant pages show these same questions, and
          // Google wants one marked-up copy of repeated FAQs per site.
          faqSchema(FAQS),
        ]}
      />
      <RestaurantContent guides={guides} />
    </>
  )
}
