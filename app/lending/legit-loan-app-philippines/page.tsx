import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import LegitLoanAppPhilippinesContent from "./LegitLoanAppPhilippinesContent"

const PATH = "/lending/legit-loan-app-philippines"
const TITLE = "Legit Loan App Philippines - for Lending Businesses | Smapey"
const DESCRIPTION = "A legit, professional loan management app for lending businesses in the Philippines. Keep clean records, amortization schedules, and an auditable payment history. Free plan available."

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
      <LegitLoanAppPhilippinesContent />
    </>
  )
}
