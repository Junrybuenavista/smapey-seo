import chromium from "@sparticuz/chromium-min"
import puppeteer from "puppeteer-core"
import fullPuppeteer from "puppeteer"
import { getTemplate } from "@/lib/getTemplate"


export async function POST(req: Request) {
  try {
    const { templateId, data } = await req.json()

    const html = getTemplate(templateId, data)

    let browser

    const isProduction =
      process.env.VERCEL || process.env.NODE_ENV === "production"

    if (isProduction) {
      browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: true,
      })
    } else {
      browser = await fullPuppeteer.launch({
        headless: true,
      })
    }

    const page = await browser.newPage()

    await page.setViewport({
      width: 1200,
      height: 1600,
    })

    await page.setContent(html, {
      waitUntil: ["load", "domcontentloaded", "networkidle0"],
    })

    await new Promise((resolve) => setTimeout(resolve, 800))

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    })

    await browser.close()

    const pdfBuffer = Buffer.from(pdf)

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=invoice.pdf",
      },
    })
  } catch (error: any) {
    console.error("🔥 FINAL ERROR:", error)

    return new Response(
      JSON.stringify({
        error: "PDF failed",
        message: error.message,
      }),
      { status: 500 }
    )
  }
}