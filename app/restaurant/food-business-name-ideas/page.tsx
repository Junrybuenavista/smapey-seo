import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"
import { NAME_COUNT } from "./names"

const PATH = "/restaurant/food-business-name-ideas"
const TITLE = `Food Business Name Ideas: ${NAME_COUNT} Catchy and Filipino Names | Smapey`
const DESCRIPTION = `${NAME_COUNT} food business name ideas for the Philippines: carinderia and silog, street food carts, bakery, milk tea, homemade and bigasan names, with every Filipino word explained, plus menu group names, taglines, and how to check a name is free with the DTI.`

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
})

export default function Page() {
  return (
    <>
      <JsonLd schema={[faqSchema(FAQS), breadcrumbSchema(PATH)]} />
      <Content />
    </>
  )
}
