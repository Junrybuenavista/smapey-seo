import { Metadata } from "next"
import SalonPageContent from "./SalonPageContent"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `Book an Appointment - ${slug} | Smapey`,
    description: `Browse services and send a booking request to ${slug}.`,
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <SalonPageContent slug={slug} />
}
