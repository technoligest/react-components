import * as React from 'react';
import classnames from 'classnames';
import { Icon, TIconName } from './Icon';

export enum ButtonType {
  Primary = 'Primary',
  Secondary = 'Secondary',
  Icon = 'Icon',
  Danger = 'Danger',
  Inline = 'Inline',
}

export enum ButtonIcon {
  FaUserEdit = 'FaUserEdit',
  BiChat = 'BiChat',
  BiCopy = 'BiCopy',
}

export enum ButtonSize {
  Large = 'Large',
  Medium = 'Medium',
  Small = 'Small',
}

export interface ITextButtonProps extends IBaseButtonProps {
  text: string;
  type:
    | ButtonType.Primary
    | ButtonType.Secondary
    | ButtonType.Danger
    | ButtonType.Inline;
  icon?: {
    name: TIconName;
    position: 'left' | 'right';
  };
}

interface IIconButtonProps extends IBaseButtonProps {
  icon: TIconName;
  text?: string;
  type: ButtonType.Icon;
}

interface IBaseButtonProps {
  rr?: React.MutableRefObject<null>;
  type: ButtonType;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  style?: 'default' | 'outline';
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
  isInlineWithInputField?: boolean;
  id?: string;
  loggingExtraData?: Record<string, string>;
  isLoading?: boolean;
}

export type IButtonProps = ITextButtonProps | IIconButtonProps;

export const Button: React.FunctionComponent<IButtonProps> = props => {
  const baseButtonClasses =
    'h-10 p-2.5 h-auto leading-4 rounded-lg cursor-pointer disabled:cursor-default border-0 text-base font-semibold';
  const onClick: React.MouseEventHandler<HTMLButtonElement> = event => {
    if (props.onClick) {
      if (props.id) {
        // diContainer
        //   .get<IAnalyticsService>(DI_TYPES.AnalyticsService)
        //   .trackButtonClick(props.id, props.loggingExtraData || {});
        // TODO: Add tracking back in
      }
      props.onClick(event);
    }
  };
  if (props.type === ButtonType.Icon) {
    return (
      <button
        ref={props.rr}
        type={'button'}
        onClick={onClick}
        disabled={props.disabled}
        className={classnames(
          'flex hover:bg-blue-600 hover:text-white disabled:text-black disabled:bg-white',
          baseButtonClasses,
          {
            ['min-w-140px']: !!props.text,
          },
          props.className
        )}
      >
        <Icon name={props.icon} size={25} />
        {props.text && (
          <div className={'ml-3'}>{props.text && <div>{props.text}</div>}</div>
        )}
      </button>
    );
  }
  return (
    <button
      ref={props.rr}
      type={'button'}
      onClick={(!props.disabled && onClick) || undefined}
      disabled={props.disabled}
      className={classnames(
        'flex justify-center items-center',
        baseButtonClasses,
        {
          ['bg-zinc-700	hover:bg-zinc-500 text-slate-50 disabled:bg-zinc-400 dark:bg-zinc-200 dark:disabled:bg-zinc-200 dark:text-slate-800 dark:hover:bg-zinc-400 ']:
            props.type === ButtonType.Inline,
          ['bg-rose-700	hover:bg-rose-500 disabled:bg-rose-400 text-slate-50']:
            props.type === ButtonType.Danger,
          'bg-blue-700 hover:bg-blue-500 disabled:bg-blue-400 text-slate-50':
            props.type === ButtonType.Primary,
          ['bg-slate-100	hover:bg-slate-200 disabled:bg-slate-50 text-slate-500']:
            props.type === ButtonType.Secondary,
        },
        props.className
      )}
    >
      <div className='align-middle flex justify-center items-center space-x-2'>
        {props.icon && props.icon.position === 'left' && (
          <Icon name={props.icon.name} size={20} />
        )}
        <div>{props.text}</div>
        {props.icon && props.icon.position === 'right' && (
          <Icon name={props.icon.name} size={20} />
        )}
        {props.isLoading && (
          <Icon
            name={'BsArrowClockwise'}
            size={25}
            className='top-1 right-1 animate-spin'
          />
        )}
      </div>
    </button>
  );
};
