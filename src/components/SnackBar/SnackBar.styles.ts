import styled, { css } from "styled-components";

export const fadeIn = css`
  visibility: visible;
  opacity: 1;
  transition: visibility 0s linear 0s, opacity 300ms;
`;

export const fadeOut = css`
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s linear 300ms, opacity 300ms;
`;

export type StyledSnackBarProps = {
  isActive: boolean;
};
export const StyledSnackBar = styled("div")<StyledSnackBarProps>`
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 9;

  bottom: 30px;
  font-size: 1rem;
  left: 0;
  right: 0;
  margin: auto;
  max-width: 300px;
  p {
    display: block;
  }

  ${({ isActive }) => (isActive ? fadeIn : fadeOut)}
`;
