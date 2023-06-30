import React, { MouseEventHandler } from "react";
export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  btnType?: "button" | "submit";
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  textStyles?: string;
  rightIcon?: string;
  isDisabled?: boolean
}

export interface ServiceCardProps{
  icon: string
  title: string
  value: string
}