import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import CollegeEssayContent from "./CollegeEssayContent"
import { FAQS } from "./faqs"

const PATH = "/essay/ai-college-essay-grader"
const TITLE = "AI College Essay Grader | Admissions-Level Feedback | Smapey"
const DESCRIPTION = "Smapey Essay grades college essays with AI, evaluating hook, narrative clarity, authenticity, and structure. Help students write college essays that stand out."

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
      <CollegeEssayContent />
    </>
  )
}
