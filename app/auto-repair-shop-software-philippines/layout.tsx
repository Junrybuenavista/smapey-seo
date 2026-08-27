import "../globals.css"

export const metadata = {
  title: "Smapey",
  description: "Auto repair shop software for Philippine car shops",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
