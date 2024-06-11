export const changeFormatTime = (time: string) => {
  const date = new Date(time)

  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

export const classToRussianName = (type: string) => {
  switch (type) {
    case "ColdWaterAreaMeter":
      return "ХВС"
    case "HotWaterAreaMeter":
      return "ГВС"

    default:
      return type
  }
}

export const getTypeClass = (type: string) => {
  switch (type) {
    case "ТПЛ":
      return "tpl"
    case "ColdWaterAreaMeter":
      return "hvs"
    case "HotWaterAreaMeter":
      return "gvs"
    case "ЭЛДТ":
      return "eldt"

    default:
      return ""
  }
}
