import classNames from 'classnames';
import { DateTime } from 'luxon';
import * as React from 'react';

export interface IDatePickerDayViewProps {
  currentMonth: DateTime;
  selectedDate: DateTime | undefined;
  setSelectedDate: (newDate: DateTime) => void;
}

export const DatePickerDayView: React.FunctionComponent<
  IDatePickerDayViewProps
> = props => {
  return (
    <div className=''>
      {getRows(props.currentMonth).map(row => (
        <div className='flex flex-row justify-between'>
          {row.map(s => (
            <span
              className={classNames(
                'w-10 h-10 flex justify-center items-center m-1',
                {
                  ['cursor-pointer hover:bg-blue-500 hover:text-white rounded-lg']:
                    s?.clickable,
                  ['cursor-default']: !s?.clickable,
                  ['bg-blue-600 text-white ']:
                    props.selectedDate &&
                    s?.date
                      ?.startOf('day')
                      .equals(props.selectedDate?.startOf('day')),
                }
              )}
              onClick={
                s?.date
                  ? () => {
                      if (s?.date) {
                        props.setSelectedDate(s.date.startOf('day'));
                      }
                    }
                  : undefined
              }
            >
              {s?.text}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

function getRows(
  monthStart: DateTime
): { text: string; clickable?: boolean; date?: DateTime }[][] {
  monthStart = monthStart.startOf('month');
  let week = new Array(7).fill(undefined);
  const res = [
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => ({
      text: day,
    })),
  ];
  for (let i = 1; i <= monthStart.daysInMonth; ++i) {
    const newDay = monthStart.plus({ day: i - 1 });
    if (newDay.weekday === 1) {
      week = new Array(7).fill(undefined);
    }
    week[newDay.weekday - 1] = {
      text: String(i),
      clickable: true,
      date: newDay,
    };
    if (newDay.weekday === 7 || i === monthStart.daysInMonth) {
      res.push(week);
    }
  }

  return res;
}
