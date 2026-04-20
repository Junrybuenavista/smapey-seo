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

export function templateSaas(data: any) {
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

      * { box-sizing: border-box; }

      body {
        margin: 0;
        background: #f3f4f6;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
        color: #111827;
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

      .logo { max-width: 70px; }

      .company {
        font-size: 14px;
        color: #6b7280;
      }

      .title {
        font-size: 42px;
        font-weight: 800;
        letter-spacing: -1px;
      }

      .meta {
        text-align: right;
        font-size: 13px;
        color: #6b7280;
        line-height: 1.6;
      }

      .meta b { color: #111827; }

      .card {
        background: white;
        border-radius: 18px;
        padding: 26px;
        margin-bottom: 22px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.04);
      }

      .label {
        font-size: 11px;
        text-transform: uppercase;
        color: #9ca3af;
        letter-spacing: 0.5px;
      }

      .value {
        margin-top: 6px;
        font-size: 17px;
        font-weight: 600;
      }

      .sub {
        margin-top: 4px;
        font-size: 14px;
        color: #6b7280;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
      }

      th {
        text-align: left;
        font-size: 12px;
        color: #9ca3af;
        padding-bottom: 12px;
      }

      td {
        padding: 16px 0;
        border-top: 1px solid #f1f5f9;
      }

      .right { text-align: right; }

      .summary {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
      }

      .summary-box { width: 280px; }

      .row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        font-size: 14px;
        color: #6b7280;
      }

      .total-box {
        margin-top: 14px;
        padding: 16px;
        border-radius: 12px;
        background: #111827;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .total-label {
        font-size: 14px;
        opacity: 0.7;
      }

      .total-value {
        font-size: 28px;
        font-weight: 800;
      }

      .notes {
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

        <!-- ✅ FIXED META -->
        <div class="meta">
          <div><b>Invoice #:</b> ${data.invoiceNumber || ""}</div>
          <div><b>Date:</b> ${formatDate(data.date)}</div>
          <div><b>Due Date:</b> ${formatDate(data.dueDate)}</div>

          ${
            data.companyEmail
              ? `<div style="margin-top:6px;">${data.companyEmail}</div>`
              : ""
          }
        </div>

      </div>

      <!-- BILL TO -->
      <div class="card">
        <div class="label">Bill To</div>
        <div class="value">${data.clientName || ""}</div>

        ${
          data.clientEmail
            ? `<div class="sub">${data.clientEmail}</div>`
            : ""
        }
      </div>

      <!-- ITEMS -->
      <div class="card">

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

            <div class="total-box">
              <span class="total-label">Total</span>
              <span class="total-value">${formatMoney(data.total || 0, data.currency)}</span>
            </div>

          </div>
        </div>

      </div>

      <!-- NOTES -->
      ${
        data.notes && data.notes.trim()
          ? `<div class="card notes">${data.notes}</div>`
          : ""
      }

    </div>

  </body>
  </html>
  `
}