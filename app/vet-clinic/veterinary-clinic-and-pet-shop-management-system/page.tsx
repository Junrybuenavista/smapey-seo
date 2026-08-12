import JsonLd from "@/components/JsonLd"
import { buildMetadata, breadcrumbSchema } from "@/lib/seo"
import VetPetShopContent from "./VetPetShopContent"

const PATH = "/vet-clinic/veterinary-clinic-and-pet-shop-management-system"
const TITLE = "Veterinary Clinic and Pet Shop Management System | Smapey"
const DESCRIPTION = "Smapey is a veterinary clinic and pet shop management system that tracks pets, appointments, vaccinations, grooming, and billing, built for vet clinics and pet care businesses."

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
      <VetPetShopContent />
    </>
  )
}
