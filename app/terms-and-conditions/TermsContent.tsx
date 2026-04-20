"use client";
import Footer from "@/components/Footer"

export default function TermsOfService() {
  return (
    <>
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-gray-600">
          Please read these terms carefully before using Smapey. By accessing or using our service, you agree to be bound by these terms.
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 pb-16 space-y-8">

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">1. Use of Service</h2>
          <p className="text-gray-600">
            You agree to use Smapey only for lawful purposes and in accordance with these Terms. You must not use the service in any way that could damage, disable, or impair our platform.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">2. Account Responsibility</h2>
          <p className="text-gray-600">
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">3. Payments</h2>
          <p className="text-gray-600">
            All payments are processed through third-party providers. We are not responsible for any issues related to payment processing handled by these providers.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">4. Limitation of Liability</h2>
          <p className="text-gray-600">
            Smapey shall not be held liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our service.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">5. Changes to Terms</h2>
          <p className="text-gray-600">
            We reserve the right to modify these Terms at any time. Continued use of the service after changes constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">6. Contact</h2>
          <p className="text-gray-600">
            If you have any questions about these Terms, you may contact us at
            <span className="font-medium"> support@smapeyinvoicing.com</span>.
          </p>
        </section>
      </div>
    </div>
    <Footer />
    </>
  );
}
