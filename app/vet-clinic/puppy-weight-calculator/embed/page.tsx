import type { Metadata } from "next"
import PuppyWeightCalculator from "../PuppyWeightCalculator"

/**
 * Bare version for iframing elsewhere. Deliberately noindex - the canonical
 * tool lives at /vet-clinic/puppy-weight-calculator, and two indexable copies
 * of it would compete with each other.
 */
export const metadata: Metadata = {
  title: "Puppy Weight Calculator",
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <main style={{ background: "#fff" }}>
      <PuppyWeightCalculator embed />
      <p
        style={{
          fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
          fontSize: 12,
          textAlign: "center",
          padding: "0 20px 20px",
          color: "#54514c",
        }}
      >
        <a
          href="https://smapey.com/vet-clinic/puppy-weight-calculator"
          target="_blank"
          rel="noopener"
          style={{ color: "#2f6bff", fontWeight: 700 }}
        >
          Puppy weight calculator
        </a>{" "}
        by Smapey
      </p>
    </main>
  )
}
