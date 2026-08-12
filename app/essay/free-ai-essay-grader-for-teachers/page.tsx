import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import FreeTeachersContent from "./FreeTeachersContent"
import { FAQS } from "./faqs"

const PATH = "/essay/free-ai-essay-grader-for-teachers"
const TITLE = "Free AI Essay Grader for Teachers | No Credit Card | Smapey"
const DESCRIPTION = "Get a free AI essay grader for teachers, grade up to 30 essays per month, assign rubric criteria, and deliver structured feedback. Start free, no credit card required."

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
      <FreeTeachersContent />
    </>
  )
}
