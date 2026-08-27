import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import GuideContent from "./GuideContent"

const PATH = "/repair-shop-software/guide"
const TITLE = "Repair Shop Software Guide | How to Use Smapey Garage"
const DESCRIPTION = "A plain-English, step-by-step guide to running an auto or motorcycle repair shop with Smapey - shop setup, taking a unit in, quoting, parts and stock, mechanics and commission, service reminders, and the numbers."

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
