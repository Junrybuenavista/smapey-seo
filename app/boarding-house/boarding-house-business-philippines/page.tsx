import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import BoardingHouseBusinessContent from "./BoardingHouseBusinessContent"

const PATH = "/boarding-house/boarding-house-business-philippines"
const TITLE = "Boarding House Business in the Philippines - How to Run One Profitably | Smapey"
const DESCRIPTION = "Starting a boarding house business in the Philippines? Learn how to manage rooms, tenants, rent collection, and utility billing, and how Smapey makes it easier."

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
      <BoardingHouseBusinessContent />
    </>
  )
}
