import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import GuideContent from "./GuideContent"

const PATH = "/airbnb/guide"
const TITLE = "Airbnb Management Software Guide | How It Works | Smapey"
const DESCRIPTION = "A complete guide to managing your short-term rental properties with software. Learn how to list properties, manage guests, create reservations, handle check-ins, and track revenue."

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
