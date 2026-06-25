"use client"

import { useEffect, useState } from "react"

// ── Layered Pop design tokens ──
const INK = "#161616"
const BLUE = "#2f6bff"
const AMBER = "#ff9e2c"
const CREAM = "#fbf7f0"
const display = { fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }

const PH_VIDEO =
  "https://res.cloudinary.com/dxhwfv0jo/video/upload/v1779445623/Gym_Management_Tagalog_dhn6ki.mp4"
const EN_VIDEO =
  "https://res.cloudinary.com/dxhwfv0jo/video/upload/v1779445619/Gym-Manangement_English_eljpsx.mp4"

export default function GymVideoSection() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [isPhilippines, setIsPhilippines] = useState<boolean | null>(null)

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""
    const lang = (typeof navigator !== "undefined" ? navigator.language : "").toLowerCase()
    const offsetHours = -new Date().getTimezoneOffset() / 60

    const localPH =
      tz === "Asia/Manila" ||
      lang.includes("-ph") ||
      lang.startsWith("fil") ||
      (offsetHours === 8 && tz.startsWith("Asia/"))

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/billing/geo`)
      .then((r) => r.json())
      .then((d) => {
        const ph = Boolean(d.isPhilippines) || localPH
        setIsPhilippines(ph)
        setVideoUrl(ph ? PH_VIDEO : EN_VIDEO)
      })
      .catch(() => {
        setIsPhilippines(localPH)
        setVideoUrl(localPH ? PH_VIDEO : EN_VIDEO)
      })
  }, [])

  return (
    <section className="py-20" style={{ background: CREAM, fontFamily: display.fontFamily }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BLUE }}>
          See it in action
        </p>
        <h2 className="text-2xl sm:text-4xl font-extrabold mb-10 tracking-tight" style={{ color: INK }}>
          Watch how Smapey works for your gym
        </h2>

        <div className="relative rounded-[24px] overflow-hidden border-2" style={{ borderColor: INK, boxShadow: `10px 10px 0 ${BLUE}`, background: INK }}>
          {videoUrl ? (
            <video
              key={videoUrl}
              src={videoUrl}
              controls
              playsInline
              preload="metadata"
              className="w-full aspect-video"
            />
          ) : (
            <div className="w-full aspect-video flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: "rgba(255,255,255,.25)", borderTopColor: AMBER }} />
            </div>
          )}
        </div>

        {isPhilippines !== null && (
          <p className="text-xs mt-4 flex items-center justify-center gap-1.5 font-semibold" style={{ color: "#9a948b" }}>
            <span>{isPhilippines ? "🇵🇭" : "🌍"}</span>
            <span>{isPhilippines ? "Viewing in Filipino (Tagalog)" : "Viewing in English"}</span>
          </p>
        )}
      </div>
    </section>
  )
}
