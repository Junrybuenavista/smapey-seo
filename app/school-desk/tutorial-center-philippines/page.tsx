import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/school-desk/tutorial-center-philippines"
const TITLE = "Tutorial Center Philippines: Complete Guide to Running One (2026)"
const DESCRIPTION = "Everything about running a tutorial center in the Philippines, what it is, how it makes money, what you need, and the software that manages students, tuition, sessions, and attendance. Free plan available."

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
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <Content />
    </>
  )
}
