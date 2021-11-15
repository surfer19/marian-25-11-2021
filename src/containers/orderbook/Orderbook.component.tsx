import React, { FunctionComponent, memo } from "react";
import { Order, OrderPriceItem, OrderPriceType } from "../../api/types";
import {
  countAllLevels,
  countTotalLevelRatios,
  sortListAscendingByAttribute,
  sortListDescendingByAttribute,
} from "../../utils/utils";
import styled, { ThemeConsumer } from "styled-components";

export interface OrderbookProps {
  order: Order;
}

export const StyledTable = styled("div")``;

export const StyledTableRow = styled("div")`
  margin: 0px;
  min-width: 0px;
  display: flex;
  position: relative;
  width: 100%;
  height: 32px;
  align-items: right;
`;

export const StyledTableCell = styled<any>("div")`
  /* display: flex; */
  /* align-items: flex-end; */
  flex: ${({ flex }) => (flex ? flex : "1 1 0%")};
  align-self: center;
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.semiBold};
  color: ${({ theme: { colors: defaultColors }, color }) =>
    color ? color : defaultColors.arcticBlue};
  font-size: ${({ theme: { fontSizes } }) => fontSizes.xs};
  text-align: ${({ center }) => (center ? center : "right")};
  background: ${({ background }) => (background ? background : "none")};
  padding-right: 3em;
  /* ne */
  z-index: 1;
`;
export const StyledTableHeaderCell = styled(StyledTableCell)`
  color: ${({ theme: { colors: defaultColors }, color }) =>
    color ? color : defaultColors.standardBlue};
`;

export const GridContainer = styled("div")`
  display: flex;
`;

export const GridCol = styled("div")`
  flex: 1 1 0%;
`;

/*
 * CUSTOM
 */
export const OrderBookWrapper = styled("div")`
  background: ${({ theme: { colors } }) => colors.darkBlue};
`;

export const StyledChartIndicatorContainer = styled<any>("div")`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: ${({ align }) => (align ? align : "flex-end")};
`;

export const StyledChartIndicator = styled<any>("div")`
  background: ${({ theme: { colors: defaultColors }, bgColor }) =>
    bgColor ? bgColor : defaultColors.hulkGreenStandard};
  height: 100%;
  width: ${({ width }) => (width ? width + "%" : "0%")};
  border-radius: inherit;
  align-items: right;
`;

export const Orderbook: FunctionComponent<OrderbookProps> = memo(
  ({ order }: OrderbookProps) => {
    const orderItemsToShow = 15;
    /*
     * ASKS
     */
    const asks = order?.asks.slice();
    // ascending
    const ordersReorderedAsks: OrderPriceItem[] = sortListAscendingByAttribute<
      OrderPriceItem,
      string
    >(asks, "price");

    const levelsCountedAsks = countAllLevels(ordersReorderedAsks);
    const finalOrderAsks = countTotalLevelRatios(levelsCountedAsks);
    const ordersSlicedAsks = finalOrderAsks.slice(0, orderItemsToShow);
    /*
     * BIDS TODO: abstract code
     */
    const bids = order?.bids.slice();
    // ascending
    const ordersReorderedBids: OrderPriceItem[] = sortListDescendingByAttribute<
      OrderPriceItem,
      string
    >(bids, "price");
    const levelsCountedBids = countAllLevels(ordersReorderedBids);
    const finalOrderBids = countTotalLevelRatios(levelsCountedBids);
    const ordersSlicedBids = finalOrderBids.slice(0, orderItemsToShow);
    return (
      <ThemeConsumer>
        {(theme) => (
          <>
            <OrderBookWrapper>
              <StyledTableRow>
                <StyledTableHeaderCell
                  center="left"
                  flex="0.3"
                  color={theme.colors.arcticBlue}
                >
                  Order Book - PI_XBTUSD
                </StyledTableHeaderCell>
                <StyledTableHeaderCell center="center" flex="0.7">
                  Spread 17.0 (0.05%)
                </StyledTableHeaderCell>
              </StyledTableRow>
              <GridContainer>
                <GridCol>
                  <StyledTable>
                    <StyledTableRow>
                      <StyledTableHeaderCell>TOTAL</StyledTableHeaderCell>
                      <StyledTableHeaderCell>SIZE</StyledTableHeaderCell>
                      <StyledTableHeaderCell>PRICE</StyledTableHeaderCell>
                    </StyledTableRow>
                    {ordersSlicedAsks?.map((ask: any) => {
                      return (
                        <StyledTableRow
                          key={`${OrderPriceType.Asks}_${ask.price}`}
                        >
                          <StyledTableCell>
                            <span>{ask?.total}</span>
                          </StyledTableCell>
                          <StyledTableCell>{ask?.size}</StyledTableCell>
                          <StyledTableCell color={theme.colors.hulkGreenLight}>
                            {ask?.price?.toFixed(2)}
                          </StyledTableCell>
                          <StyledChartIndicatorContainer>
                            <StyledChartIndicator
                              width={ask?.totalLevelRatio}
                            />
                          </StyledChartIndicatorContainer>
                        </StyledTableRow>
                      );
                    })}
                  </StyledTable>
                </GridCol>
                {/*
              // BIDS
              //  
              */}
                <GridCol>
                  <StyledTable>
                    <StyledTableRow>
                      <StyledTableHeaderCell>TOTAL</StyledTableHeaderCell>
                      <StyledTableHeaderCell>SIZE</StyledTableHeaderCell>
                      <StyledTableHeaderCell>PRICE</StyledTableHeaderCell>
                    </StyledTableRow>
                    {ordersSlicedBids?.map((bid: any) => {
                      return (
                        <StyledTableRow
                          key={`${OrderPriceType.Bids}_${bid?.price}`}
                        >
                          <StyledTableCell>
                            <span>{bid?.total}</span>
                          </StyledTableCell>
                          <StyledTableCell>{bid?.size}</StyledTableCell>
                          <StyledTableCell color={theme.colors.colaRedLight}>
                            {bid?.price?.toFixed(2)}
                          </StyledTableCell>
                          <StyledChartIndicatorContainer align={"flex-start"}>
                            <StyledChartIndicator
                              width={bid?.totalLevelRatio}
                              bgColor={theme.colors.colaRedStandard}
                            />
                          </StyledChartIndicatorContainer>
                        </StyledTableRow>
                      );
                    })}
                  </StyledTable>
                </GridCol>
              </GridContainer>
            </OrderBookWrapper>
          </>
        )}
      </ThemeConsumer>
    );
  }
);

Orderbook.displayName = "Orderbook";
