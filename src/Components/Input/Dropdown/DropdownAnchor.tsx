import * as React from 'react';
import { Button, IButtonProps } from 'src/Components/Button';
import {
  DropdownTextAnchor,
  DropdownTextAnchorStyle,
} from 'src/Components/Input/Dropdown/DropdownTextAnchor';

interface IDropdownButtonAnchorProps extends IDropdownAnchorBaseProps {
  type: 'button';
  buttonProps: IButtonProps;
}

interface IDropdownRegularProps extends IDropdownAnchorBaseProps {
  type: 'inputField';
  text: string | undefined;
  label?: string | undefined;
  errorMessage?: string | undefined; // TODO: Implement
  style?: DropdownTextAnchorStyle;
}

interface IDropdownAnchorBaseProps {
  disabled?: boolean; // TODO: Implement
  isLoading?: boolean; // TODO: Implement
}

export type IDropdownAnchorProps =
  | IDropdownRegularProps
  | IDropdownButtonAnchorProps;

export interface IDropdownAnchorInternalProps {
  outerProps: IDropdownAnchorProps;
  innerProps: {
    setIsVisible: (newVistibility: boolean) => void;
    isVisible: boolean;
    anchorReference: React.MutableRefObject<null>;
  };
}

export const DropdownAnchor: React.FunctionComponent<
  IDropdownAnchorInternalProps
> = props => {
  const buttonProps: IButtonProps | undefined =
    props.outerProps.type === 'button'
      ? {
          ...props.outerProps.buttonProps,
          onClick: event => {
            if (
              props.outerProps.type === 'button' &&
              props.outerProps.buttonProps.onClick
            ) {
              props.outerProps.buttonProps.onClick(event);
            }
            props.innerProps.setIsVisible(!props.innerProps.isVisible);
          },
          rr: props.innerProps.anchorReference,
        }
      : undefined;
  const errorMessage =
    props.outerProps.type === 'inputField' && props.outerProps.errorMessage;
  const [hasSeenErrorMessage, setHasSeenErrorMessage] = React.useState(
    Boolean(errorMessage)
  );
  React.useEffect(() => {
    if (errorMessage) {
      setHasSeenErrorMessage(true);
    }
  }, [errorMessage]);
  const errorMessageDiv = hasSeenErrorMessage && (
    <div className={'text-red-600 text-sm m-1 text-left h-5'}>
      {errorMessage}
    </div>
  );
  return (
    <>
      {buttonProps && <Button {...buttonProps} />}
      {props.outerProps.type === 'inputField' && (
        <>
          <DropdownTextAnchor
            text={props.outerProps.text}
            label={props.outerProps.label}
            anchorReference={props.innerProps.anchorReference}
            onClick={() =>
              props.innerProps.setIsVisible(!props.innerProps.isVisible)
            }
            isHighlighted={props.innerProps.isVisible}
            style={props.outerProps.style}
            isErrored={Boolean(errorMessage)}
          />
          {errorMessageDiv}
        </>
      )}
    </>
  );
};
