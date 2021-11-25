import React from "react";
import { StyledSnackBar } from "./SnackBar.styles";

export const Snackbar = ({ isActive, message, children }: any) => {
  return (
    <StyledSnackBar isActive={isActive}>
      <>
        <p>{message}</p>
        {children}
      </>
    </StyledSnackBar>
  );
};
