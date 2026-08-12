import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import OnlineLendingAppsPhilippinesContent from "./OnlineLendingAppsPhilippinesContent"

const PATH = "/lending/online-lending-apps-philippines"
const TITLE = "Online Lending Apps Philippines - for Lenders | Smapey"
const DESCRIPTION = "Run your online lending business in the Philippines. Smapey is a cloud lending app for lenders, borrowers, loans, amortization, and collections from any device. Free plan available."

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
      <OnlineLendingAppsPhilippinesContent />
    </>
  )
}
