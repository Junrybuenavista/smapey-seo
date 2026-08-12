import JsonLd from "@/components/JsonLd"
import { buildMetadata, softwareApplicationSchema, breadcrumbSchema } from "@/lib/seo"
import LendingContent from "./LendingContent"

const PATH = "/lending"
const TITLE = "Lending & Loan Management Software | Smapey"
const DESCRIPTION = "Smapey Lending is the software to run your own lending business, borrowers, loans, amortization schedules, payment tracking, and collections analytics. Free plan available."

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
