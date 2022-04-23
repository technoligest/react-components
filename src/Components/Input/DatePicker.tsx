import * as React from 'react';
import DP from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

interface IDatePickerPropsBase {
  label: string;
}

interface ISingleDatePickerProps extends IDatePickerPropsBase {
  type: 'single';
  date: Date | undefined;
  setDate: (d: Date | undefined) => void;
}

interface IRangeDatePickerProps extends IDatePickerPropsBase {
  type: 'range';
  startDate: Date | undefined;
  setStartDate: (d: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (d: Date | undefined) => void;
}

export type IDatePickerProps = ISingleDatePickerProps | IRangeDatePickerProps;
export const DatePicker: React.FunctionComponent<IDatePickerProps> = props => {
  return (
    <div className='flex flex-row'>
      {props.label && (
        <div className='text-base mr-2 w-[200px]'>
          <span>{props.label}</span>
        </div>
      )}
      <DP
        selectsRange={props.type === 'range'}
        selected={props.type === 'single' ? props.date : undefined}
        startDate={props.type === 'range' ? props.startDate : undefined}
        endDate={props.type === 'range' ? props.endDate : undefined}
        onChange={date => {
          if (props.type === 'single') {
            props.setDate((date || undefined) as Date | undefined);
          }
          if (props.type === 'range') {
            const range = date as [Date | null, Date | null];
            props.setStartDate(range[0] || undefined);
            props.setEndDate(range[1] || undefined);
          }
        }}
        placeholderText={props.label}
        className='border dark:text-slate-900'
      />
    </div>
  );
};
