import { currencyMap } from "./currency"
import { notoFont } from "./pdfFont"

// ✅ money formatter
const formatMoney = (amount: number, currency: string) => {
  const symbol = currencyMap[currency] || currency + " "

  const formatted = amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return `<span style="font-family:'NotoSymbol'">${symbol}</span>${formatted}`
}

// ✅ date formatter (NEW 🔥)
const formatDate = (dateStr: string) => {
  if (!dateStr) return "—"

  const date = new Date(dateStr)

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function templateMinimal(data: any) {
  const items = Array.isArray(data.items) ? data.items : []

  return `
  <html>
  <head>
    <style>
      ${notoFont}

      @page {
        size: A4;
        margin: 0;
      }

      body {
        margin: 0;
        padding: 80px 60px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
        color: #111827;
        background: white;
      }

      .invoice {
        max-width: 700px;
        margin: auto;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 50px;
      }

      .brand {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .logo {
        max-width: 80px;
        margin-bottom: 10px;
      }

      .brand-name {
        font-size: 18px;
        font-weight: 600;
      }

      .meta {
        text-align: right;
        font-size: 13px;
        color: #6b7280;
        line-height: 1.8;
      }

      .meta strong {
        color: #111827;
      }

      .section {
        margin-bottom: 40px;
      }

      .label {
        font-size: 11px;
        text-transform: uppercase;
        color: #9ca3af;
        margin-bottom: 6px;
      }

      .value {
        font-size: 16px;
        font-weight: 500;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 30px;
      }

      th {
        text-align: left;
        font-size: 12px;
        color: #6b7280;
        padding-bottom: 10px;
        border-bottom: 1px solid #e5e7eb;
        font-weight: 600;
      }

      td {
        padding: 14px 0;
        border-bottom: 1px solid #f3f4f6;
        font-size: 14px;
      }

      .right {
        text-align: right;
      }

      .summary {
        margin-top: 40px;
        width: 280px;
        margin-left: auto;
      }

      .summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        font-size: 14px;
      }

      .summary-row span:first-child {
        color: #6b7280;
      }

      .summary-divider {
        height: 1px;
        background: #e5e7eb;
        margin: 12px 0;
      }

      .summary-total {
        display: flex;
        justify-content: space-between;
        font-size: 26px;
        font-weight: 800;
        margin-top: 10px;
      }

      .notes {
        margin-top: 50px;
        font-size: 13px;
        color: #6b7280;
        border-top: 1px solid #e5e7eb;
        padding-top: 15px;
      }

    </style>
  </head>

  <body>

    <div class="invoice">

      <!-- HEADER -->
      <div class="header">

        <div class="brand">
          ${
            data.logo
              ? `<img src="${data.logo}" class="logo" />`
              : ""
          }

          ${
            data.companyName
              ? `<div class="brand-name">${data.companyName}</div>`
              : ""
          }
        </div>

        <!-- 🔥 IMPROVED META -->
        <div class="meta">
          <div><strong>Invoice #:</strong> ${data.invoiceNumber || "—"}</div>
          <div><strong>Date:</strong> ${formatDate(data.date)}</div>
          <div><strong>Due Date:</strong> ${formatDate(data.dueDate)}</div>

          ${
            data.companyEmail
              ? `<div style="margin-top:6px;">${data.companyEmail}</div>`
              : ""
          }
        </div>

      </div>

      <!-- BILL TO -->
      <div class="section">
        <div class="label">Bill To</div>
        <div class="value">
          ${data.clientName || ""}
          ${
            data.clientEmail
              ? `<div style="font-size:13px;color:#6b7280;margin-top:4px;">${data.clientEmail}</div>`
              : ""
          }
        </div>
      </div>

      <!-- TABLE -->
      ${
        items.length
          ? `
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th class="right">Total</th>
            </tr>
          </thead>

          <tbody>
            ${items.map((i:any) => `
              <tr>
                <td>${i.name || ""}</td>
                <td class="right">${formatMoney((i.qty || 0)*(i.price || 0), data.currency)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `
          : ""
      }

      <!-- SUMMARY -->
      <div class="summary">
        <div class="summary-row">
          <span>Subtotal</span>
          <span>${formatMoney(data.subtotal || 0, data.currency)}</span>
        </div>

        <div class="summary-row">
          <span>Tax (${data.taxRate || 0}%)</span>
          <span>${formatMoney(data.tax || 0, data.currency)}</span>
        </div>

        <div class="summary-divider"></div>

        <div class="summary-total">
          <span>Total</span>
          <span>${formatMoney(data.total || 0, data.currency)}</span>
        </div>
      </div>

      <!-- NOTES -->
      ${
        data.notes && data.notes.trim()
          ? `<div class="notes">${data.notes}</div>`
          : ""
      }

    </div>

  </body>
  </html>
  `
}