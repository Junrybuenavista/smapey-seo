import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/car-wash/car-wash-price-list-philippines"
const TITLE = "Car Wash Price List Philippines: Typical Prices by Vehicle Size | Smapey"
const DESCRIPTION = "Typical car wash prices in the Philippines by vehicle size: wash, wash and vacuum, wax, engine wash, interior detailing and motor wash, averaged from published shop price lists, with sources."

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
})

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <Content />
    </>
  )
}
