import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import LendingMoneyAppsPhilippinesContent from "./LendingMoneyAppsPhilippinesContent"

const PATH = "/lending/lending-money-apps-philippines"
const TITLE = "Lending Money Apps Philippines - for Lenders | Smapey"
const DESCRIPTION = "A lending money app for Filipino lenders. Issue loans, track repayments by GCash, cash, or bank, and manage borrowers and collections from one dashboard. Free plan available."

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
      <LendingMoneyAppsPhilippinesContent />
    </>
  )
}
