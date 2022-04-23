import { DateTime } from 'luxon';
import * as React from 'react';
import { DatePickerItemsGrid } from './DatePickerItemsGrid';
import { TDatePickerView } from './DatePickerTypes';

export interface IDatePickerMonthViewProps {
  currentMonth: DateTime;
  setCurrentMonth: (newDate: DateTime) => void;
  setViewType: (newType: TDatePickerView) => void;
}

export const DatePickerMonthView: React.FunctionComponent<IDatePickerMonthViewProps> = props => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return (
    <DatePickerItemsGrid
      items={months.map(month => ({
        value: month,
        onClick: () => {
          props.setCurrentMonth(
            props.currentMonth
              .startOf('year')
              .plus({ month: months.findIndex(m => m === month) })
          );
          props.setViewType('day');
        },
      }))}
      rowsSize={4}
    />
  );
};
