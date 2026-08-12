import "../globals.css"

export const metadata = {
  title: "Smapey",
  description: "Laundry shop management software for small businesses",
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
