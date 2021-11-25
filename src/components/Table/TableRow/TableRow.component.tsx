import React, { FunctionComponent } from "react";
import { StyledTableRow, StyledTableRowProps } from "./TableRow.styles";

export type TableRowProps = {
  children: React.ReactNode | React.ReactNode[];
} & StyledTableRowProps;

export const TableRow: FunctionComponent<TableRowProps> = ({
  children,
  ...rest
}: TableRowProps) => <StyledTableRow {...rest}>{children}</StyledTableRow>;
