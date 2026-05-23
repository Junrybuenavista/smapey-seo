"use client"

import { useEffect, useState } from "react"

const PH_VIDEO =
  "https://res.cloudinary.com/dxhwfv0jo/video/upload/v1779445623/Gym_Management_Tagalog_dhn6ki.mp4"
const EN_VIDEO =
  "https://res.cloudinary.com/dxhwfv0jo/video/upload/v1779445619/Gym-Manangement_English_eljpsx.mp4"

export default function GymVideoSection() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [isPhilippines, setIsPhilippines] = useState<boolean | null>(null)

  useEffect(() => {
    const tzFallback =
      Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Manila"

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/billing/geo`)
      .then((r) => r.json())
      .then((d) => {
        const ph = d.isPhilippines ?? tzFallback
        setIsPhilippines(ph)
        setVideoUrl(ph ? PH_VIDEO : EN_VIDEO)
      })
      .catch(() => {
        setIsPhilippines(tzFallback)
        setVideoUrl(tzFallback ? PH_VIDEO : EN_VIDEO)
      })
  }, [])

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
          See it in action
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-10">
          Watch how Smapey works for your gym
        </h2>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-200 bg-slate-900">
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
              <div className="w-8 h-8 rounded-full border-2 border-slate-600 border-t-blue-400 animate-spin" />
            </div>
          )}
        </div>

        {isPhilippines !== null && (
          <p className="text-slate-400 text-xs mt-4 flex items-center justify-center gap-1.5">
            <span>{isPhilippines ? "🇵🇭" : "🌍"}</span>
            <span>{isPhilippines ? "Viewing in Filipino (Tagalog)" : "Viewing in English"}</span>
          </p>
        )}
      </div>
    </section>
  )
}
