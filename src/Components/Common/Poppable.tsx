import { ModifierPhases } from '@popperjs/core';
import * as React from 'react';

import { Modifier, usePopper } from 'react-popper';
import { DropdownAnchor } from '../../Components/Input/Dropdown/DropdownAnchor';
import { IDropdownAnchorProps } from '../Input/Dropdown/DropdownAnchor';

export interface IDropdownProps {
  anchor: IDropdownAnchorProps;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export const Poppable: React.FunctionComponent<
  React.PropsWithChildren<IDropdownProps>
> = props => {
  const anchorReference = React.useRef(null);
  const popperRef = React.useRef(null);
  const { styles, attributes } = usePopperInternal(anchorReference, popperRef);

  useCloseOnClickOutside(popperRef, anchorReference, props.setIsVisible);
  const firstItemRef: React.LegacyRef<HTMLDivElement> | undefined =
    React.useRef(null);
  return (
    <div>
      <DropdownAnchor
        outerProps={props.anchor}
        innerProps={{
          setIsVisible: newIsVisible => {
            props.setIsVisible(newIsVisible);
            if (newIsVisible) {
              if (firstItemRef.current) {
                (firstItemRef.current as any).focus();
              }
            }
          },
          isVisible: props.isVisible,
          anchorReference,
        }}
      />
      <div
        ref={popperRef}
        style={{
          ...styles.popper,
          zIndex: 1000,
          marginBottom: '5px !important',
        }}
        {...attributes.popper}
      >
        {props.children}
      </div>
    </div>
  );
};

function usePopperInternal(
  referenceRef: React.MutableRefObject<null>,
  popperRef: React.MutableRefObject<null>
) {
  const modifiers: ReadonlyArray<Modifier<any>> = React.useMemo(
    () => [
      {
        name: 'sameWidth' as any,
        enabled: true,
        fn: ({ state }) => {
          state.styles.popper.minWidth = `${state.rects.reference.width}px`;
        },
        effect({ state }) {
          state.elements.popper.style.minWidth = `${
            (state.elements.reference as any).offsetWidth
          }px`;
        },
        phase: 'beforeWrite' as ModifierPhases,
        requires: ['computeStyles'],
      },
    ],
    [popperRef.current]
  );
  return usePopper(referenceRef.current, popperRef.current, {
    placement: 'bottom-start',
    strategy: 'fixed',
    modifiers,
  });
}

function useCloseOnClickOutside(
  popperRef: React.MutableRefObject<any>,
  anchorReference: React.MutableRefObject<any>,
  setVisibility: (isVisible: boolean) => void
) {
  React.useEffect(() => {
    // listen for clicks and close dropdown on body
    document.addEventListener(
      'mousedown',
      handleDocumentClick(popperRef, anchorReference, setVisibility)
    );
    return () => {
      document.removeEventListener(
        'mousedown',
        handleDocumentClick(popperRef, anchorReference, setVisibility)
      );
    };
  }, []);
}

function handleDocumentClick(
  popperRef: React.MutableRefObject<any>,
  anchorReference: React.MutableRefObject<any>,
  setVisibility: (isVisible: boolean) => void
): (event: MouseEvent) => void {
  return (event: MouseEvent) => {
    if (
      anchorReference?.current?.contains(event.target) ||
      popperRef?.current?.contains(event.target)
    ) {
      return;
    }
    setVisibility(false);
    return event;
  };
}
