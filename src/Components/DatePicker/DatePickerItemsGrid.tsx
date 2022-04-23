import * as React from 'react';

export interface DatePickerGridItem {
  value: string;
  onClick: () => void;
}
export interface IDatePickerItemsGridProps {
  items: DatePickerGridItem[];
  rowsSize: number;
}

export const DatePickerItemsGrid: React.FunctionComponent<IDatePickerItemsGridProps> = props => {
  const rows = getRows(props.items, props.rowsSize);
  return (
    <div className='w-full space-y-5 flex flex-col'>
      {rows.map(row => (
        <div className='flex flex-row justify-between'>
          {row.map(item => (
            <div className='w-20 flex justify-center cursor-pointer'>
              <div
                className='hover:text-white hover:bg-blue-500 rounded-lg p-2'
                onClick={item.onClick}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

function getRows(items: DatePickerGridItem[], rowsSize: number) {
  const res = [];
  for (let eaten = 0; eaten < items.length; eaten += rowsSize) {
    res.push(items.slice(eaten, eaten + rowsSize));
  }
  return res;
}
