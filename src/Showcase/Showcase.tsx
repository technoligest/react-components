import * as React from 'react';
import { Button, ButtonType } from 'src/Components/Button';
import { DatePicker } from 'src/Components/DatePicker/DatePicker';
import { ButtonsShowcase } from './ButtonsShowcase';
import { DatepickerShowcase } from './DatepickerShowcase';
import { ShowcaseHeader } from './ShowcaseHeader';

export const Showcase: React.FC = () => {
  return (
    <div className='flex flex-col'>
      <div className='w-[500px] m-auto flex flex-col'>
        <div className='font-bold text-xl'>Showcase</div>
        <ButtonsShowcase />
        <DatepickerShowcase />
      </div>
    </div>
  );
};
