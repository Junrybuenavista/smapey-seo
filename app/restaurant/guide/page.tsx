import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import GuideContent from "./GuideContent"

const PATH = "/restaurant/guide"
const TITLE = "Food Ordering Manager Guide | How It Works | Smapey"
const DESCRIPTION = "A complete guide to running your restaurant or caf\u00e9 with Smapey. Learn how to build your menu, place dine-in and takeaway orders, manage the kitchen queue, and track daily sales."

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
