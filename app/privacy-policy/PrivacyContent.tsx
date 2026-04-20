"use client";
import Footer from "@/components/Footer"

export default function PrivacyPolicy() {
  return (
    <>
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-600">
          Your privacy matters to us. This policy explains how Smapey collects, uses, and protects your data when you use our platform.
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 pb-16 space-y-8">

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
          <p className="text-gray-600">
            We collect information you provide directly, including your name, email address, business details, invoices, and payment-related information. We may also collect usage data such as browser type, IP address, and interactions with the platform.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
          <p className="text-gray-600">
            Your data is used to operate and improve our services, process transactions, personalize your experience, and communicate important updates such as invoices, billing, and support responses.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">3. Data Security</h2>
          <p className="text-gray-600">
            We implement industry-standard safeguards including encryption and secure servers to protect your data. However, no system is 100% secure, and we encourage users to keep their credentials safe.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">4. Third-Party Services</h2>
          <p className="text-gray-600">
            We may integrate with trusted third-party providers such as payment gateways (e.g., Stripe, PayPal, GCash) and analytics tools. These services have their own privacy policies governing how your data is handled.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">5. Data Retention</h2>
          <p className="text-gray-600">
            We retain your data only as long as necessary to provide our services and comply with legal obligations. You may request deletion of your data at any time.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
          <p className="text-gray-600">
            You have the right to access, update, or delete your personal data. You may also opt out of certain communications by contacting us directly.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">7. Changes to This Policy</h2>
          <p className="text-gray-600">
            We may update this Privacy Policy from time to time. Continued use of the service after updates indicates your acceptance of the revised policy.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
          <p className="text-gray-600">
            If you have questions about this Privacy Policy, contact us at
            <span className="font-medium"> support@smapeyinvoicing.com</span>.
          </p>
        </section>
      </div>
    </div>
    <Footer/>
    </>
  );
}
