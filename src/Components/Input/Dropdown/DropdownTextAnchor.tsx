import classnames from 'classnames';
import * as React from 'react';
import { Icon } from '../../../Components/Icon';
import { onEnterPress } from '../../../utils/utils';

export type DropdownTextAnchorStyle = 'normal' | 'compact';

export interface IDropdownTextContainerProps {
  text: string | undefined;
  label: string | undefined;
  anchorReference: React.MutableRefObject<null>;
  onClick: () => void;
  isHighlighted: boolean;
  style?: DropdownTextAnchorStyle;
  isErrored?: boolean;
}

export const DropdownTextAnchor: React.FunctionComponent<
  IDropdownTextContainerProps
> = props => {
  return (
    <div
      className={classnames(
        'h-[40px] rounded-xl border-2 cursor-pointer relative min-w-fit dark:text-white max-w-full',
        'active:border-blue-600 active:dark:border-blue-400', // Active
        {
          ['border-blue-600 dark:border-blue-400']:
            !props.isErrored && props.isHighlighted,
          ['border-slate-700 dark:border-white']:
            !props.isErrored && !props.isHighlighted,
          ['border-red-600']: props.isErrored,
        }
      )}
      ref={props.anchorReference}
      onClick={props.onClick}
      tabIndex={0}
      onKeyDown={onEnterPress(() => {
        props.onClick();
      })}
    >
      <div className={'w-52'} />
      {props.label && (
        <label
          className={classnames(
            'top-0 left-0 absolute z-1 transform origin-top-left inline-block transition transform-gpu text-lg cursor-pointer',
            'active:text-blue-600 active:dark:text-blue-400',
            {
              ['translate-x-4 translate-y-1 scale-100 text-slate-900 dark:text-white']:
                !props.text,
              ['-translate-y-6 px-2 scale-75 text-slate-900 dark:text-white']:
                Boolean(props.text),
              ['text-blue-600 dark:text-blue-400']: props.isHighlighted,
            }
          )}
        >
          <span>{props.label}</span>
        </label>
      )}
      <div
        className={classnames(
          'px-3 py-1.5 text-base content-box flex h-full whitespace-nowrap overflow-hidden text-slate-900',
          {
            ['text-slate-500 dark:text-white']: !props.isHighlighted,
            ['text-blue-600 dark:text-blue-400']: props.isHighlighted,
          }
        )}
      >
        {props.text}
        <div className={'ml-auto'}>
          <Icon name={'MdArrowDropDown'} />
        </div>
      </div>
    </div>
  );
};
