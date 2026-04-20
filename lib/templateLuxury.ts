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

// ✅ date formatter
const formatDate = (dateStr: string) => {
  if (!dateStr) return "—"

  const date = new Date(dateStr)

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function templateLuxury(data: any) {
  const items = Array.isArray(data.items) ? data.items : []

  return `
  <html>
  <head>
    <style>
      ${notoFont}

      @page { margin: 0; }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
        background: radial-gradient(circle at top, #1e1b4b, #020617);
        color: #e5e7eb;
      }

      .invoice {
        width: 100%;
        max-width: 1000px;
        margin: auto;
        padding: 80px;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 60px;
      }

      .brand {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .company {
        font-size: 18px;
        opacity: 0.9;
      }

      .title {
        font-size: 42px;
        font-weight: 800;
        letter-spacing: 3px;
        background: linear-gradient(90deg, #818cf8, #c084fc);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .meta {
        text-align: right;
        font-size: 13px;
        color: #9ca3af;
        line-height: 1.8;
      }

      .meta strong {
        color: #e5e7eb;
      }

      .divider {
        height: 2px;
        background: linear-gradient(90deg, transparent, #6366f1, transparent);
        margin: 40px 0;
      }

      .client {
        margin-bottom: 40px;
      }

      .label {
        font-size: 11px;
        text-transform: uppercase;
        color: #6b7280;
      }

      .value {
        margin-top: 8px;
        font-size: 18px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th {
        text-align: left;
        font-size: 12px;
        color: #9ca3af;
        padding-bottom: 12px;
        font-weight: 600;
      }

      td {
        padding: 18px 0;
        border-bottom: 1px solid rgba(255,255,255,0.06);
      }

      .right {
        text-align: right;
      }

      .bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 60px;
        gap: 40px;
      }

      .left {
        flex: 1;
      }

      .notes {
        font-size: 14px;
        color: #9ca3af;
        line-height: 1.6;
      }

      .right-box {
        width: 320px;
      }

      .summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        color: #9ca3af;
      }

      .summary-divider {
        height: 1px;
        background: rgba(255,255,255,0.1);
        margin: 12px 0;
      }

      .summary-total {
        display: flex;
        justify-content: space-between;
        font-size: 32px;
        font-weight: 900;
        color: #34d399;
      }

      .logo {
        max-width: 90px;
        margin-bottom: 10px;
      }

    </style>
  </head>

  <body>
    <div class="invoice">

      ${
        data.logo
          ? `<img src="${data.logo}" class="logo" />`
          : ""
      }

      <!-- HEADER -->
      <div class="header">

        <div class="brand">
          <div class="company">${data.companyName || ""}</div>
          <div class="title">INVOICE</div>
        </div>

        <!-- 🔥 ELITE META -->
        <div class="meta">
          <div><strong>Invoice #:</strong> ${data.invoiceNumber || "—"}</div>
          <div><strong>Date:</strong> ${formatDate(data.date)}</div>
          <div><strong>Due Date:</strong> ${formatDate(data.dueDate)}</div>
        </div>

      </div>

      <div class="divider"></div>

      <!-- CLIENT -->
      <div class="client">
        <div class="label">Bill To</div>
        <div class="value">
          ${data.clientName || ""}
          ${
            data.clientEmail
              ? `<div style="margin-top:6px;color:#9ca3af;">${data.clientEmail}</div>`
              : ""
          }
        </div>
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

        <div class="left">
          ${
            data.notes && data.notes.trim()
              ? `<div class="notes">${data.notes}</div>`
              : ""
          }
        </div>

        <div class="right-box">

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

      </div>

    </div>
  </body>
  </html>
  `
}