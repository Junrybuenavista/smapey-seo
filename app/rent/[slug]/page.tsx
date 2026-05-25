import { Metadata } from "next"
import RentPageContent from "./RentPageContent"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `Book a Car — ${slug} | Smapey`,
    description: `Browse available vehicles and send a booking request to ${slug}.`,
    robots: { index: false, follow: false },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <RentPageContent slug={slug} />
}
