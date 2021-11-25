/* eslint-disable react/prop-types */
import React from "react";
import { FunctionComponent, memo } from "react";
import { ThemeConsumer } from "styled-components";
import {
  OrderPriceItem,
  OrderPriceType,
} from "../../../api/orderbook/orderbook.types";
import { TableCell } from "../../../components/Table/TableCell/TableCell.component";
import { StyledTableCell } from "../../../components/Table/TableCell/TableCell.styles";
import { TableRow } from "../../../components/Table/TableRow/TableRow.component";
import {
  StyledChartIndicator,
  StyledChartIndicatorContainer,
  StyledTable,
} from "../Orderbook.styles";

export type OrderbookAsksProps = {
  asks: OrderPriceItem[];
};

export const OrderbookAsks: FunctionComponent<OrderbookAsksProps> = memo(
  ({ asks }: OrderbookAsksProps) => {
    return (
      <ThemeConsumer>
        {({ colors }) => (
          <StyledTable>
            <TableRow direction="row-reverse">
              <StyledTableCell color={colors.standardBlue}>
                TOTAL
              </StyledTableCell>
              <StyledTableCell color={colors.standardBlue}>
                SIZE
              </StyledTableCell>
              <StyledTableCell color={colors.standardBlue}>
                PRICE
              </StyledTableCell>
            </TableRow>
            {asks?.map((ask: OrderPriceItem) => {
              return (
                <TableRow
                  key={`${OrderPriceType.Asks}_${ask.price}`}
                  direction="row-reverse"
                >
                  <TableCell>
                    <span>{ask?.total}</span>
                  </TableCell>
                  <TableCell>{ask?.size}</TableCell>
                  <TableCell color={colors.hulkGreenLight}>
                    {ask?.price?.toFixed(2)}
                  </TableCell>
                  <StyledChartIndicatorContainer>
                    <StyledChartIndicator
                      key={ask.price}
                      width={ask.totalLevelRatio}
                    />
                  </StyledChartIndicatorContainer>
                </TableRow>
              );
            })}
          </StyledTable>
        )}
      </ThemeConsumer>
    );
  }
);

OrderbookAsks.displayName = "OrderbookAsks";
