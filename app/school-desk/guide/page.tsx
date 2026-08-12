import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import GuideContent from "./GuideContent"

const PATH = "/school-desk/guide"
const TITLE = "Tutorial Center Software Guide | How to Use Smapey SchoolDesk"
const DESCRIPTION = "A plain-English, step-by-step guide to running a tutorial center or tutoring business with Smapey SchoolDesk, programs, student enrollment, session scheduling, attendance, tuition tracking, progress notes, and the dashboard."

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
          breadcrumbSchema(PATH),
        ]}
      />
      <GuideContent />
    </>
  )
}
