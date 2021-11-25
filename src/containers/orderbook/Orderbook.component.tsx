import React, { FunctionComponent, memo, useContext, useState } from "react";
import { Row, Col } from "react-flexbox-grid";
import { ProductId } from "../../api/types";
import styled from "styled-components";
import { OrderbookAsks } from "./components/OrderbookAsks.component";
import { OrderbookBids } from "./components/OrderbookBids.component";
import { OrderbookHeader } from "./components/OrderbookHeader.component";
import { useToggle, useMedia } from "react-use";
import { theme } from "../../theme/theme.constants";
import { OrdersDispatchContext } from "./state/OrdersContext";
import { calculateCurrentSpread, prepareOrderItems } from "./Orderbook.utils";
import { OrderbookProps } from "./Orderbook.types";
import { SortType } from "./state/OrdersReducer.types";
import { OrderBookWrapper } from "./Orderbook.styles";

export const StyledBtn = styled<any>("button")`
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

export const Orderbook: FunctionComponent<OrderbookProps> = memo(
  ({ orderState, setproductIds }: OrderbookProps) => {
    const [isContractSwitched, setIsContractSwitched] = useToggle(false);
    const [selectedPair, setSelectedPair] = useState<ProductId>(
      ProductId.XBTUSD
    );
    const isDesktop = useMedia("(min-width: 768px)");
    const numberOfOrderItemsToShow = isDesktop ? 15 : 7;
    const dispatch = useContext(OrdersDispatchContext);
    // ASKS
    const preparedAsks = prepareOrderItems({
      orderPriceItemList: orderState?.order?.asks,
      numberOfOrderItemsToShow,
      sortType: SortType.Desc,
    });
    // BIDS
    const preparedBids = prepareOrderItems({
      orderPriceItemList: orderState?.order?.bids,
      numberOfOrderItemsToShow,
      sortType: SortType.Asc,
    });

    const bidLength = preparedBids?.length;
    const askLength = preparedAsks?.length;
    const { spread, spreadPercentage } = calculateCurrentSpread({
      ask: preparedAsks?.[askLength - 1],
      bid: preparedBids?.[bidLength - 1],
    });

    const onContactSwitchButtonClick = () => {
      setIsContractSwitched();

      if (isContractSwitched) {
        setproductIds([ProductId.XBTUSD]);
        setSelectedPair(ProductId.XBTUSD);
        dispatch({
          type: "updated-pair",
          pair: ProductId.XBTUSD,
        });
      } else {
        setproductIds([ProductId.ETHUSD]);
        setSelectedPair(ProductId.ETHUSD);
        dispatch({
          type: "updated-pair",
          pair: ProductId.ETHUSD,
        });
      }
    };

    return (
      <>
        <OrderBookWrapper>
          <OrderbookHeader
            spread={spread}
            spreadPercentage={spreadPercentage}
            selectedPair={selectedPair}
          />
          <Row>
            <Col xs={12} md={6} last={"xs"} first="md">
              <OrderbookAsks asks={preparedAsks} />
            </Col>

            <Col xs={12} md={6} first={"xs"} last="md">
              <OrderbookBids bids={preparedBids} />
            </Col>
          </Row>
          <StyledBtn bgColor="violent" onClick={onContactSwitchButtonClick}>
            Toggle Feed
          </StyledBtn>
        </OrderBookWrapper>
      </>
    );
  }
);

Orderbook.displayName = "Orderbook";
