import JsonLd from "@/components/JsonLd"
import {
  buildMetadata,
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo"
import SchoolDeskContent from "./SchoolDeskContent"
import { FAQS } from "./faqs"

const PATH = "/school-desk"
const TITLE = "Tutorial Center & Tutor Management Software Philippines | Smapey SchoolDesk"
const DESCRIPTION = "Smapey SchoolDesk is management software for tutorial centers and home tutors in the Philippines. Track student enrollments, sessions, tuition fees, attendance, and progress, free plan available."

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
            name: "Tutorial Center & Tutor Software",
            description: DESCRIPTION,
            path: PATH,
          }),
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <SchoolDeskContent />
    </>
  )
}
