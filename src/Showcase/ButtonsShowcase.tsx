import * as React from 'react';
import { Button, ButtonType } from 'src/Components/Button';
import { ShowcaseHeader } from './ShowcaseHeader';

export const ButtonsShowcase: React.FC = () => {
  return (
    <>
      <ShowcaseHeader header='Buttons' />
      <div className='flex flex-row space-x-2'>
        <Button
          type={ButtonType.Primary}
          text={'Click'}
          onClick={() => alert('Clicked!')}
        />
        <Button
          type={ButtonType.Secondary}
          text={'Click'}
          onClick={() => alert('Clicked!')}
        />
        <Button
          type={ButtonType.Inline}
          text={'Click'}
          onClick={() => alert('Clicked!')}
        />
        <Button
          type={ButtonType.Danger}
          text={'Click'}
          onClick={() => alert('Clicked!')}
        />
      </div>
    </>
  );
};
