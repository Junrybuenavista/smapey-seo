import { currencyMap } from "./currency"
import { notoFont } from "./pdfFont"

// ✅ format money
export const formatMoney = (amount: number, currency: string) => {
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

export function templateSidebar(data: any) {
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
      }

      .invoice {
        display: flex;
        width: 100%;
        height: 100vh;
      }

      /* SIDEBAR */
      .sidebar {
        width: 28%;
        background: linear-gradient(180deg, #2563eb, #1e40af);
        color: white;
        padding: 50px 30px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .logo-img {
        max-width: 90px;
        margin-bottom: 20px;
      }

      .invoice-title {
        font-size: 28px;
        font-weight: 700;
        margin-top: 10px;
      }

      .company {
        margin-top: 8px;
        font-size: 14px;
        opacity: 0.85;
      }

      .sidebar-footer {
        font-size: 12px;
        opacity: 0.85;
        line-height: 1.6;
      }

      /* MAIN */
      .main {
        width: 72%;
        padding: 60px 50px;

        display: flex;
        flex-direction: column;
      }

      .top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start; /* 🔥 FIX ALIGNMENT */
        margin-bottom: 50px;
      }

      .right {
        text-align: right;
        line-height: 1.8; /* 🔥 CLEAN SPACING */
      }

      .label {
        font-size: 11px;
        color: #9ca3af;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .value {
        margin-top: 4px;
        font-size: 15px;
        font-weight: 500;
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
        border-bottom: 1px solid #e5e7eb;
      }

      td {
        padding: 16px 0;
        border-bottom: 1px solid #f3f4f6;
        font-size: 14px;
      }

      .right-text {
        text-align: right;
      }

      /* SUMMARY */
      .summary {
        margin-top: 50px;
        width: 320px;
        margin-left: auto;

        padding: 24px;
        border: 1px solid #e5e7eb;
        border-radius: 12px;

        background: #fafafa;
      }

      .summary-row {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        margin-bottom: 12px;
      }

      .summary-row span:first-child {
        color: #6b7280;
      }

      .summary-divider {
        height: 1px;
        background: #e5e7eb;
        margin: 14px 0;
      }

      .summary-total {
        display: flex;
        justify-content: space-between;
        font-size: 22px;
        font-weight: 700;
      }

      /* NOTES */
      .notes {
        margin-top: 50px;
        padding-top: 20px;
        border-top: 1px solid #e5e7eb;

        font-size: 13px;
        color: #374151;
      }

    </style>
  </head>

  <body>
    <div class="invoice">

      <!-- SIDEBAR -->
      <div class="sidebar">

        <div>
          ${
            data.logo
              ? `<img src="${data.logo}" class="logo-img" />`
              : `<div style="opacity:0.7;font-size:12px;">Your Brand</div>`
          }

          <div class="invoice-title">INVOICE</div>

          ${
            data.companyName
              ? `<div class="company">${data.companyName}</div>`
              : ""
          }
        </div>

        <div class="sidebar-footer">
          ${
            data.clientEmail
              ? `${data.clientEmail}<br/>`
              : ""
          }
          ${data.companyWebsite || ""}
        </div>

      </div>

      <!-- MAIN -->
      <div class="main">

        <div class="top">

          <!-- LEFT -->
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

          <!-- RIGHT (FIXED) -->
          <div class="right">
            <div><span class="label">Invoice #</span><br/><span class="value">${data.invoiceNumber || ""}</span></div>

            <div style="margin-top:12px">
              <span class="label">Date</span><br/>
              <span class="value">${formatDate(data.date)}</span>
            </div>

            <div style="margin-top:12px">
              <span class="label">Due Date</span><br/>
              <span class="value">${formatDate(data.dueDate)}</span>
            </div>
          </div>

        </div>

        <!-- TABLE -->
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th class="right-text">Total</th>
            </tr>
          </thead>

          <tbody>
            ${data.items.map((i:any) => `
              <tr>
                <td>${i.name}</td>
                <td class="right-text">${formatMoney(i.qty * i.price, data.currency)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>

        <!-- SUMMARY -->
        <div class="summary">
          <div class="summary-row">
            <span>Subtotal</span>
            <span>${formatMoney(data.subtotal, data.currency)}</span>
          </div>

          <div class="summary-row">
            <span>Tax (${data.taxRate || 0}%)</span>
            <span>${formatMoney(data.tax, data.currency)}</span>
          </div>

          <div class="summary-divider"></div>

          <div class="summary-total">
            <span>Total</span>
            <span>${formatMoney(data.total, data.currency)}</span>
          </div>
        </div>

        <!-- NOTES -->
        ${
          data.notes && data.notes.trim()
            ? `<div class="notes"><b>Notes:</b><br/>${data.notes}</div>`
            : ""
        }

      </div>
    </div>
  </body>
  </html>
  `
}