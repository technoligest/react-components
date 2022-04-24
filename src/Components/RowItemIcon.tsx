import * as React from 'react';
import classnames from 'classnames';
import { Icon, IIconProps } from './Icon';

interface IRowItemSharedProps {
  onClick?: () => void;
  containerClassName?: string;
  iconClassName?: string;
}

interface IRowItemIconProps1 extends IRowItemSharedProps {
  type: 'icon';
  iconProps: IIconProps;
}

interface IRowItemIconProps2 extends IRowItemSharedProps {
  type: 'emoji';
  emoji: string;
}

export type IRowItemIconProps = IRowItemIconProps1 | IRowItemIconProps2;

export const RowItemIcon: React.FunctionComponent<
  IRowItemIconProps
> = props => {
  return (
    <div
      className={classnames(
        props.containerClassName,
        'text-base flex text-center rounded-2xl',
        {
          ['cursor-pointer hover:bg-white']: Boolean(props.onClick),
        }
      )}
      onClick={props.onClick}
    >
      <div
        className={classnames(
          'm-auto flex flex-row justify-center',
          props.iconClassName
        )}
      >
        {props.type === 'emoji' ? props.emoji : <Icon {...props.iconProps} />}
      </div>
    </div>
  );
};
