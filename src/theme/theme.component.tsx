import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme.constants";

const Theme = ({ children }: any) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
