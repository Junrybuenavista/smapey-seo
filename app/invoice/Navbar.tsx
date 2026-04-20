"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  ChevronDown,
  Building2,
  MessageCircleQuestionMark,
  HandCoins,
  Menu,
  X,
  Users
} from "lucide-react"

export default function Navbar() {
  const [token, setToken] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  // ✅ Separate states
  const [productOpen, setProductOpen] = useState(false) // desktop
  const [mobileProductOpen, setMobileProductOpen] = useState(false) // mobile

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"))
  }, [])

  // ✅ Desktop: close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement

      if (!target.closest(".product-dropdown")) {
        setProductOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const loginPath = token ? "/app" : "https://app.smapey.com/login"

  return (
    <nav className="w-full border-b border-gray-200/50 bg-white/70 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}
        <Link href="/invoice/" className="flex items-center gap-2 text-xl font-extrabold tracking-wide text-blue-600">
          <img src="/logo.svg" alt="Smapey" className="h-9 w-auto" />
          SMAPEY
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">

          <div className="flex items-center gap-6 text-sm font-medium">

            <Link href="/invoice/invoice-free-tool" className="text-gray-600 hover:text-blue-600">
              Free Tools
            </Link>

            {/* DESKTOP DROPDOWN */}
            <div className="relative product-dropdown">
              <button
                onClick={() => setProductOpen(!productOpen)}
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
              >
                Our Product
                <ChevronDown
                  size={14}
                  className={`transition ${productOpen ? "rotate-180" : ""}`}
                />
              </button>

              {productOpen && (
                <div className="absolute left-0 mt-4 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl p-2 z-50">

                  <Link
                    href="/invoice/"
                    onClick={() => setProductOpen(false)}
                    className="flex gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
                  >
                    <HandCoins size={18} className="text-blue-600" />
                    <div>
                      <p className="font-medium">Features</p>
                      <p className="text-xs text-gray-500">Get Paid Faster</p>
                    </div>
                  </Link>

                  <Link
                    href="/invoice/industry"
                    onClick={() => setProductOpen(false)}
                    className="flex gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
                  >
                    <Building2 size={18} className="text-blue-600" />
                    <div>
                      <p className="font-medium">Industries</p>
                      <p className="text-xs text-gray-500">Solutions for every business</p>
                    </div>
                  </Link>

                      <Link
                    href="/invoice/customers"
                    onClick={() => setProductOpen(false)}
                    className="flex gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
                  >
                    <Users size={18} className="text-blue-600" />
                    <div>
                      <p className="font-medium">Customers</p>
                      <p className="text-xs text-gray-500">Customet's freedback</p>
                    </div>
                  </Link>

                  <Link
                    href="/invoice/faq"
                    onClick={() => setProductOpen(false)}
                    className="flex gap-3 px-4 py-3 rounded-xl hover:bg-blue-50"
                  >
                    <MessageCircleQuestionMark size={18} className="text-blue-600" />
                    <div>
                      <p className="font-medium">FAQ</p>
                      <p className="text-xs text-gray-500">Frequently asked questions</p>
                    </div>
                  </Link>

                </div>
              )}
            </div>

            <Link href="/invoice/how-it-works" className="text-gray-600 hover:text-blue-600">
              How it works
            </Link>
            <Link href="/invoice/learning-hub" className="text-gray-600 hover:text-blue-600">
              Learning Hub
            </Link>

          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-3">
            <Link href={loginPath} className="px-4 py-2 text-sm border rounded-lg">
              {token ? "Dashboard" : "Login"}
            </Link>

            {!token && (
              <Link
                href="https://app.smapey.com/register?product=INVOICE&plan=FREE"
                className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 space-y-4 bg-white border-t">

          <Link href="/invoice/customers" className="block text-gray-700">
            Customers
          </Link>

          {/* MOBILE DROPDOWN */}
          <div>
            <button
              onClick={() => setMobileProductOpen(!mobileProductOpen)}
              className="flex justify-between w-full text-gray-700"
            >
              Our Product
              <ChevronDown
                size={16}
                className={`transition ${mobileProductOpen ? "rotate-180" : ""}`}
              />
            </button>

            {mobileProductOpen && (
              <div className="mt-2 space-y-2 pl-2">

                <Link
                  href="/invoice/"
                  onClick={() => setMobileProductOpen(false)}
                  className="flex gap-2 text-sm"
                >
                  <HandCoins size={16} />
                  Features
                </Link>

                <Link
                  href="/invoice/industry"
                  onClick={() => setMobileProductOpen(false)}
                  className="flex gap-2 text-sm"
                >
                  <Building2 size={16} />
                  Industries
                </Link>

                <Link
                  href="/invoice/faq"
                  onClick={() => setMobileProductOpen(false)}
                  className="flex gap-2 text-sm"
                >
                  <MessageCircleQuestionMark size={16} />
                  FAQ
                </Link>

              </div>
            )}
          </div>

          <Link href="/invoice/how-it-works" className="block text-gray-700">
            How it works
          </Link>

          {/* BUTTONS */}
          <div className="pt-4 flex flex-col gap-3">
            <Link href={loginPath} className="w-full text-center border py-2 rounded-lg">
              {token ? "Dashboard" : "Login"}
            </Link>

            {!token && (
              <Link
                href="https://app.smapey.com/register?product=INVOICE&plan=FREE"
                className="w-full text-center py-2 rounded-lg text-white bg-blue-600"
              >
                Get Started
              </Link>
            )}
          </div>

        </div>
      )}
    </nav>
  )
}