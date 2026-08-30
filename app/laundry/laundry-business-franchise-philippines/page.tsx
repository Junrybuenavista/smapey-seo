import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import Content from "./Content"
import { FAQS } from "./faqs"

const PATH = "/laundry/laundry-business-franchise-philippines"
const TITLE = "Laundry Franchise & Business Packages in the Philippines | Smapey"
const DESCRIPTION = "Laundry franchises, equipment packages and turnkey setups in the Philippines: how they differ, what the ongoing royalty and marketing fees really cost, franchise versus independent, and what to ask before signing."

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
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <Content />
    </>
  )
}
