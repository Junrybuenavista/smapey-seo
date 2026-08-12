import "../globals.css"

export const metadata = {
  title: "Smapey Massage & Spa",
  description: "Massage and spa management software, therapists, appointments, and a public booking page.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
