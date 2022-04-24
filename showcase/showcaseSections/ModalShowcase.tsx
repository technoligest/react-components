import * as React from 'react';
import { Modal } from '../../src/Components/Modal';
import { Button, ButtonType } from '../../src/Components/Button';
import { ShowcaseHeader } from '../ShowcaseHeader';

export const ModalShowcase: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <ShowcaseHeader header='Modal' />
      <Button
        type={ButtonType.Primary}
        text={'Open Modal'}
        onClick={() => {
          setIsOpen(true);
        }}
      />
      {isOpen && (
        <Modal
          title={'Modal Title'}
          onClose={() => {
            setIsOpen(false);
          }}
          toast={undefined}
        >
          This is a modal!
        </Modal>
      )}
    </>
  );
};
