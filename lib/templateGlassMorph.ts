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

// ✅ NEW: date formatter
const formatDate = (dateStr: string) => {
  if (!dateStr) return ""

  const date = new Date(dateStr)

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function templateGlass(data: any) {
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

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
        background: linear-gradient(135deg, #0ea5e9, #6366f1);
        color: white;
      }

      .page {
        width: 794px;
        min-height: 1123px;
        margin: 0 auto;
        padding: 60px;
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
        gap: 10px;
      }

      .logo {
        max-width: 80px;
      }

      .company {
        font-size: 18px;
        opacity: 0.9;
      }

      .title {
        font-size: 40px;
        font-weight: 800;
        letter-spacing: 2px;
      }

      .meta {
        text-align: right;
        font-size: 14px;
        opacity: 0.8;
        line-height: 1.6;
      }

      .meta strong {
        color: white;
      }

      .divider {
        height: 2px;
        background: rgba(255,255,255,0.2);
        margin: 40px 0;
      }

      .client {
        margin-bottom: 40px;
      }

      .label {
        font-size: 11px;
        text-transform: uppercase;
        opacity: 0.6;
      }

      .value {
        margin-top: 6px;
        font-size: 18px;
      }

      .email {
        font-size: 14px;
        opacity: 0.7;
        margin-top: 4px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th {
        text-align: left;
        font-size: 12px;
        opacity: 0.7;
        padding-bottom: 10px;
      }

      td {
        padding: 16px 0;
        border-bottom: 1px solid rgba(255,255,255,0.15);
      }

      .right {
        text-align: right;
      }

      .bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 60px;
      }

      .notes {
        flex: 1;
        opacity: 0.7;
      }

      .summary {
        width: 280px;
      }

      .row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
      }

      .total {
        margin-top: 12px;
        font-size: 30px;
        font-weight: 800;
        color: #22c55e;
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
          <div class="title">INVOICE</div>
        </div>

        <!-- ✅ FIXED META -->
        <div class="meta">
          <div><strong>Invoice #:</strong> ${data.invoiceNumber || ""}</div>
          <div><strong>Date:</strong> ${formatDate(data.date)}</div>
          <div><strong>Due Date:</strong> ${formatDate(data.dueDate)}</div>

          ${
            data.companyEmail
              ? `<div style="margin-top:8px;">${data.companyEmail}</div>`
              : ""
          }
        </div>

      </div>

      <div class="divider"></div>

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
          ${items.map((i:any) => `
            <tr>
              <td>${i.name || ""}</td>
              <td class="right">${i.qty || 0}</td>
              <td class="right">${formatMoney(i.price || 0, data.currency)}</td>
              <td class="right">${formatMoney((i.qty || 0)*(i.price || 0), data.currency)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <!-- BOTTOM -->
      <div class="bottom">

        <div class="notes">
          ${data.notes || ""}
        </div>

        <div class="summary">

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

    </div>
  </body>
  </html>
  `
}