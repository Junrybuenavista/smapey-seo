import "../globals.css"

export const metadata = {
  title: "Smapey Boarding House Manager",
  description: "Boarding house management system for rooms, tenants, rent billing, and utility tracking in the Philippines.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
