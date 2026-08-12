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
const DESCRIPTION = "Smapey Essay is an AI essay grader that scores student work instantly, rubric-based feedback, OCR for handwritten essays, and class analytics. Start free, no credit card required."

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
