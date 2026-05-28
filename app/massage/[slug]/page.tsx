import { Metadata } from "next"
import MassagePageContent from "./MassagePageContent"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `Book a Session — ${slug} | Smapey`,
    description: `Browse services and send a booking request to ${slug}.`,
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return <MassagePageContent slug={slug} />
}
