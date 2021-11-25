import React, { ReactNode } from "react";
import { StyledSnackBar } from "./SnackBar.styles";

export type SnackbarProps = {
  isActive: boolean;
  message?: string;
  children?: ReactNode;
};

export const Snackbar = ({ isActive, message, children }: SnackbarProps) => {
  return (
    <StyledSnackBar isActive={isActive}>
      <>
        <p>{message}</p>
        {children}
      </>
    </StyledSnackBar>
  );
};
