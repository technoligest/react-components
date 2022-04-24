import * as React from 'react';
import { TConfettiId } from '../utils/confettiUtils';

export interface IConfettiCanvasProps {
  id: TConfettiId;
  onClick?: () => void;
  className?: string;
}

export const ConfettiCanvas: React.FunctionComponent<
  IConfettiCanvasProps
> = props => {
  return (
    <canvas id={props.id} className={props.className} onClick={props.onClick} />
  );
};
