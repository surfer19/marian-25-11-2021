import React, { FunctionComponent, memo, useContext, useState } from "react";
import { Row, Col } from "react-flexbox-grid";
import { OrderPriceItem, ProductId } from "../../api/orderbook/orderbook.types";
import { OrderbookAsks } from "./components/OrderbookAsks.component";
import { OrderbookBids } from "./components/OrderbookBids.component";
import { OrderbookHeader } from "./components/OrderbookHeader.component";
import { useToggle, useMedia } from "react-use";
import { OrdersDispatchContext } from "./state/OrdersContext";
import { calculateCurrentSpread, prepareOrderItems } from "./Orderbook.utils";
import { OrderbookProps } from "./Orderbook.types";
import { SortType } from "./state/OrdersReducer.types";
import { OrderBookWrapper } from "./Orderbook.styles";
import { Button } from "../../components/Button/Button.component";

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
    const preparedAsks: OrderPriceItem[] = prepareOrderItems({
      orderPriceItemList: orderState?.order?.asks,
      numberOfOrderItemsToShow,
      sortType: SortType.Desc,
    });
    // BIDS
    const preparedBids: OrderPriceItem[] = prepareOrderItems({
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
          <Button bgColor="violent" onClick={onContactSwitchButtonClick}>
            Toggle Feed
          </Button>
        </OrderBookWrapper>
      </>
    );
  }
);

Orderbook.displayName = "Orderbook";
