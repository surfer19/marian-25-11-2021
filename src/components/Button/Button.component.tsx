import React, { FunctionComponent } from "react";
import { StyledButton, StyledButtonProps } from "./Button.styles";

export type ButtonProps = {
  children: React.ReactNode | React.ReactNode[];
} & StyledButtonProps;

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  ...rest
}: ButtonProps) => <StyledButton {...rest}>{children}</StyledButton>;
