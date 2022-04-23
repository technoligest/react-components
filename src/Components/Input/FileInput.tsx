import classnames from 'classnames';
import * as React from 'react';
import { Icon } from '../Icon';

export interface IFileInputProps {
  setFile: (f: File | undefined) => void;
  disabled?: boolean;
  label: string;
  id: string;
}

export const FileInput: React.FunctionComponent<IFileInputProps> = props => {
  return (
    <>
      <label htmlFor={props.id} className='w-full cursor-pointer'>
        <div
          className={classnames(
            'border rounded-xl h-20 w-full overflow-hidden flex flex-row p-2',
            'hover:border-blue-600  hover:text-blue-600'
          )}
        >
          <div className='flex flex-col justify-center items-center w-full space-y-2'>
            <Icon name='FiUpload' />
            <span>{props.label}</span>
          </div>
        </div>
      </label>
      <input
        type='file'
        name='file'
        id={props.id}
        disabled={props.disabled}
        onChange={event => {
          const file = (event?.target?.files || [null])[0];
          props.setFile(file || undefined);
        }}
        className='opacity-0 absolute -z-10'
      />
    </>
  );
};
