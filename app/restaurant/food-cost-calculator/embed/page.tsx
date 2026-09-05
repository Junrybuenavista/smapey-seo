import type { Metadata } from "next"
import FoodCostCalculator from "../FoodCostCalculator"

/**
 * Bare version for iframing on other sites. Deliberately noindex: the canonical
 * tool lives at /restaurant/food-cost-calculator, and two indexable copies of
 * the same thing would compete with each other.
 */
export const metadata: Metadata = {
  title: "Food Cost Calculator",
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <main style={{ background: "#fff" }}>
      <FoodCostCalculator embed />
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
          href="https://smapey.com/restaurant/food-cost-calculator"
          target="_blank"
          rel="noopener"
          style={{ color: "#2f6bff", fontWeight: 700 }}
        >
          Food cost calculator
        </a>{" "}
        by Smapey
      </p>
    </main>
  )
}
