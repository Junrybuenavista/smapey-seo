import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import PricingContent from "./PricingContent"

const PATH = "/invoice/pricing"
const TITLE = "Invoice Software Pricing | Smapey"
const DESCRIPTION = "Simple and affordable invoicing software pricing. Create invoices, track payments, and grow your business with Smapey."

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
      <PricingContent />
    </>
  )
}
