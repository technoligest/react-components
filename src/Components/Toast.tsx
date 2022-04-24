import classnames from 'classnames';
import * as React from 'react';
import { TIconName } from './Icon';

import { RowItemIcon } from './RowItemIcon';
// import './Toast.module.css';

export enum ToastType {
  info = 'info',
  warning = 'warning',
  error = 'error',
  success = 'success',
  loading = 'loading',
}

export type TSetToast = (
  toast: Pick<IToastProps, 'text' | 'type'> | undefined,
  duration?: number
) => void;

export interface IToastProps {
  type: ToastType;
  text: string;
  onDismiss: () => void;
  className?: string;
}

function getIconColor(type: ToastType): string {
  switch (type) {
    case ToastType.error:
    case ToastType.info:
    case ToastType.success:
    case ToastType.warning:
    case ToastType.loading:
      return 'white';
  }
}

function getXoutColor(type: ToastType): string {
  switch (type) {
    case ToastType.error:
      return '#ea4f2b';
    case ToastType.success:
      return '#3ebc60';
    case ToastType.warning:
      return '#ed9501';
    case ToastType.loading:
    case ToastType.info:
      return '#006ce5';
  }
}

function getIconName(type: ToastType): TIconName {
  switch (type) {
    case ToastType.error:
    case ToastType.warning:
      return 'HiExclamation';
    case ToastType.info:
      return 'FiInfo';
    case ToastType.success:
      return 'BiCheckCircle';
    case ToastType.loading:
      return 'FiRotateCw';
  }
}

export const Toast: React.FunctionComponent<IToastProps> = props => {
  return (
    <div
      className={classnames(
        props.className,
        'text-black pt-2 pr-3 pb-2 pl-3 rounded-xl flex flex-row items-center border-4 shadow-base',
        {
          ['bg-red-100 border-red-600']: props.type === ToastType.error,
          ['bg-blue-100 border-blue-600']:
            props.type === ToastType.info || props.type === ToastType.loading,
          ['bg-green-100 border-green-600']: props.type === ToastType.success,
          ['bg-orange-100 border-orange-600']: props.type === ToastType.warning,
        }
      )}
    >
      <RowItemIcon
        type={'icon'}
        containerClassName={classnames('w-10 h-10', {
          ['bg-red-600']: props.type === ToastType.error,
          ['bg-blue-600']:
            props.type === ToastType.info || props.type === ToastType.loading,
          ['bg-green-600']: props.type === ToastType.success,
          ['bg-orange-600']: props.type === ToastType.warning,
        })}
        iconClassName={classnames({
          'loading-icon': props.type === ToastType.loading,
        })}
        iconProps={{
          name: getIconName(props.type),
          color: getIconColor(props.type),
          size: 20,
        }}
      />
      <span className={'ml-3 text-lg'}>{props.text}</span>
      <RowItemIcon
        type={'icon'}
        containerClassName={classnames(
          'w-10 h-10 p3 transparent hover:text-white ml-auto'
        )}
        iconProps={{
          name: 'HiX',
          color: getXoutColor(props.type),
          size: 20,
        }}
        onClick={() => {
          props.onDismiss();
        }}
      />
    </div>
  );
};
