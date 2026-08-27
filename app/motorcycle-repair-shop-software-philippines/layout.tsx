import "../globals.css"

export const metadata = {
  title: "Smapey",
  description: "Motorcycle repair shop software for Philippine motor shops",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
