import classnames from 'classnames';
import { FC, PropsWithChildren } from 'react';
import * as React from 'react';

export interface IDropdownListContainerProps {
  isVisible: boolean;
}

export const DropdownListContainer: FC<
  PropsWithChildren<IDropdownListContainerProps>
> = props => {
  return (
    <div
      className={classnames(
        'w-full h-full max-h-[40vh] flex flex-col shadow-base border-1 bg-white dark:shadow-base dark:bg-slate-800 my-3 p-2 overflow-y-auto rounded-xl',
        {
          ['hidden']: !props.isVisible,
        }
      )}
    >
      {props.children}
    </div>
  );
};
