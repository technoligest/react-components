import classnames from 'classnames';
import * as React from 'react';

export interface IDropdownItemProps {
  text: string;
  onClick: () => void;
  style?: 'normal' | 'danger';
}

export const DropdownItem = React.forwardRef<
  HTMLDivElement,
  IDropdownItemProps
>((props, ref) => {
  const r = ref as any;
  if (r && r.focus) {
    r.focus();
  }
  const r1 = React.useRef(null);
  React.useEffect(() => {
    const c = r1.current as any;
    if (c && c.focus) {
      c.focus();
    }
  }, []);
  return (
    <div
      className={classnames(
        'cursor-pointer mt-[0.5rem] first:mt-0 content-start px-3 py-1 rounded-lg text-base text-slate-500 dark:text-white',
        {
          ['text-slate-50 hover:text-blue-600 hover:bg-blue-100 focus:text-blue-600 focus:bg-blue-100']:
            props.style === 'normal' || !props.style,
          ['hover:bg-red-500 hover:text-white']: props.style === 'danger',
        }
      )}
      onClick={() => {
        props.onClick();
      }}
      ref={r1}
    >
      {props.text}
    </div>
  );
});
