import classnames from 'classnames';
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
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
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
    <div
      className={classnames(
        'w-[400px] shadow-base border-1 bg-white rounded-xl p-5',
        {
          ['hidden']: !props.isVisible,
        }
      )}
    >
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
          setSelectedDate={d => {
            props.setSelectedDate(d);
            props.setIsVisible(false);
          }}
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
