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

export function templateLuxury2(data: any) {
  const items = Array.isArray(data.items) ? data.items : []
  const gold = "#D4AF37"

  return `
  <html>
  <head>
    <style>
      ${notoFont}

      @page { size: A4; margin: 0; }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        background: #0b0b0b;
        color: #f9fafb;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
      }

      .page {
        width: 794px;
        min-height: 1123px;
        margin: 0 auto;
        padding: 70px;
        position: relative;
      }

      .frame {
        position: absolute;
        inset: 30px;
        border: 1px solid ${gold};
        pointer-events: none;
      }

      .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 60px;
      }

      .brand {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .logo { max-width: 80px; }

      .company {
        font-size: 16px;
        color: ${gold};
        letter-spacing: 1px;
      }

      .title {
        font-size: 42px;
        font-weight: 700;
        letter-spacing: 3px;
        color: ${gold};
      }

      .meta {
        text-align: right;
        font-size: 13px;
        color: #9ca3af;
        line-height: 1.6;
      }

      .meta strong { color: ${gold}; }

      .divider {
        height: 1px;
        background: ${gold};
        margin: 40px 0;
      }

      .client { margin-bottom: 40px; }

      .label {
        font-size: 11px;
        text-transform: uppercase;
        color: #9ca3af;
        letter-spacing: 1px;
      }

      .value {
        margin-top: 6px;
        font-size: 18px;
      }

      .email {
        font-size: 14px;
        color: #9ca3af;
        margin-top: 4px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th {
        text-align: left;
        font-size: 12px;
        color: ${gold};
        border-bottom: 1px solid ${gold};
        padding-bottom: 10px;
      }

      td {
        padding: 18px 0;
        border-bottom: 1px solid rgba(212,175,55,0.2);
      }

      .right { text-align: right; }

      .summary {
        margin-top: 60px;
        display: flex;
        justify-content: flex-end;
      }

      .summary-box { width: 300px; }

      .row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        color: #d1d5db;
      }

      .total {
        margin-top: 15px;
        font-size: 32px;
        font-weight: 700;
        color: ${gold};
        border-top: 1px solid ${gold};
        padding-top: 10px;
      }

      .notes {
        margin-top: 60px;
        font-size: 13px;
        color: #9ca3af;
      }
    </style>
  </head>

  <body>

    <div class="page">
      <div class="frame"></div>

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