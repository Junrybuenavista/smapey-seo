import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"
import { NAME_COUNT } from "./names"

const PATH = "/car-wash/car-wash-name-ideas"
const TITLE = `Car Wash Name Ideas: ${NAME_COUNT} Catchy, Unique and Filipino Names | Smapey`
const DESCRIPTION = `${NAME_COUNT} car wash name ideas: classic, catchy, Filipino and Taglish, motor wash, detailing and mobile names, plus package names, taglines, and how to check a name is free with the DTI.`

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
