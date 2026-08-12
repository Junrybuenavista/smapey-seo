import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/school-desk/how-to-start-tutorial-center-philippines"
const TITLE = "How to Start a Tutorial Center in the Philippines (2026 Step-by-Step Guide)"
const DESCRIPTION = "A step-by-step guide on how to start a tutorial center in the Philippines, capital, permits, location, hiring tutors, pricing, finding students, and the software to run it. Free plan available."

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
