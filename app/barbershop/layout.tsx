import "../globals.css"

export const metadata = {
  title: "Smapey Barbershop",
  description: "Barbershop queue, POS and commission system for Philippine barbershops",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
