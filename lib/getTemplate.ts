import {
  templateGradient,
  templateSidebar,
  templateMinimal,
  templateDark,
  templateLuxury,
  templateGlass,
  templateCorporate,
  templateLuxury2,
  templateSaas,
  templateApple
} from "./invoiceTemplates"

export function getTemplate(id: string, data: any) {
  switch (id) {
    case "sidebar":
      return templateSidebar(data)
    case "minimal":
      return templateMinimal(data)
    case "dark":
      return templateDark(data)
    case "luxury":
      return templateLuxury(data)
    case "glass":
      return templateGlass(data)
    case "corporate":
      return templateCorporate(data)
    case "luxury2":
      return templateLuxury2(data)
    case "saas":
      return templateSaas(data)
    case "apple":
      return templateApple(data)                     
    default:
      return templateGradient(data)
  }
}