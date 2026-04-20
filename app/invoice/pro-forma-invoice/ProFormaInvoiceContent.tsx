"use client"
import Link from "next/link"
import { FileText, CheckCircle, HelpCircle } from "lucide-react"
import InternalLinks from "@/components/InternalLinks"
export default function ProFormaInvoiceContent() {
  return (
    <div className="bg-gradient-to-b from-white via-blue-50/30 to-white text-gray-800">

      {/* HERO */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-200/30 blur-[120px] rounded-full" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex bg-white border shadow-sm px-4 py-1.5 rounded-full text-sm text-gray-600">
            📄 Invoice Type
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mt-6 leading-tight">
            Pro Forma Invoice
            <span className="block text-blue-600">Meaning, Example & Guide</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Learn what a pro forma invoice is, when to use it, and how it helps businesses provide accurate cost estimates before final billing.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        <p className="text-lg">
          A pro forma invoice is a preliminary document sent to a buyer before goods or services are delivered.
          It outlines estimated costs and transaction details but is not a final request for payment.
        </p>

        <p>
          Businesses use pro forma invoices to provide transparency, avoid misunderstandings, and give clients a clear idea of pricing before committing to a purchase.
        </p>
      </section>

      {/* WHEN TO USE */}
      <section className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <h2 className="text-2xl font-semibold">When should you use a pro forma invoice?</h2>

        <p>
          Pro forma invoices are commonly used in situations where pricing needs to be clarified before completing a transaction.
        </p>

        <ul className="space-y-3 text-gray-700">
          <li>• Before confirming a sale or agreement</li>
          <li>• For international trade and shipping</li>
          <li>• When providing cost estimates to clients</li>
          <li>• For customs documentation and approvals</li>
        </ul>

        <p>
          Using a pro forma invoice ensures both parties are aligned on pricing and expectations before moving forward.
        </p>
      </section>

      {/* DIFFERENCE */}
      <section className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <h2 className="text-2xl font-semibold">Pro Forma Invoice vs Invoice</h2>

        <p>
          While they may look similar, a pro forma invoice and a standard invoice serve different purposes.
        </p>

        <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
          <p><strong>Pro Forma Invoice:</strong> Used for estimates and not legally binding.</p>
          <p><strong>Invoice:</strong> A final document requesting payment and legally recognized.</p>
        </div>

        <p>
          In simple terms, a pro forma invoice comes before the actual invoice in the billing process.
        </p>
      </section>

      {/* WHY IMPORTANT */}
      <section className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <h2 className="text-2xl font-semibold">Why is a pro forma invoice important?</h2>

        <p>
          Pro forma invoices play a key role in business transactions by improving communication and reducing risks.
        </p>

        <p>
          They help clients understand pricing upfront, prevent disputes, and streamline approval processes,
          especially in international transactions.
        </p>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          💡 Tip: With invoicing software, you can easily convert a pro forma invoice into a final invoice in seconds.
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[{
            icon: <FileText className="text-blue-600" />,
            title: "Instant Templates",
            desc: "Create pro forma invoices quickly and professionally."
          },
          {
            icon: <CheckCircle className="text-blue-600" />,
            title: "Accurate Estimates",
            desc: "Provide clear and detailed pricing to clients."
          },
          {
            icon: <FileText className="text-blue-600" />,
            title: "Seamless Workflow",
            desc: "Convert estimates into invoices with one click."
          }].map((f, i) => (
            <div key={i} className="p-6 bg-white border rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="mb-4">{f.icon}</div>
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <div className="max-w-xl mx-auto bg-white border rounded-2xl p-10 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">
            Create Pro Forma Invoices Instantly
          </h2>
          <p className="text-gray-600 mb-6">
            Save time and improve accuracy with modern invoicing tools.
          </p>
          <Link href="how-it-works">
             <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl">
            Start Free
          </button>
          </Link>
         
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-3xl mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {[
            {
              q: "Is a pro forma invoice legally binding?",
              a: "No, it is not legally binding. It is used only for estimates and preliminary agreements."
            },
            {
              q: "Can I request payment with a pro forma invoice?",
              a: "No, payments should be requested using a final invoice."
            },
            {
              q: "What is the main purpose of a pro forma invoice?",
              a: "Its purpose is to provide a clear estimate and outline transaction details before the final sale."
            },
            {
              q: "Can I convert a pro forma invoice into a final invoice?",
              a: "Yes, most invoicing software allows you to convert it instantly into a final invoice."
            },
          ].map((item, i) => (
            <div key={i} className="bg-white border rounded-xl p-5">
              <div className="flex gap-3 mb-2">
                <HelpCircle size={18} />
                <p className="font-medium">{item.q}</p>
              </div>
              <p className="text-sm text-gray-600">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
           <InternalLinks />
    </div>
  )
}