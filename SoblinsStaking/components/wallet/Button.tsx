import type {
  CSSProperties,
  FC,
  MouseEvent,
  PropsWithChildren,
  ReactElement
} from 'react';
import React from 'react';

export type ButtonProps = PropsWithChildren<{
  className?: string;
  disabled?: boolean;
  endIcon?: ReactElement;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  startIcon?: ReactElement;
  style?: CSSProperties;
  tabIndex?: number;
}>;

export const Button: FC<ButtonProps> = props => {
  return (
    <button
      className={
        'bg-soblinRed-1 rounded-[10px] min-h-[40px] h-full w-[148px] text-soblinRed-3 text-base font-bold'
      }
      disabled={props?.disabled}
      style={props?.style}
      onClick={props?.onClick}
      tabIndex={props?.tabIndex || 0}
      type="button"
    >
      {props?.startIcon !== undefined && (
        <i className="wallet-adapter-button-start-icon">{props?.startIcon}</i>
      )}
      {props?.children}
    </button>
  );
};
