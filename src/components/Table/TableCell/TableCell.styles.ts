import styled from "styled-components";

export interface StyledTableCellProps {
  flex?: string;
  color?: string;
  center?: string;
  background?: string;
  theme?: any;
}

export const StyledTableCell = styled("div")<StyledTableCellProps>`
  flex: ${({ flex }) => (flex ? flex : "1 1 0%")};
  align-self: center;
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.semiBold};
  color: ${({ theme, color }) => (color ? color : theme.colors.arcticBlue)};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xs};
  text-align: ${({ center }) => (center ? center : "right")};
  background: ${({ background }) => (background ? background : "none")};
  padding-right: 3rem;
  z-index: 1;
`;
