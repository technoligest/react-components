import { DateTime } from 'luxon';
import * as React from 'react';
import { DatePickerDayView } from './DatePickerDayView';
import { DatePickerHeader } from './DatePickerHeader';
import { DatePickerHelperButtons } from './DatePickerHelperButtons';
import { DatePickerMonthView } from './DatePickerMonthView';
import { TDatePickerView } from './DatePickerTypes';
import { DatePickerYearView } from './DatePickerYearView';

export interface IDatePickerInternalProps {
  selectedDate: DateTime | undefined;
  setSelectedDate: (newDate: DateTime | undefined) => void;
}

export const DatePickerInternal: React.FunctionComponent<
  IDatePickerInternalProps
> = props => {
  const [currentMonth, setCurrentMonth] = React.useState(
    DateTime.now().startOf('month')
  );
  const [viewType, setViewType] = React.useState<TDatePickerView>('day');
  const [yearOffset, setYearOffset] = React.useState(0);

  return (
    <div className='w-[400px]'>
      <DatePickerHeader
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        viewType={viewType}
        setViewType={setViewType}
        yearOffset={yearOffset}
        setYearOffset={setYearOffset}
      />
      {viewType === 'day' && (
        <DatePickerDayView
          currentMonth={currentMonth}
          selectedDate={props.selectedDate}
          setSelectedDate={props.setSelectedDate}
        />
      )}
      {viewType === 'month' && (
        <DatePickerMonthView
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          setViewType={setViewType}
        />
      )}
      {viewType === 'year' && (
        <DatePickerYearView
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          setViewType={setViewType}
          yearOffset={yearOffset}
        />
      )}

      <DatePickerHelperButtons
        setCurrentMonth={setCurrentMonth}
        setSelectedDate={props.setSelectedDate}
      />
    </div>
  );
};
