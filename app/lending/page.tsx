import JsonLd from "@/components/JsonLd"
import { buildMetadata, softwareApplicationSchema, breadcrumbSchema } from "@/lib/seo"
import LendingContent from "./LendingContent"

const PATH = "/lending"
const TITLE = "Lending & Loan Management Software | Smapey"
const DESCRIPTION = "Run your lending business: borrowers, loans, amortization schedules, payment tracking and collections. Software for lenders, not a loan app. Free plan."

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
          softwareApplicationSchema({
            name: "Lending Management Software",
            description: DESCRIPTION,
            path: PATH,
          }),
          breadcrumbSchema(PATH),
        ]}
      />
      <LendingContent />
    </>
  )
}
