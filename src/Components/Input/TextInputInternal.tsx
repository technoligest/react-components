import classnames from 'classnames';
import * as React from 'react';
import { Icon } from 'src/Components/Icon';
import uuid from 'uuid';

export interface ITextInputInternalprops {
  value: string | undefined;
  label?: string;
  placeholder?: string;
  onChange: (newValue: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean; // TODO: Implement
  type: 'text' | 'password' | 'textarea';
  className?: string;
  multiline?: string;
  errorMessage?: string;
}

export const TextInputInternal: React.FunctionComponent<
  ITextInputInternalprops
> = props => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isPasswordShown, setIsPasswordShown] = React.useState(false);
  const [htmlId] = React.useState(uuid.v4());
  const inputProps = {
    disabled: props.disabled,
    placeholder: props.placeholder,
    value: props.value,
    id: htmlId,
    onChange: (e: any) => {
      if (props.onChange) {
        props.onChange(e.target.value);
      }
    },
    className: classnames(
      'box-border h-auto w-full px-3 py-2 h-[40px] border-2 rounded-xl text-base dark:text-white',
      'bg-transparent',
      {
        ['border-slate-700 dark:border-slate-200']:
          !isFocused && !props.errorMessage,
        ['border-blue-600 dark:border-blue-500']:
          isFocused && !props.errorMessage,
        ['border-red-600']: Boolean(props.errorMessage),
      }
    ),
    onFocus: () => {
      if (props.onFocus) {
        props.onFocus();
      }
      setIsFocused(true);
    },
    onBlur: () => {
      if (props.onBlur) {
        props.onBlur();
      }
      setIsFocused(false);
    },
  };
  return (
    <div className={classnames('relative', props.className)}>
      {props.label && (
        <label
          htmlFor={htmlId}
          className={classnames(
            'top-0 left-0 absolute z-1 transform origin-top-left inline-block transition transform-gpu text-base  cursor-text rounded-xl',
            {
              ['translate-x-3 translate-y-2 scale-100 text-slate-700 dark:text-slate-100']:
                !isFocused && !props.value,
              ['text-slate-900']: props.value,
              ['text-blue-600 dark:text-blue-500']:
                isFocused && !props.errorMessage,
              [' -translate-y-5 px-2 scale-75']: isFocused || props.value,
              ['text-red-600']: Boolean(props.errorMessage),
            }
          )}
        >
          <span>{props.label}</span>
        </label>
      )}
      {props.type === 'password' && props.value && (
        <Icon
          name={isPasswordShown ? 'AiFillEye' : 'AiFillEyeInvisible'}
          className={'absolute right-8 top-2 cursor-pointer'}
          onClick={() => setIsPasswordShown(!isPasswordShown)}
        />
      )}
      {props.type === 'textarea' && <textarea {...inputProps} />}
      {props.type !== 'textarea' && (
        <input
          {...inputProps}
          type={
            props.type === 'password' && isPasswordShown ? 'text' : props.type
          }
        />
      )}
    </div>
  );
};
