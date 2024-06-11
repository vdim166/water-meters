export type RowsType = {
  id: string
  _type: string[]
  area: { id: string }
  is_automatic: null
  address: string
  communication: string
  description: string
  serial_number: string
  installation_date: string
  brand_name: string
  model_name: string
  initial_values: number[]
}

export type areaDataType = {
  results: {
    id: string
    str_number: string
    str_number_full: string
    house: {
      address: string
      id: string
    }
  }[]
}
