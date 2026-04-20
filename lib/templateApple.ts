import { currencyMap } from "./currency"
import { notoFont } from "./pdfFont"

// ✅ format money
const formatMoney = (amount: number, currency: string) => {
  const symbol = currencyMap[currency] || currency + " "

  const formatted = amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return `<span style="font-family:'NotoSymbol'">${symbol}</span>${formatted}`
}

// ✅ format date (NEW 🔥)
const formatDate = (dateStr: string) => {
  if (!dateStr) return ""

  const date = new Date(dateStr)

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function templateApple(data: any) {
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
        background: white;
        color: #111;
        font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto;
      }

      .page {
        width: 794px;
        min-height: 1123px;
        margin: 0 auto;
        padding: 80px 70px;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start; /* 🔥 THIS FIXES ALIGNMENT */
        margin-bottom: 80px;
      }

     .brand {
  display: flex;
  flex-direction: column;
  gap: 6px; /* tighter spacing */
}

      .logo {
        max-width: 70px;
      }

      .company {
        font-size: 14px;
        color: #6b7280;
      }

      .title {
        font-size: 44px;
        font-weight: 700;
        letter-spacing: -1px;
      }

   .meta {
  text-align: right;
  font-size: 13px;
  color: #6b7280;
  line-height: 1.8; /* smoother spacing */
}

      .meta strong {
        color: #111;
      }

      .client {
        margin-bottom: 60px;
      }

      .label {
        font-size: 11px;
        text-transform: uppercase;
        color: #9ca3af;
        margin-bottom: 6px;
      }

      .value {
        font-size: 18px;
        font-weight: 500;
      }

      .email {
        font-size: 14px;
        color: #6b7280;
        margin-top: 4px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }

      th {
        text-align: left;
        font-size: 12px;
        color: #9ca3af;
        padding-bottom: 14px;
      }

      td {
        padding: 18px 0;
        font-size: 15px;
      }

      .right {
        text-align: right;
      }

      .divider {
        height: 1px;
        background: #f1f5f9;
        margin: 20px 0;
      }

      .summary {
        margin-top: 60px;
        display: flex;
        justify-content: flex-end;
      }

      .summary-box {
        width: 260px;
      }

      .row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        font-size: 15px;
        color: #6b7280;
      }

      .total {
        margin-top: 14px;
        font-size: 34px;
        font-weight: 700;
        color: #111;
      }

      .notes {
        margin-top: 80px;
        font-size: 14px;
        color: #6b7280;
      }
    </style>
  </head>

  <body>
    <div class="page">

      <!-- HEADER -->
      <div class="header">

        <div class="brand">
          ${
            data.logo
              ? `<img src="${data.logo}" class="logo" />`
              : ""
          }

          <div class="company">${data.companyName || ""}</div>
          <div class="title">Invoice</div>
        </div>

        <!-- 🔥 UPDATED META -->
        <div class="meta">
          <div><strong>Invoice #:</strong> ${data.invoiceNumber || ""}</div>
          <div><strong>Date:</strong> ${formatDate(data.date)}</div>
          <div><strong>Due Date:</strong> ${formatDate(data.dueDate)}</div>

          ${
            data.companyEmail
              ? `<div style="margin-top:6px;">${data.companyEmail}</div>`
              : ""
          }
        </div>

      </div>

      <!-- CLIENT -->
      <div class="client">
        <div class="label">Bill To</div>
        <div class="value">${data.clientName || ""}</div>

        ${
          data.clientEmail
            ? `<div class="email">${data.clientEmail}</div>`
            : ""
        }
      </div>

      <!-- TABLE -->
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th class="right">Qty</th>
            <th class="right">Price</th>
            <th class="right">Total</th>
          </tr>
        </thead>

        <tbody>
          ${items.map((i:any, idx:number) => `
            <tr>
              <td>${i.name || ""}</td>
              <td class="right">${i.qty || 0}</td>
              <td class="right">${formatMoney(i.price || 0, data.currency)}</td>
              <td class="right">${formatMoney((i.qty || 0)*(i.price || 0), data.currency)}</td>
            </tr>
            ${idx < items.length - 1 ? `<tr><td colspan="4"><div class="divider"></div></td></tr>` : ""}
          `).join("")}
        </tbody>
      </table>

      <!-- SUMMARY -->
      <div class="summary">
        <div class="summary-box">

          <div class="row">
            <span>Subtotal</span>
            <span>${formatMoney(data.subtotal || 0, data.currency)}</span>
          </div>

          <div class="row">
            <span>Tax (${data.taxRate || 0}%)</span>
            <span>${formatMoney(data.tax || 0, data.currency)}</span>
          </div>

          <div class="total">
            ${formatMoney(data.total || 0, data.currency)}
          </div>

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