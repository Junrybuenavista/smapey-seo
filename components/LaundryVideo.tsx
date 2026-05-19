export default function LaundryVideo() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-500 mb-3">See it in action</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-10">
          Watch how Smapey works for your laundry shop
        </h2>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-200 bg-slate-900">
          <video
            src="https://res.cloudinary.com/dxhwfv0jo/video/upload/v1779216085/Smapey-LaundryApp_ycnxrf.mp4"
            controls
            playsInline
            preload="metadata"
            className="w-full aspect-video"
          />
        </div>
      </div>
    </section>
  )
}
