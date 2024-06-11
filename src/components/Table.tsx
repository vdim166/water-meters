import { observer } from 'mobx-react-lite';
import { useStore } from '../models/RootState';
import List from './List';
import './Table.css';
import { Loader } from './Loader';

const Table = observer(() => {
  const store = useStore();

  if (store.isLoading) return <Loader />;

  return (
    <div className="overflow-x-auto rounded-t-lg max-h-[900px]">
      <table className="min-w-full bg-white border ">
        <thead className="bg-gray-100 ">
          <tr className="table-header">
            <th className="px-4 py-2 border-b text-left font-normal">№</th>
            <th className="px-4 py-2 border-b text-left font-normal">Тип</th>
            <th className="px-4 py-2 border-b text-left font-normal">
              Дата установки
            </th>
            <th className="px-4 py-2 border-b text-left font-normal">
              Автоматический
            </th>
            <th className="px-4 py-2 border-b text-left font-normal">
              Текущие показания
            </th>
            <th className="px-4 py-2 border-b text-left font-normal">Адрес</th>
            <th className="px-4 py-2 border-b text-left font-normal">
              Примечание
            </th>
            <th className="px-4 py-2 border-b text-left font-normal"> </th>
          </tr>
        </thead>
        <tbody>
          {store.meters.map((row, index) => (
            <List row={row} key={row.id} index={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default Table;
