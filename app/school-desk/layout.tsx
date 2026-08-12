import "../globals.css"

export const metadata = {
  title: "Smapey SchoolDesk",
  description: "Tutorial center and tutor management software for the Philippines",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
