import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import BoardingHousePlanContent from "./BoardingHousePlanContent"

const PATH = "/boarding-house/boarding-house-business-plan-sample-philippines"
const TITLE = "Boarding House Business Plan Sample Philippines - Free Template | Smapey"
const DESCRIPTION = "Sample boarding house business plan for the Philippines. Covers business overview, target market, services, pricing, and how to use a management system to run it efficiently."

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
      <BoardingHousePlanContent />
    </>
  )
}
