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

export function templateGradient(data: any) {
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
        background: white;
        color: #111827;
      }

      .invoice {
        width: 100%;
        min-height: 100vh;
      }

      /* HEADER */
      .header {
        background: linear-gradient(135deg, #6366f1, #a855f7);
        color: white;
        padding: 60px 80px;

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
        opacity: 0.95;
      }

      .title {
        font-size: 34px;
        font-weight: 700;
        letter-spacing: 2px;
      }

      .meta {
        text-align: right;
        font-size: 13px;
        line-height: 1.8;
        opacity: 0.95;
      }

      .meta strong {
        color: #fff;
      }

      /* CONTENT */
      .content {
        padding: 60px 80px;
      }

      .row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;
      }

      .label {
        font-size: 11px;
        text-transform: uppercase;
        color: #9ca3af;
        letter-spacing: 0.5px;
      }

      .value {
        margin-top: 6px;
        font-size: 16px;
        font-weight: 500;
      }

      table {
        width: 100%;
        margin-top: 20px;
        border-collapse: collapse;
      }

      th {
        background: #f9fafb;
        padding: 14px;
        text-align: left;
        font-size: 12px;
        color: #6b7280;
        border-bottom: 1px solid #e5e7eb;
        font-weight: 600;
      }

      td {
        padding: 16px 14px;
        border-bottom: 1px solid #f3f4f6;
        font-size: 15px;
      }

      .right {
        text-align: right;
      }

      /* SUMMARY */
      .summary {
        margin-top: 40px;
        width: 320px;
        margin-left: auto;

        padding: 20px;
        border-radius: 10px;
        background: #f9fafb;
      }

      .summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        font-size: 15px;
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
        font-size: 28px;
        font-weight: 800;
        color: #7c3aed; /* 🔥 matches gradient */
      }

      .notes {
        margin-top: 50px;
        padding-top: 20px;
        border-top: 1px solid #e5e7eb;
        font-size: 14px;
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

        <div class="row">
          <div>
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

    </div>
  </body>
  </html>
  `
}