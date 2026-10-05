import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import GuideContent from "./GuideContent"

const PATH = "/car-wash/guide"
const TITLE = "Smapey Carwash Guide | How to Use the Car Wash POS"
const DESCRIPTION = "A plain-English, step-by-step guide to running a car wash or motor wash with Smapey: the price board, taking cars in by plate, the queue, crew share, the stamp card, ready texts and closing the day."

export const metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
})

export default function Page() {
  return (
    <>
      <JsonLd schema={[breadcrumbSchema(PATH)]} />
      <GuideContent />
    </>
  )
}
