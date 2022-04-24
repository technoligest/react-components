import * as React from 'react';
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
  const [isVisible, setIsVisible] = React.useState(false);
  return (
    <Poppable
      anchor={props.anchor}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
    >
      <DatePickerInternal
        {...props}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </Poppable>
  );
};
