import React, { FunctionComponent } from "react";
import { StyledTableCell, StyledTableCellProps } from "./TableCell.styles";

export type TableRowProps = {
  children: React.ReactNode | React.ReactNode[];
} & StyledTableCellProps;

export const TableCell: FunctionComponent<TableRowProps> = ({
  children,
  ...rest
}: TableRowProps) => <StyledTableCell {...rest}>{children}</StyledTableCell>;
