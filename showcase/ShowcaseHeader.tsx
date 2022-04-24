import * as React from 'react';

export interface IShowcaseHeader {
  header: string;
}

export const ShowcaseHeader: React.FC<IShowcaseHeader> = props => {
  return <span className='font-bold mb-3 mt-10'>{props.header}</span>;
};
