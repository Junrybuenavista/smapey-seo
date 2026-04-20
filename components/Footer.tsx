import Link from "next/link"

export default function Footer() {
  return (
   <footer className="bg-white border-t">
  <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

    {/* BRAND */}
    <div>
      <div className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="SMAPEY Logo" 
            className="w-6 h-6 object-contain"
          />
          <h3 className="text-xl font-extrabold text-blue-600">
            SMAPEY
          </h3>
        </div>
      <p className="text-sm text-gray-600 mt-4 leading-relaxed">
        Simple invoicing software built for modern businesses. Create invoices, track payments, and get paid faster.
      </p>

      {/* CTA */}
      <Link
        href="https://app.smapey.com/register?product=INVOICE&plan=FREE"
        className="inline-block mt-5 px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        Get Started Free
      </Link>
    </div>

    {/* PRODUCT */}
    <div>
      <h4 className="font-semibold mb-4">Product</h4>
      <ul className="space-y-2 text-sm text-gray-600">
        <li>
          <Link href="invoice/" className="hover:text-blue-600 transition">
            Invoicing Software
          </Link>
        </li>
        <li>
          <Link href="invoice/how-it-works" className="hover:text-blue-600 transition">
            How It Works
          </Link>
        </li>
        <li>
          <Link href="invoice/industry" className="hover:text-blue-600 transition">
            Industries
          </Link>
        </li>
        <li>
          <Link href="invoice/faq" className="hover:text-blue-600 transition">
            FAQ
          </Link>
        </li>
      </ul>
    </div>

    {/* COMPANY */}
    <div>
      <h4 className="font-semibold mb-4">Company</h4>
      <ul className="space-y-2 text-sm text-gray-600">
        <li>
          <Link href="invoice/customers" className="hover:text-blue-600 transition">
            Customers
          </Link>
        </li>
        <li>
          <Link href="invoice/how-it-works" className="hover:text-blue-600 transition">
            Pricing
          </Link>
        </li>
        <li>
          <Link href="invoice/contact" className="hover:text-blue-600 transition">
            Contact
          </Link>
        </li>
      </ul>
    </div>

    {/* LEGAL / TRUST */}
    <div>
      <h4 className="font-semibold mb-4">Legal</h4>
      <ul className="space-y-2 text-sm text-gray-600">
        <li>
          <Link href="privacy-policy" className="hover:text-blue-600 transition">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="terms-and-conditions" className="hover:text-blue-600 transition">
            Terms of Service
          </Link>
        </li>
      </ul>

      {/* TRUST BADGE */}
      <p className="text-xs text-gray-500 mt-6">
        🔒 Secure payments • Trusted by growing businesses
      </p>
    </div>

  </div>

  {/* BOTTOM BAR */}
  <div className="border-t text-center text-sm text-gray-500 py-6 px-6">
    © {new Date().getFullYear()} Smapey. All rights reserved.
  </div>
</footer>
  )
}