import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import GuideContent from "./GuideContent"

const PATH = "/essay/guide"
const TITLE = "How to Use Smapey Essay | Step-by-Step Guide"
const DESCRIPTION = "Learn how to create assignments, evaluate student essays with AI, scan handwritten work with your camera, and review results, step by step."

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
