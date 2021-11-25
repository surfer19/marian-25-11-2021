import styled from "styled-components";

export type StyledTableRowProps = { direction?: string };

export const StyledTableRow = styled("div")`
  margin: 0px;
  min-width: 0px;
  display: flex;
  position: relative;
  width: 100%;
  height: 32px;
  align-items: right;
  @media (max-width: 768px) {
    flex-direction: ${({ direction }: StyledTableRowProps) =>
      direction ? direction : "row"};
  }
`;
