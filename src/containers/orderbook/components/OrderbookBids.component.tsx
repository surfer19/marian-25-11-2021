import React from "react";
import { FunctionComponent, memo } from "react";
import {
  OrderPriceItem,
  OrderPriceType,
} from "../../../api/orderbook/orderbook.types";
import { ThemeConsumer } from "styled-components";
import { TableRow } from "../../../components/Table/TableRow/TableRow.component";
import { TableCell } from "../../../components/Table/TableCell/TableCell.component";
import {
  StyledChartIndicator,
  StyledChartIndicatorContainer,
  StyledTable,
} from "../Orderbook.styles";

export type OrderbookBidsProps = {
  bids: OrderPriceItem[];
};

export const OrderbookBids: FunctionComponent<OrderbookBidsProps> = memo(
  ({ bids }: OrderbookBidsProps) => {
    return (
      <ThemeConsumer>
        {({ colors }) => (
          <StyledTable>
            <TableRow>
              <TableCell color={colors.standardBlue}>PRICE</TableCell>
              <TableCell color={colors.standardBlue}>SIZE</TableCell>
              <TableCell color={colors.standardBlue}>TOTAL</TableCell>
            </TableRow>
            {bids?.map((bid: OrderPriceItem) => {
              return (
                <TableRow key={`${OrderPriceType.Bids}_${bid?.price}`}>
                  <TableCell color={colors.colaRedLight}>
                    {bid?.price?.toFixed(2)}
                  </TableCell>
                  <TableCell>{bid?.size}</TableCell>
                  <TableCell>
                    <span>{bid?.total}</span>
                  </TableCell>

                  <StyledChartIndicatorContainer align={"flex-start"}>
                    <StyledChartIndicator
                      key={bid?.price}
                      width={bid?.totalLevelRatio}
                      bgColor={colors.colaRedStandard}
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

OrderbookBids.displayName = "OrderbookBids";
