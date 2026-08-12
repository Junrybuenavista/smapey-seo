import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import CarRentalGuideContent from "./CarRentalGuideContent"

const PATH = "/car-rental/guide"
const TITLE = "Car Rental Software Guide - How to Use Smapey Car Rental | Smapey"
const DESCRIPTION = "Step-by-step guide on how to use Smapey Car Rental. Learn how to add vehicles, create reservations, track deposits, handle overdue rentals, and read your revenue dashboard."

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
      <CarRentalGuideContent />
    </>
  )
}
