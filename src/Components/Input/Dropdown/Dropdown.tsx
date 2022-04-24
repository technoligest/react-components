import { ModifierPhases } from '@popperjs/core';
import * as React from 'react';

import { Modifier, usePopper } from 'react-popper';
import { Poppable } from '../../../Components/Common/Poppable';
import { DropdownItem } from '../../../Components/Input/Dropdown/DropdownItem';
import { DropdownListContainer } from '../../../Components/Input/Dropdown/DropdownListContainer';
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
    <Poppable
      anchor={props.anchor}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
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
    </Poppable>
  );
};
