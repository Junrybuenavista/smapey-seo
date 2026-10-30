import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import GuideContent from "./GuideContent"

const PATH = "/restaurant/guide"
const TITLE = "Food Ordering Manager Guide | How It Works | Smapey"
const DESCRIPTION = "How to run your restaurant or caf\u00e9 with Smapey: build your menu, take counter and phone orders, run the kitchen screen, call numbers on a TV, track sales."

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
