import "../globals.css"

export const metadata = {
  title: "Smapey Booking",
  description: "Appointment scheduling software for clinics, salons, and small businesses",
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
