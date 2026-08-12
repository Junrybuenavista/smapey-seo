import JsonLd from "@/components/JsonLd"
import { buildMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo"
import BeautySalonManagementAppContent from "./BeautySalonManagementAppContent"
import { FAQS } from "./faqs"

const PATH = "/salon/beauty-salon-management-app"
const TITLE = "Beauty Salon Management App | Software for Beauty Salons | Smapey"
const DESCRIPTION = "Smapey is a beauty salon management app with appointment scheduling, client records, service menu, and a public booking page. Built for small beauty salons and studios."

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
          faqSchema(FAQS),
          breadcrumbSchema(PATH),
        ]}
      />
      <BeautySalonManagementAppContent />
    </>
  )
}
