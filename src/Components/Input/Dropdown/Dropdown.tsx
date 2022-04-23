import { ModifierPhases } from '@popperjs/core';
import * as React from 'react';

import { Modifier, usePopper } from 'react-popper';
import { DropdownAnchor } from 'src/Components/Input/Dropdown/DropdownAnchor';
import { DropdownItem } from 'src/Components/Input/Dropdown/DropdownItem';
import { DropdownListContainer } from 'src/Components/Input/Dropdown/DropdownListContainer';
import { TextInput } from '../TextInput';
import { IDropdownAnchorProps } from './DropdownAnchor';
import { IDropdownItemProps } from './DropdownItem';

export interface IDropdownProps {
  items: IDropdownItemProps[];
  anchor: IDropdownAnchorProps;
  unfoundValue?: {
    onAdd: (newValue: string) => void;
    getLabel: (searchString: string) => string;
  };
  searchable?: boolean;
}

export const Dropdown: React.FunctionComponent<IDropdownProps> = props => {
  const [searchString, setSearchString] = React.useState('');
  const [isVisible, setIsVisible] = React.useState(false);
  const anchorReference = React.useRef(null);
  const popperRef = React.useRef(null);
  const { styles, attributes } = usePopperInternal(anchorReference, popperRef);

  useCloseOnClickOutside(popperRef, anchorReference, setIsVisible);
  const firstItemRef: React.LegacyRef<HTMLDivElement> | undefined =
    React.useRef(null);
  const dropdownItems = props.items
    .filter(
      item => item.text.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
    )
    .map((item, i) => {
      const ref = i === 0 ? firstItemRef : undefined;
      return (
        <DropdownItem
          key={item.text}
          {...item}
          onClick={() => {
            item.onClick();
            setIsVisible(false);
            setSearchString('');
          }}
          ref={ref}
          text={item.text}
        />
      );
    });
  return (
    <div>
      <DropdownAnchor
        outerProps={props.anchor}
        innerProps={{
          setIsVisible: newIsVisible => {
            setIsVisible(newIsVisible);
            if (newIsVisible) {
              if (firstItemRef.current) {
                (firstItemRef.current as any).focus();
              }
            }
          },
          isVisible,
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
        <DropdownListContainer isVisible={isVisible}>
          {props.searchable && (
            <TextInput
              type='text'
              value={searchString}
              onChange={setSearchString}
            />
          )}
          {dropdownItems}
          {props.unfoundValue &&
            searchString &&
            !props.items.find(item => item.text === searchString) && (
              <DropdownItem
                onClick={() => {
                  props.unfoundValue?.onAdd(searchString);
                  setIsVisible(false);
                  setSearchString('');
                }}
                text={props.unfoundValue.getLabel(searchString)}
              />
            )}
        </DropdownListContainer>
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