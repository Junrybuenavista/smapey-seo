"use client"
import Footer from "@/components/Footer"

export default function FreelanceInvoiceGuide() {
  return (
    <>
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <section className="mt-20 text-center max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold leading-tight">
          Freelance Invoice Template & Guide (Get Paid Faster in 2026)
        </h1>

        <p className="mt-4 text-gray-600">
          Struggling with late payments? Learn how to create professional freelance invoices,
          avoid common mistakes, and get paid faster — with free templates included.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <a
            href="/invoice/invoice-generation-online"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition font-semibold"
          >
            Free Invoice Generator
          </a>

          <a
            href="/invoice/free-invoice-template"
            className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Free Invoice Template
          </a>
        </div>
      </section>

      {/* WHY INVOICING MATTERS */}
      <section className="mt-20 max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">
          Why Freelance Invoices Matter
        </h2>

        <p className="text-gray-700">
          Poor invoicing is one of the biggest reasons freelancers experience delayed payments.
          A clear, professional invoice builds trust, reduces confusion, and helps you get paid on time.
        </p>

        <ul className="mt-4 space-y-2 text-gray-700">
          <li>💰 Reduces late payments</li>
          <li>📈 Builds professionalism and trust</li>
          <li>🧾 Keeps financial records organized</li>
          <li>⚖️ Prevents disputes with clients</li>
        </ul>
      </section>

      {/* INVOICE PREVIEW */}
      <section
        id="example"
        className="mt-20 max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 border"
      >
        <h2 className="text-xl font-semibold mb-6">Freelance Invoice Example</h2>

        <div className="flex justify-between mb-6">
          <div>
            <p className="font-bold text-lg">Your Freelance Business</p>
            <p className="text-sm text-gray-500">you@email.com</p>
          </div>

          <div className="text-right">
            <p className="font-bold text-lg">INVOICE</p>
            <p className="text-sm text-gray-500">#F-001</p>
            <p className="text-sm text-gray-500">Date: Aug 1, 2026</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold">Billed To:</p>
          <p>Client Name</p>
          <p className="text-gray-500 text-sm">client@email.com</p>
        </div>

        <table className="w-full text-sm border-t border-b">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="py-2">Service</th>
              <th className="py-2">Qty</th>
              <th className="py-2">Rate</th>
              <th className="py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="py-2">Website Design</td>
              <td>1</td>
              <td>$300</td>
              <td className="text-right">$300</td>
            </tr>
            <tr className="border-t">
              <td className="py-2">Development</td>
              <td>1</td>
              <td>$700</td>
              <td className="text-right">$700</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end mt-6">
          <div className="text-right">
            <p className="text-gray-600">Subtotal: $1000</p>
            <p className="text-lg font-bold text-blue-600">Total: $1000</p>
          </div>
        </div>
      </section>

      {/* WHAT TO INCLUDE */}
      <section className="mt-20 max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">
          What to Include in a Freelance Invoice (Checklist)
        </h2>

        <ul className="space-y-3 text-gray-700">
          <li>✅ Your business name and contact details</li>
          <li>✅ Client information</li>
          <li>✅ Invoice number and dates</li>
          <li>✅ Detailed list of services</li>
          <li>✅ Pricing and total amount</li>
          <li>✅ Payment terms (Net 7, Net 15, etc.)</li>
          <li>✅ Payment methods (PayPal, GCash, bank)</li>
        </ul>
      </section>

      {/* STEP GUIDE */}
      <section className="mt-20 max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center">
          How to Create a Freelance Invoice (Step-by-Step)
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card title="1. Add Client Details" desc="Include name, email, and business info." />
          <Card title="2. List Services Clearly" desc="Break down your work into line items." />
          <Card title="3. Set Payment Terms" desc="Define due date and payment methods." />
        </div>
      </section>

      {/* MISTAKES */}
      <section className="mt-20 max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">
          Common Freelance Invoice Mistakes to Avoid
        </h2>

        <ul className="space-y-3 text-gray-700">
          <li>❌ Missing invoice number or dates</li>
          <li>❌ Vague descriptions like "design work"</li>
          <li>❌ Incorrect totals</li>
          <li>❌ No payment terms</li>
          <li>❌ Not following up on unpaid invoices</li>
        </ul>
      </section>

      {/* GET PAID FASTER */}
      <section className="mt-20 max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">
          How to Get Paid Faster as a Freelancer
        </h2>

        <ul className="space-y-3 text-gray-700">
          <li>🚀 Send invoices immediately</li>
          <li>📅 Use clear due dates</li>
          <li>💳 Offer multiple payment options</li>
          <li>🔔 Send reminders</li>
          <li>⚡ Use invoicing tools</li>
        </ul>

        <div className="mt-6">
          <a
            href="/invoice/https://app.smapey.com/register?product=INVOICE&plan=FREE"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Create Invoice in Seconds →
          </a>
        </div>
      </section>

      {/* TOOLS */}
      <section className="mt-20 max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">
          Best Freelance Invoice Tools
        </h2>

        <p className="text-gray-700">
          Instead of manual invoices, use tools that automate everything.
        </p>

        <ul className="mt-4 space-y-2 text-gray-700">
          <li>⚡ Smapey – fast invoice generator</li>
          <li>📊 FreshBooks – accounting + invoicing</li>
          <li>💼 Wave – free invoicing software</li>
        </ul>

        <p className="mt-4 text-gray-700">
          With Smapey, you can create, send, and track invoices in seconds.
        </p>
      </section>

      {/* LEGAL */}
      <section className="mt-20 max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">
          Legal & Tax Considerations
        </h2>

        <ul className="space-y-2 text-gray-700">
          <li>📌 Keep invoice records</li>
          <li>📌 Include tax if required</li>
          <li>📌 Use contracts alongside invoices</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="mt-20 max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <Faq q="Do freelancers need invoices?" a="Yes, invoices help you get paid and stay professional." />
          <Faq q="What is the best invoice format?" a="Simple, clear, and detailed format works best." />
          <Faq q="Can I create invoices for free?" a="Yes, tools like Smapey allow free invoice creation." />
        </div>
      </section>

      {/* CTA */}
      <section className="mt-24 bg-blue-600 text-white text-center py-14 px-4">
        <h2 className="text-3xl font-bold">
          Start Creating Professional Invoices Today
        </h2>

        <p className="mt-3 text-blue-100">
          Save time, get paid faster, and grow your freelance business.
        </p>

        <a
          href="/invoice/https://app.smapey.com/register?product=INVOICE&plan=FREE"
          className="inline-block mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold"
        >
          Try Smapey Free
        </a>
      </section>

    </div>
    <Footer/></>
  )
}

function Card({ title, desc }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  )
}

function Faq({ q, a }: any) {
  return (
    <div>
      <h3 className="font-semibold">{q}</h3>
      <p className="text-sm text-gray-600">{a}</p>
    </div>
  )
}