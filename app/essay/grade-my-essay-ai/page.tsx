import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import GradeMyEssayContent from "./GradeMyEssayContent"
import { FAQS } from "./faqs"

const PATH = "/essay/grade-my-essay-ai"
const TITLE = "Grade My Essay with AI | Instant Score & Feedback | Smapey"
const DESCRIPTION = "Want to grade your essay with AI? Smapey Essay scores your writing instantly, rubric breakdown, grammar check, structure analysis, and improvement tips. Start free."

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
      <GradeMyEssayContent />
    </>
  )
}
