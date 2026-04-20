export default function InvoicePreview({ template }: any) {

  // 🟣 GRADIENT (PREMIUM HERO)
  if (template.id === "gradient") {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">

        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4">
          <h2 className="text-sm font-bold">INVOICE</h2>
          <p className="text-xs opacity-80">Your Company</p>
        </div>

        <div className="p-4 text-xs">
          <div className="flex justify-between mb-2">
            <span>Client Name</span>
            <span className="font-semibold">$600</span>
          </div>

          <div className="h-[1px] bg-gray-200 my-2" />

          <div className="flex justify-between text-gray-500">
            <span>2 items</span>
            <span>Apr 2026</span>
          </div>
        </div>

      </div>
    )
  }

  // 🟦 SIDEBAR (REAL SAAS FEEL)
  if (template.id === "sidebar") {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border flex">

        <div className="bg-blue-600 text-white w-1/3 p-3 flex flex-col justify-between">
          <span className="text-xs font-bold">INV</span>
          <span className="text-[10px] opacity-70">Company</span>
        </div>

        <div className="p-3 flex-1 text-xs">
          <p className="font-medium">Client</p>
          <p className="text-lg font-bold mt-1">$600</p>

          <div className="mt-2 text-gray-400 text-[10px]">
            Invoice #001
          </div>
        </div>

      </div>
    )
  }

  // ⚪ MINIMAL (APPLE STYLE)
  if (template.id === "minimal") {
    return (
      <div className="bg-white rounded-2xl shadow-md border p-6 text-center">

        <p className="text-[10px] tracking-widest text-gray-400">
          INVOICE
        </p>

        <p className="mt-2 text-sm font-medium">Client Name</p>

        <p className="mt-3 text-xl font-semibold">$600</p>

        <div className="mt-3 h-[1px] bg-gray-200" />

        <p className="text-[10px] text-gray-400 mt-2">
          April 2026
        </p>

      </div>
    )
  }

  // 🌑 DARK (PREMIUM)
  if (template.id === "dark") {
    return (
      <div className="bg-gray-900 text-white rounded-2xl shadow-lg p-4">

        <h2 className="text-sm font-semibold">INVOICE</h2>

        <div className="mt-3 bg-gray-800 p-3 rounded-lg">
          <p className="text-xs text-gray-400">Client</p>
          <p className="text-sm">Client Name</p>

          <p className="mt-2 text-green-400 font-bold text-lg">
            $600
          </p>
        </div>

      </div>
    )
  }

  return null
}