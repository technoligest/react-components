import { DateTime } from 'luxon';
import * as React from 'react';
import { Button, ButtonType } from '../Button';

export interface IDatePickerHelperButtonsProps {
  setCurrentMonth: (newDate: DateTime) => void;
  setSelectedDate: (newDate: DateTime) => void;
}

export const DatePickerHelperButtons: React.FunctionComponent<IDatePickerHelperButtonsProps> = props => {
  return (
    <div>
      <Button
        type={ButtonType.Inline}
        text={'Today'}
        onClick={() => {
          const now = DateTime.now();
          props.setCurrentMonth(DateTime.now().startOf('month'));
          props.setSelectedDate(DateTime.now().startOf('day'));
        }}
      />
    </div>
  );
};
