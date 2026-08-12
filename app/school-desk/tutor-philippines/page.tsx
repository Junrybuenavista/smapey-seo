import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/school-desk/tutor-philippines"
const TITLE = "Tutor in the Philippines: How to Start & Grow a Tutoring Business (2026)"
const DESCRIPTION = "Becoming a tutor in the Philippines, how to find students, set your rates, run sessions, and get paid. Plus the free software that tracks your students, tuition, and schedule."

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
