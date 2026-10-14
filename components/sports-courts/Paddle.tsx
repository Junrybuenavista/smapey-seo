import { createLucideIcon } from "lucide-react"

// The paddle the app uses for Sports Courts (src/components/icons/Paddle.tsx
// in the frontend). Lucide has no paddle or racket, so it's drawn on lucide's
// 24px grid with lucide's own helper: it takes the same className, size and
// strokeWidth as every other icon.
export const Paddle = createLucideIcon("Paddle", [
  ["rect", { x: "3", y: "2", width: "11", height: "13", rx: "5.5", key: "pd-face" }],
  ["path", { d: "M8.5 15v4", key: "pd-neck" }],
  ["path", { d: "M7 19h3v3H7z", key: "pd-grip" }],
  ["circle", { cx: "18.5", cy: "17.5", r: "2.5", key: "pd-ball" }],
])
