import JsonLd from "@/components/JsonLd"
import {
  buildMetadata,
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo"
import EssayContent from "./EssayContent"
import { FAQS } from "./faqs"

const PATH = "/essay"
const TITLE = "AI Essay Grader | Instant Rubric Feedback | Smapey Essay"
const DESCRIPTION = "Grade student essays instantly with rubric-based AI feedback. Handwritten essays via OCR, class analytics, and a free plan with no credit card."

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
          softwareApplicationSchema({
            name: "Essay Feedback",
            description: DESCRIPTION,
            path: PATH,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <EssayContent />
    </>
  )
}
