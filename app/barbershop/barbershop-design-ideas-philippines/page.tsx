import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/barbershop/barbershop-design-ideas-philippines"
const TITLE = "Barbershop Design Ideas & Floor Plans (Philippines) | Smapey"
const DESCRIPTION = "Barbershop design ideas for a small Philippine shop: floor plans for 2, 3 and 5 chairs drawn to scale, the DOH layout rules, and where the renovation money goes, from chairs and mirrors to lighting and floors."

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
