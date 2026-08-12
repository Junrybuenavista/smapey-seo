import "../globals.css"

export const metadata = {
  title: "Smapey SalonOS",
  description: "Salon management software for small salons and beauty studios",
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
