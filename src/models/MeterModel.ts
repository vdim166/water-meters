import { Instance, t } from "mobx-state-tree"

export const MeterModel = t.model({
  id: t.identifier,
  _type: t.array(t.string),
  installation_date: t.string,
  is_automatic: t.maybeNull(t.boolean),
  initial_values: t.array(t.number),
  description: t.string,
  area: t.model({
    id: t.string,
  }),
  address: t.optional(t.string, ""),
})

export type MeterModelType = Instance<typeof MeterModel>
