"use client"
import Footer from "@/components/Footer"
import Link from "next/link"

const testimonials = [
  {
    name: "John Reyes",
    role: "Freelance Web Designer",
    text: "Smapey made invoicing so simple. I send invoices in seconds and get paid faster than ever.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Kim George",
    role: "Small Business Owner",
    text: "I stopped using spreadsheets. Everything is now organized in one place.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Jon Farmer",
    role: "Motion Designer",
    text: "Clean UI, fast workflow, and super easy to use. Best invoicing tool I’ve tried.",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    name: "Kristi Becker",
    role: "Agency Founder",
    text: "Recurring invoices saved me hours every week. Huge productivity boost.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Ray Taylor",
    role: "Entrepreneur",
    text: "A great free invoicing software. Simple but powerful.",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "Rahul Singal",
    role: "Tech Writer",
    text: "Customizable and easy to use. Perfect for freelancers.",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

export default function CustomersContent() {
  return (
    <>
    <div className="bg-white">

      {/* HERO */}
     <section className="py-28 bg-gradient-to-br from-[#0B1220] via-[#0F172A] to-black text-white text-center px-6 relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-[150px] rounded-full top-[-100px] left-1/2 -translate-x-1/2"></div>

      <div className="relative max-w-5xl mx-auto">

        {/* AVATAR CLUSTER 🔥 */}
        <div className="flex justify-center mb-8 relative">

          <div className="flex -space-x-4">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-14 h-14 rounded-full border-2 border-white" />
            <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-14 h-14 rounded-full border-2 border-white" />
            <img src="https://randomuser.me/api/portraits/men/76.jpg" className="w-14 h-14 rounded-full border-2 border-white" />
            <img src="https://randomuser.me/api/portraits/women/65.jpg" className="w-14 h-14 rounded-full border-2 border-white" />
            <img src="https://randomuser.me/api/portraits/men/12.jpg" className="w-14 h-14 rounded-full border-2 border-white" />
          </div>

          {/* BADGE */}
          <div className="absolute -bottom-3 bg-white text-black text-xs px-3 py-1 rounded-full shadow">
            Trusted by 10,000+ users
          </div>
        </div>

        {/* HEADLINE */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Loved by Freelancers Worldwide
        </h1>

        <p className="mt-4 text-gray-300 max-w-2xl mx-auto text-lg">
          See how people like you use Smapey to create invoices, get paid faster,
          and simplify their business.
        </p>

        {/* CTA */}
        <div className="mt-8">
          <Link href="https://app.smapey.com/register?product=INVOICE&plan=FREE">
            <button className="px-8 py-4 bg-white text-black rounded-xl font-medium hover:scale-105 transition shadow-lg">
              Start Free →
            </button>
          </Link>

          <p className="text-sm text-gray-400 mt-3">
            No credit card required
          </p>
        </div>

      </div>
    </section>

      {/* TESTIMONIALS GRID */}
 <section className="py-20 max-w-6xl mx-auto px-6">
  <div className="grid md:grid-cols-3 gap-6">

    {testimonials.map((t, i) => (
      <div
        key={i}
        className="border rounded-xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition bg-white"
      >
        {/* TEXT */}
        <p className="text-gray-700 mb-6 leading-relaxed">
          “{t.text}”
        </p>

        {/* USER */}
        <div className="flex items-center gap-3">
          <img
            src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? "men" : "women"}/${30 + i}.jpg`}
            alt={t.name}
            className="w-11 h-11 rounded-full object-cover border"
          />

          <div className="text-sm">
            <p className="font-semibold text-gray-800">{t.name}</p>
            <p className="text-gray-500">{t.role}</p>
          </div>
        </div>
      </div>
    ))}

  </div>
</section>

      {/* FINAL CTA */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold">
          Start Sending Invoices Today.
        </h2>

        <p className="mt-3 text-blue-100">
          Join thousands of freelancers getting paid faster.
        </p>

        <Link href="https://app.smapey.com/register?product=INVOICE&plan=FREE">
          <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
            Get Started Free
          </button>
        </Link>
      </section>

    </div>
     <Footer />
        </>
  )
}