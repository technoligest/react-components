import * as React from 'react';
import { displayPhoneNumber, displayPrice, noop } from '../../utils/utils';
import { isNever } from '../../utils/utils';
import { Icon } from '../../Components/Icon';
import { TextInputInternal } from '../../Components/Input/TextInputInternal';

interface IBaseInputProps<T> {
  disabled?: boolean;
  label?: string;
  value: T | undefined;
  onChange: undefined | ((newValue: T) => void);
  onChangeNullable?: undefined | ((newValue: T | undefined) => void);
  validationStatus?: 'loading' | 'valid' | 'invalid';
  errorMessage?: string;
  onEnterPressed?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  className?: string;
}

export interface IMoneyTextInputProps extends IBaseInputProps<number> {
  type: 'money';
}

export interface INumberTextInputProps extends IBaseInputProps<number> {
  type: 'number';
}

export interface ITextualInputProps extends IBaseInputProps<string> {
  type: 'text';
}

export interface IPasswordInputProps extends IBaseInputProps<string> {
  type: 'password';
}

export interface IPhoneNumberInputProps extends IBaseInputProps<string> {
  type: 'phoneNumber';
}

export interface IMultilineInputProps extends IBaseInputProps<string> {
  type: 'multiline';
}

export type ITextInputProps =
  | IMoneyTextInputProps
  | INumberTextInputProps
  | ITextualInputProps
  | IPasswordInputProps
  | IPhoneNumberInputProps
  | IMultilineInputProps;

export const TextInput: React.FunctionComponent<ITextInputProps> = props => {
  const [hasSeenErrorMessage, setHasSeenErrorMessage] = React.useState(
    Boolean(props.errorMessage)
  );
  React.useEffect(() => {
    if (props.errorMessage) {
      setHasSeenErrorMessage(true);
    }
  }, [props.errorMessage]);
  const errorMessage = hasSeenErrorMessage && (
    <div className={'text-red-600 text-sm m-1 text-left h-5'}>
      {props.errorMessage}
    </div>
  );
  if (!props.validationStatus) {
    return (
      <div className='w-full'>
        <TextInputWithoutValidation {...props} />
        {errorMessage}
      </div>
    );
  } else {
    return (
      <div className='w-full'>
        <div className={'flex items-center space-x-3'}>
          <div className={'flex-grow'}>
            <TextInputWithoutValidation {...props} />
          </div>
          <div className={''}>
            {props.validationStatus === 'invalid' && (
              <Icon name={'FcCancel'} size={25} />
            )}
            {props.validationStatus === 'valid' && (
              <Icon name={'FcOk'} size={25} />
            )}
            {props.validationStatus === 'loading' && (
              <Icon name={'FcProcess'} size={25} />
            )}
          </div>
        </div>
        {errorMessage}
      </div>
    );
  }
};
export const TextInputWithoutValidation: React.FunctionComponent<
  ITextInputProps
> = props => {
  return (
    <TextInputInternal
      placeholder={props.placeholder}
      value={getValue(props)}
      disabled={props.disabled}
      onChange={getOnChange(props) || noop}
      label={props.label}
      className={props.className}
      errorMessage={props.errorMessage}
      type={
        props.type === 'password'
          ? 'password'
          : props.type === 'multiline'
          ? 'textarea'
          : 'text'
      }
      // onKeyDown={
      //   props.onEnterPressed ? onEnterPress(props.onEnterPressed) : undefined
      // }
      // multiline={props.type === 'multiline'}
      // autoAdjustHeight={props.type === 'multiline'}
      onBlur={props.onBlur}
    />
  );
};

function getValue(props: ITextInputProps): string {
  switch (props.type) {
    case 'number':
      return props.value !== undefined ? '' + props.value : '';
    case 'money':
      return props.value !== undefined ? displayPrice(props.value) : '';
    case 'text':
    case 'password':
    case 'multiline':
      return props.value || '';
    case 'phoneNumber':
      return displayPhoneNumber(props.value || '');
    default:
      isNever(props);
  }
}

function getOnChange(
  props: ITextInputProps
): undefined | ((newValue: string | undefined) => void) {
  const onChange = props.onChange;
  if (!onChange) {
    return undefined;
  }
  switch (props.type) {
    case 'money':
    case 'number': {
      const onChangeNumber = props.onChange;
      if (!onChangeNumber) {
        return undefined;
      }
      return t => {
        if (t === undefined || t === '') {
          onChangeNumber(0);
          if (props.onChangeNullable) {
            props.onChangeNullable(undefined);
          }
          return;
        }
        const newMoney = +t.replace(/[^0-9]+/g, '');
        if (!isNaN(newMoney) && newMoney >= 0) {
          onChangeNumber(newMoney);
          if (props.onChangeNullable) {
            props.onChangeNullable(newMoney);
          }
        }
      };
    }
    case 'text':
    case 'password':
    case 'phoneNumber':
    case 'multiline': {
      const onChangeText = props.onChange;
      if (!onChangeText) {
        return undefined;
      }
      return t => {
        if (t === undefined) {
          t = '';
        }
        onChangeText(t);
        if (props.onChangeNullable) {
          props.onChangeNullable(undefined);
        }
      };
    }
    default:
      isNever(props);
  }
}
