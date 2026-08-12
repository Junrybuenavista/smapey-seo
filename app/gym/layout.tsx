import "../globals.css"

export const metadata = {
  title: "Smapey GymOS",
  description:
    "Gym management software for member tracking, QR check-ins, subscriptions, and revenue reporting.",
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