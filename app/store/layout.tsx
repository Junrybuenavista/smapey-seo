import "../globals.css"

export const metadata = {
  title: "Smapey Store Manager",
  description: "Inventory and POS management software, track stock, ring up sales, manage suppliers, and monitor daily revenue for small retail stores.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
