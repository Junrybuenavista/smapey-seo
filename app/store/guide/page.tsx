import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import GuideContent from "./GuideContent"

const PATH = "/store/guide"
const TITLE = "Inventory & POS Manager Guide | How It Works | Smapey"
const DESCRIPTION = "A complete guide to running your retail store with Smapey. Learn how to add products, set up categories and suppliers, ring up sales on the POS, and track daily revenue."

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
      <GuideContent />
    </>
  )
}
