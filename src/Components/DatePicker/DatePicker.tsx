import * as React from 'React';
import { DateTime } from 'luxon';
import { Poppable } from '../Common/Poppable';
import { DatePickerInternal } from './DatePickerInternal';
import { IDropdownAnchorProps } from '../Input/Dropdown/DropdownAnchor';

export interface IDatePickerProps {
  anchor: IDropdownAnchorProps;
  selectedDate: DateTime | undefined;
  setSelectedDate: (newDate: DateTime | undefined) => void;
}

export const DatePicker: React.FC<IDatePickerProps> = props => {
  return (
    <Poppable anchor={props.anchor}>
      <DatePickerInternal {...props} />
    </Poppable>
  );
};
