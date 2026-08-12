import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import GuideContent from "./GuideContent"

const PATH = "/massage/guide"
const TITLE = "Massage & Spa App Guide | How It Works | Smapey"
const DESCRIPTION = "A complete guide to running your massage business with software. Learn how to set up services, manage therapists and clients, publish your public booking page, and accept inquiries."

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
