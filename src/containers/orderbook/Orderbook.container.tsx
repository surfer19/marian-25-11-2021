/* eslint-disable no-unused-vars */
import React, { useContext, FunctionComponent } from "react";
import { ProductId } from "../../api/orderbook/orderbook.types";
import { Orderbook } from "./Orderbook.component";
import { OrdersContext } from "./state/OrderbookContext";
import { OrderBookState } from "./state/OrderbookReducer.types";

export type OrderbookContainerProps = {
  setproductIds: (productIds: ProductId[]) => void;
};

export const OrderbookContainer: FunctionComponent<OrderbookContainerProps> = (
  props
) => {
  const orderState = useContext(OrdersContext);
  return <Orderbook orderState={orderState} {...props} />;
};
