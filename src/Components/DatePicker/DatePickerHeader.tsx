import classNames from 'classnames';
import { DateTime } from 'luxon';
import * as React from 'react';
import { TDatePickerView } from './DatePickerTypes';

export interface IDatePickerHeaderProps {
  currentMonth: DateTime;
  setCurrentMonth: (newDate: DateTime) => void;
  viewType: TDatePickerView;
  setViewType: (newType: TDatePickerView) => void;
  yearOffset: number;
  setYearOffset: (newOffset: number) => void;
}

export const DatePickerHeader: React.FunctionComponent<IDatePickerHeaderProps> = props => {
  return (
    <div className='flex flex-row justify-between items-center mb-5'>
      <div
        className='cursor-pointer'
        onClick={() => {
          switch (props.viewType) {
            case 'day':
              props.setCurrentMonth(props.currentMonth.minus({ month: 1 }));
              break;
            case 'year':
              props.setYearOffset(props.yearOffset - 1);
              break;
            case 'month':
          }
        }}
      >
        {'<'}
      </div>
      <div
        className='flex justify-center items-center flex-col'
        onClick={() => {
          switch (props.viewType) {
            case 'day':
              props.setViewType('month');
              break;
            case 'month':
              props.setViewType('year');
              break;
          }
        }}
      >
        <div
          className={classNames({
            ['cursor-pointer']: props.viewType !== 'year',
            ['cursor-default']: props.viewType === 'year',
          })}
        >
          {props.viewType === 'year' ? 'Year' : props.currentMonth.year}
        </div>
        {props.viewType == 'day' && (
          <div className='cursor-pointer'>{props.currentMonth.monthLong}</div>
        )}
      </div>
      <div
        className='cursor-pointer'
        onClick={() => {
          switch (props.viewType) {
            case 'day':
              props.setCurrentMonth(props.currentMonth.plus({ month: 1 }));
              break;
            case 'year':
              props.setYearOffset(props.yearOffset + 1);
              break;
            case 'month':
          }
        }}
      >
        {'>'}
      </div>
    </div>
  );
};
