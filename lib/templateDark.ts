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

export function templateDark(data: any) {
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
        background: #0f172a;
        color: #e5e7eb;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
      }

      .invoice {
        width: 100%;
        min-height: 100vh;
      }

      /* HEADER */
      .header {
        padding: 60px 80px;
        border-bottom: 1px solid #1f2937;

        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }

      .brand {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .logo {
        max-width: 90px;
      }

      .company {
        font-size: 18px;
        font-weight: 600;
      }

      .title {
        font-size: 34px;
        font-weight: 700;
        letter-spacing: 2px;
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

      /* CONTENT */
      .content {
        padding: 60px 80px;
      }

      .section {
        margin-bottom: 40px;
      }

      .label {
        font-size: 11px;
        color: #6b7280;
        text-transform: uppercase;
      }

      .value {
        margin-top: 6px;
        font-size: 16px;
      }

      table {
        width: 100%;
        margin-top: 30px;
        border-collapse: collapse;
      }

      th {
        text-align: left;
        padding: 14px;
        background: #1f2937;
        color: #9ca3af;
        font-size: 12px;
        font-weight: 600;
      }

      td {
        padding: 16px 14px;
        border-bottom: 1px solid #1f2937;
      }

      .right {
        text-align: right;
      }

      /* SUMMARY */
      .summary {
        margin-top: 40px;
        width: 320px;
        margin-left: auto;
      }

      .summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        color: #9ca3af;
      }

      .summary-divider {
        height: 1px;
        background: #1f2937;
        margin: 12px 0;
      }

      .total {
        font-size: 28px;
        font-weight: 800;
        color: #22c55e; /* 🔥 brighter green */
      }

      /* NOTES */
      .notes {
        margin-top: 50px;
        padding-top: 20px;
        border-top: 1px solid #1f2937;
        color: #6b7280;
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
              ? `<div class="company">${data.companyName}</div>`
              : ""
          }

          <div class="title">INVOICE</div>
        </div>

        <!-- 🔥 IMPROVED META -->
        <div class="meta">
          <div><strong>Invoice #:</strong> ${data.invoiceNumber || "—"}</div>
          <div><strong>Date:</strong> ${formatDate(data.date)}</div>
          <div><strong>Due Date:</strong> ${formatDate(data.dueDate)}</div>
        </div>

      </div>

      <!-- CONTENT -->
      <div class="content">

        <!-- BILL TO -->
        <div class="section">
          <div class="label">Bill To</div>
          <div class="value">
            ${data.clientName || ""}
            ${
              data.clientEmail
                ? `<div style="margin-top:4px;color:#9ca3af;font-size:13px;">${data.clientEmail}</div>`
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

          <div class="summary-row total">
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

    </div>
  </body>
  </html>
  `
}