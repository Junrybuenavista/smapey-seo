"use client";
import Footer from "@/components/Footer"
import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, ShieldCheck, Sparkles } from "lucide-react";

// ✅ TYPE SAFE FORM

type ContactForm = {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // ✅ FIXED TYPE
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ FIXED TYPE
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: replace with real API
      await new Promise((res) => setTimeout(res, 1500));

      setSuccess(true);
      setForm({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* HERO */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Let’s Build Something Great</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Whether you have a question, feedback, or a business proposal — our team is ready to help you scale faster.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6 pb-16">

        {/* LEFT SIDE */}
        <div className="space-y-8">

          {/* CONTACT INFO */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Contact Information</h2>

            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 mt-1" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-600">support@smapeyinvoicing.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 mt-1" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-600">+63 912 345 6789</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 mt-1" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-gray-600">Philippines</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 mt-1" />
              <div>
                <p className="font-medium">Working Hours</p>
                <p className="text-gray-600">Mon - Fri: 9AM - 6PM</p>
              </div>
            </div>
          </div>

          {/* VALUE PROPS */}
          <div className="grid gap-4">
            <div className="flex gap-3">
              <ShieldCheck className="w-5 h-5" />
              <p className="text-gray-600">Your data is secure and handled with strict confidentiality.</p>
            </div>

            <div className="flex gap-3">
              <Sparkles className="w-5 h-5" />
              <p className="text-gray-600">Fast response — we usually reply within 24 hours.</p>
            </div>
          </div>

          {/* FAQ */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Quick Questions</h3>

            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="font-medium">How fast do you respond?</p>
              <p className="text-gray-600 text-sm">We typically reply within 24 hours on business days.</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="font-medium">Do you support custom features?</p>
              <p className="text-gray-600 text-sm">Yes, we can discuss tailored solutions for your business.</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm">
              <p className="font-medium">Can I request a demo?</p>
              <p className="text-gray-600 text-sm">Absolutely — just send us a message and we’ll schedule one.</p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-6">Send Message</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded-lg"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded-lg"
              />
            </div>

            <input
              type="text"
              name="company"
              placeholder="Company (optional)"
              value={form.company}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full border p-3 rounded-lg"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
            >
              {loading ? "Sending..." : "Send Message"}
              <Send className="w-4 h-4" />
            </button>

            {success && (
              <p className="text-green-600 text-sm">
                Message sent successfully! We’ll get back to you soon.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
