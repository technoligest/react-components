import * as React from 'react';
import { useState } from 'react';
import { DatePicker } from '../src/Components/DatePicker/DatePicker';
import { ShowcaseHeader } from './ShowcaseHeader';
import { DateTime } from 'luxon';

export const DatepickerShowcase: React.FC = () => {
  const [date, setDate] = useState(DateTime.now());
  return (
    <>
      <ShowcaseHeader header='Date Picker' />
      <DatePicker
        selectedDate={date}
        setSelectedDate={setDate}
        anchor={{ type: 'inputField', text: date.toJSDate().toDateString() }}
      />
    </>
  );
};
