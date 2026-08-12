import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import AffiliateContent from "./AffiliateContent"

const PATH = "/affiliate"
const TITLE = "Affiliate Program | Earn Recurring Commissions - Smapey"
const DESCRIPTION = "Refer businesses to Smapey and earn recurring commissions on every paying customer you send our way. Join the Smapey affiliate program, free to start."

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
      <AffiliateContent />
    </>
  )
}
