import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import GuideContent from "./GuideContent"

const PATH = "/laundry/guide"
const TITLE = "Laundry Shop App Guide | How to Manage a Laundry Business | Smapey"
const DESCRIPTION = "A complete guide to running a laundry shop with software, order tracking, customer SMS, payment collection, and growing your laundry business."

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
