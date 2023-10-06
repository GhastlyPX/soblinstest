"use client";
import type {
  CSSProperties,
  FC,
  MouseEvent,
  PropsWithChildren,
  ReactElement,
} from "react";
import React from "react";

export type ButtonProps = PropsWithChildren<{
  className?: string;
  disabled?: boolean;
  endIcon?: ReactElement;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  startIcon?: ReactElement;
  style?: CSSProperties;
  tabIndex?: number;
}>;

export const Button: FC<ButtonProps> = (props) => {
  return (
    <button
      className={
        "bg-primary-100 hover:bg-primary-50 transition-all py-2 lg:py-2 px-3 lg:px-6 border-[2px] relative min-w-[50px] lg:min-w-[155px] flex justify-center cursor-pointer text-[12px] lg:text-[16px]"
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
