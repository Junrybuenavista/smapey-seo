import "../globals.css"

export const metadata = {
  title: "Smapey Water",
  description: "Water refilling station management software for the Philippines",
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
