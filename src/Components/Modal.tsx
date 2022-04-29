import classnames from 'classnames';
import RModal from 'react-modal';
import * as React from 'react';
import { IToastProps, Toast } from './Toast';
import { ConfettiCanvas } from './ConfettiCanvas';

export interface IModalProps {
  title: string;
  onClose: () => void;
  className?: string;
  toast?: IToastProps | undefined;
}

export const Modal: React.FunctionComponent<
  React.PropsWithChildren<IModalProps>
> = props => {
  return (
    <>
      <RModal
        isOpen={true}
        onRequestClose={props.onClose}
        contentLabel='Example Modal'
        shouldCloseOnOverlayClick={true}
        overlayClassName={'fixed inset-0 bg-gray-200/50'}
        overlayElement={(p, contentElement) => (
          <div className='fixed inset-0 bg-gray-200/50'>
            <div className='w-full h-full realtive'>
              <ConfettiCanvas
                id={'modal-confetti'}
                className={classnames(
                  'z-[999] left-0 top-0 absolute w-screen h-screen'
                )}
              />
              <div
                className='z-[1000] absolute left-0 top-0 w-full h-full'
                id='hello'
                onClick={event => {
                  const target: any = event.target;
                  if (target.id !== 'hello') {
                    return;
                  }
                  props.onClose();
                }}
              >
                {contentElement}
              </div>
            </div>
          </div>
        )}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxHeight: 'calc(100vh - 50px)',
            maxWidth: '100vw',
            padding: '0px',
            border: 'none',
            borderRadius: '.75rem',
            background: 'none',
          },
        }}
      >
        <div
          className={classnames(
            props.className,
            'backdrop-blur-3xl bg-white/60 dark:bg-slate-900/50',
            'shadow-xl rounded-xl mh-full p-10 w-[500px] overflow-y-auto',
            'dark:text-white'
          )}
        >
          {props.toast && (
            <Toast {...props.toast} className={classnames('mb-5')} />
          )}
          <div className={'mb-6 font-semibold text-lg'}>
            <div className='text-lg'>{props.title}</div>
          </div>
          <div className={'mb-3'}>{props.children}</div>
        </div>
      </RModal>
    </>
  );
};
