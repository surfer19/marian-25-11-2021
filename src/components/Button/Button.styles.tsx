import styled from "styled-components";
import { Theme, theme } from "../../theme/theme.constants";

export type StyledButtonProps = {
  bgColor: string;
  theme?: Theme;
  onClick: () => void;
};

export const StyledButton = styled("button")<StyledButtonProps>`
  background: ${({ theme, bgColor }) =>
    theme.colors[bgColor] ? theme.colors[bgColor] : "white"};
  color: white;
  border: none;
  border-radius: 0.2rem;
  padding: 0.5rem 1rem;
  font-weight: 600;

  &:hover {
    background-color: ${theme.colors.colaRedLight};
    cursor: pointer;
  }
`;
