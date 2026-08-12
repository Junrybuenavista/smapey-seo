import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import TeachersContent from "./TeachersContent"
import { FAQS } from "./faqs"

const PATH = "/essay/ai-essay-grader-for-teachers"
const TITLE = "AI Essay Grader for Teachers | Save Hours on Grading | Smapey"
const DESCRIPTION = "The AI essay grader for teachers, score student essays instantly, deliver rubric-based feedback, and track class progress. Free plan available, no credit card required."

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
      <TeachersContent />
    </>
  )
}
