import { MetadataRoute } from "next"
import fs from "fs"
import path from "path"

const baseUrl = "https://smapeyinvoicingsoftware.com"

// Recursively get all page routes
function getRoutes(dir: string, basePath = ""): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  let routes: string[] = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    // Skip special folders/files
    if (
      entry.name.startsWith("_") ||
      entry.name.startsWith("(") ||
      entry.name === "api"
    ) {
      continue
    }

    if (entry.isDirectory()) {
      routes = routes.concat(
        getRoutes(fullPath, `${basePath}/${entry.name}`)
      )
    }

    // Detect page.tsx
    if (entry.isFile() && entry.name === "page.tsx") {
      routes.push(basePath || "")
    }
  }

  return routes
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = path.join(process.cwd(), "app")

  const routes = getRoutes(appDir)

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }))
}