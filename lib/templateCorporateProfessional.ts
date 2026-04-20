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

export function templateCorporate(data: any) {
  const items = Array.isArray(data.items) ? data.items : []
  const accent = data.brandColor || "#2563eb"

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
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
        background: #f8fafc;
        color: #111827;
      }

      .page {
        width: 794px;
        min-height: 1123px;
        margin: 0 auto;
        background: white;
        padding: 60px;
        position: relative;
      }

      .accent {
        position: absolute;
        left: 0;
        top: 0;
        width: 6px;
        height: 100%;
        background: ${accent};
      }

      .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 50px;
      }

      .brand {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .logo { max-width: 80px; }

      .company {
        font-size: 18px;
        font-weight: 600;
      }

      .title {
        font-size: 32px;
        font-weight: 700;
        color: ${accent};
      }

      .meta {
        text-align: right;
        font-size: 14px;
        color: #6b7280;
        line-height: 1.6;
      }

      .meta b { color: #111827; }

      .client { margin-bottom: 40px; }

      .label {
        font-size: 11px;
        text-transform: uppercase;
        color: #9ca3af;
      }

      .value {
        margin-top: 6px;
        font-size: 16px;
        font-weight: 500;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th {
        text-align: left;
        font-size: 12px;
        color: #6b7280;
        border-bottom: 1px solid #e5e7eb;
        padding-bottom: 10px;
      }

      td {
        padding: 16px 0;
        border-bottom: 1px solid #f3f4f6;
      }

      .right { text-align: right; }

      .summary {
        margin-top: 40px;
        display: flex;
        justify-content: flex-end;
      }

      .summary-box { width: 300px; }

      .row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        font-size: 14px;
      }

      .total {
        margin-top: 12px;
        font-size: 26px;
        font-weight: 700;
        color: ${accent};
      }

      .footer {
        margin-top: 60px;
        font-size: 13px;
        color: #9ca3af;
      }
    </style>
  </head>

  <body>
    <div class="page">
      <div class="accent"></div>

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

      <!-- CLIENT -->
      <div class="client">
        <div class="label">Bill To</div>
        <div class="value">${data.clientName || ""}</div>
        ${
          data.clientEmail
            ? `<div style="color:#6b7280;margin-top:4px;">${data.clientEmail}</div>`
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

      <!-- FOOTER -->
      ${
        data.notes && data.notes.trim()
          ? `<div class="footer">${data.notes}</div>`
          : ""
      }

    </div>
  </body>
  </html>
  `
}