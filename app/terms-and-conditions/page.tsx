import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import TermsContent from "./TermsContent"

const PATH = "/terms-and-conditions"
const TITLE = "Terms and Conditions | Smapey"
const DESCRIPTION = "Read the terms and conditions for using Smapey business management software, including accounts, billing, acceptable use, and service terms."

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
      <TermsContent />
    </>
  )
}
