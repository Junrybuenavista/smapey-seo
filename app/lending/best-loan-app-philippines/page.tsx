import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import BestLoanAppPhilippinesContent from "./BestLoanAppPhilippinesContent"

const PATH = "/lending/best-loan-app-philippines"
const TITLE = "Best Loan App Philippines - for Lending Businesses | Smapey"
const DESCRIPTION = "Looking for the best loan app in the Philippines to run your lending business? Smapey gives lenders amortization schedules, payment tracking, and collections analytics. Free plan."

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
      <BestLoanAppPhilippinesContent />
    </>
  )
}
