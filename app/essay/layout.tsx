import "../globals.css"

export const metadata = {
  title: "Smapey Essay",
  description: "AI-powered essay feedback tool for teachers and educators",
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
