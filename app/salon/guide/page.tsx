import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import GuideContent from "./GuideContent"

const PATH = "/salon/guide"
const TITLE = "Salon Management App Guide | How It Works | Smapey SalonOS"
const DESCRIPTION = "A complete guide to managing your salon with software. Learn how to set up appointments, manage clients, publish your public booking page, and grow your salon business."

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
