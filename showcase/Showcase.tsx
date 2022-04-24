import * as React from 'react';
import { ButtonsShowcase } from './ButtonsShowcase';
import { DatepickerShowcase } from './DatepickerShowcase';
import { ModalShowcase } from './showcaseSections/ModalShowcase';

export const Showcase: React.FC = () => {
  return (
    <div className='flex flex-col'>
      <div className='w-[500px] m-auto flex flex-col'>
        <div className='font-bold text-xl'>Showcase</div>
        <ButtonsShowcase />
        <DatepickerShowcase />
        <ModalShowcase />
      </div>
    </div>
  );
};
