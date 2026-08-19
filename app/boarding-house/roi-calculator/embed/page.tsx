import type { Metadata } from "next"
import RoiCalculator from "../RoiCalculator"

/**
 * Bare version for iframing on other sites. Deliberately noindex: the canonical
 * tool lives at /boarding-house/roi-calculator, and two indexable copies of the
 * same thing would compete with each other.
 */
export const metadata: Metadata = {
  title: "Boarding House ROI Calculator",
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <main style={{ background: "#fff" }}>
      <RoiCalculator embed />
      <p style={{ fontFamily: "'Hanken Grotesk', system-ui, sans-serif", fontSize: 12, textAlign: "center", padding: "0 20px 20px", color: "#54514c" }}>
        <a href="https://smapey.com/boarding-house/roi-calculator" target="_blank" rel="noopener" style={{ color: "#2f6bff", fontWeight: 700 }}>
          Boarding house ROI calculator
        </a>{" "}
        by Smapey
      </p>
    </main>
  )
}
