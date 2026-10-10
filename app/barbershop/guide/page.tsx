import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import GuideContent from "./GuideContent"

const PATH = "/barbershop/guide"
const TITLE = "Smapey Barbershop Guide | How to Use the Barbershop System"
const DESCRIPTION = "A plain-English, step-by-step guide to running a barbershop with Smapey: set-up, barbers and commission, the walk-in queue, payment, closing, customer texts, the online page, products and Analytics."

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
