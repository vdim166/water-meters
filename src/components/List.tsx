import { useState } from 'react';
import './List.css';
import { TrashButton } from './TrashButton';
import { changeFormatTime, classToRussianName, getTypeClass } from '../utils';
import { MeterModelType } from '../models/MeterModel';

const List = ({ row, index }: { row: MeterModelType; index: number }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const deleteMeter = (meterId: string) => {
    setIsDisabled(true);

    fetch(`http://showroom.eis24.me/api/v4/test/meters/${meterId}`, {
      method: 'DELETE',
    }).then((res) => console.log(`${meterId} deleted`));
  };

  return (
    <tr
      className="border-t list-element"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <td className="px-4 py-4 border-b">{index}</td>
      <td className="px-3 py-2 border-b">
        <span className={`img-el ${getTypeClass(row._type[0])}`}></span>
        {classToRussianName(row._type[0])}
      </td>
      <td className="px-4 py-2 border-b">
        {changeFormatTime(row.installation_date)}
      </td>
      <td className="px-4 py-2 border-b">{row.is_automatic ? 'да' : 'нет'}</td>
      <td className="px-4 py-2 border-b">{row.initial_values[0]}</td>
      <td className="px-4 py-2 border-b">{row.address}</td>
      <td className="px-4 py-2 border-b list-desc">{row.description}</td>
      <td className="px-4 py-2 border-b">
        <button
          className="bg-transparent p-2 text-transparent"
          style={{ visibility: isHovering ? 'hidden' : 'visible' }}
        ></button>
        <button
          className="p-2 text-white"
          onClick={() => deleteMeter(row.id)}
          disabled={isDisabled}
          style={{ visibility: isHovering ? 'visible' : 'hidden' }}
        >
          <TrashButton isDisabled={isDisabled} show={isHovering} />
        </button>
      </td>
    </tr>
  );
};

export default List;
