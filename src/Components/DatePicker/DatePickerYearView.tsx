import { DateTime } from 'luxon';
import * as React from 'react';
import { range } from '../../utils/utils';
import { DatePickerItemsGrid } from './DatePickerItemsGrid';
import { TDatePickerView } from './DatePickerTypes';

export interface IDatePickerYearViewProps {
  currentMonth: DateTime;
  yearOffset: number;
  setCurrentMonth: (newDate: DateTime) => void;
  setViewType: (newType: TDatePickerView) => void;
}

export const DatePickerYearView: React.FunctionComponent<
  IDatePickerYearViewProps
> = props => {
  return (
    <DatePickerItemsGrid
      items={getYearsArray(props.currentMonth, props.yearOffset).map(year => ({
        value: year.toString(),
        onClick: () => {
          props.setCurrentMonth(
            props.currentMonth.plus({ years: year - props.currentMonth.year })
          );
          props.setViewType('month');
        },
      }))}
      rowsSize={4}
    />
  );
};

function getYearsArray(currentMonth: DateTime, offset: number) {
  const currentYear = currentMonth.year;
  return range(currentYear - 5 + 12 * offset, currentYear + 6 + 12 * offset);
}
