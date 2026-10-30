import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import OnlineOrderingSystemContent from "./OnlineOrderingSystemContent"

const PATH = "/restaurant/online-ordering-system"
const TITLE = "Online Ordering System for Restaurants & Caf\u00e9s | Smapey"
const DESCRIPTION = "Online ordering system for small restaurants and caf\u00e9s. Customers order from their phone with one QR code, pay by GCash, and hear their number called."

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
      <OnlineOrderingSystemContent />
    </>
  )
}
