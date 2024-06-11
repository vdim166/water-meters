import { t, flow, Instance } from 'mobx-state-tree';
import { areaDataType } from '../Types';
import { MeterModel } from './MeterModel';

const RootStore = t
  .model({
    meters: t.array(MeterModel),
    currentPage: t.optional(t.number, 1),
    totalPages: t.optional(t.number, 0),
    addresses: t.optional(t.map(t.string), {}),
    isLoading: t.optional(t.boolean, true),
  })
  .actions((self) => {
    const fetchMeters = flow(function* fetchMeters() {
      self.isLoading = true;
      const offset = 20;
      const response = yield fetch(
        `http://showroom.eis24.me/api/v4/test/meters/?limit=20&offset=${
          (self.currentPage - 1) * offset
        }`
      );
      const data = yield response.json();
      self.totalPages = Math.ceil(data.count / 20);

      const result = [];

      for (let meter of data.results) {
        if (self.addresses.has(meter.area.id)) {
          //оптимизация
          result.push({ ...meter, address: self.addresses.get(meter.area.id) });
          continue;
        }

        const areaResponse = yield fetch(
          `http://showroom.eis24.me/api/v4/test/areas/?id__in=${meter.area.id}`
        );
        const areaData: areaDataType = yield areaResponse.json();

        areaData.results.forEach((area) => {
          const address = `${area.house.address}, ${area.str_number_full}`;
          result.push({ ...meter, address });
          self.addresses.set(area.id, address);
        });
      }

      self.meters.replace(result);
      self.isLoading = false;
    });

    const setPage = (page: number) => {
      self.currentPage = page;
      fetchMeters();
    };

    return { fetchMeters, setPage };
  });

export type RootStoreType = Instance<typeof RootStore>;

let rootStore: RootStoreType;

export function useStore() {
  if (!rootStore) {
    rootStore = RootStore.create({});
  }

  return rootStore;
}
