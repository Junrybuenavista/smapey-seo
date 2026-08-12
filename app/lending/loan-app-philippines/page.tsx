import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import LoanAppPhilippinesContent from "./LoanAppPhilippinesContent"

const PATH = "/lending/loan-app-philippines"
const TITLE = "Loan App Philippines - Software for Lenders | Smapey"
const DESCRIPTION = "The loan app for lenders in the Philippines. Issue loans, generate amortization schedules, track GCash and bank payments, and manage borrowers. Free plan, no credit card."

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
      <LoanAppPhilippinesContent />
    </>
  )
}
