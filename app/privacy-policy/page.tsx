import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import PrivacyContent from "./PrivacyContent"

const PATH = "/privacy-policy"
const TITLE = "Privacy Policy | Smapey"
const DESCRIPTION = "Learn how Smapey collects, uses, and protects your personal data across all Smapey business management tools."

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
      <PrivacyContent />
    </>
  )
}
