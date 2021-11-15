import React, { useContext } from "react";
import { Orderbook } from "./Orderbook.component";
import { OrdersContext } from "./state/OrdersContext";

export const OrderbookContainer = () => {
  const order = useContext(OrdersContext);
  return <Orderbook order={order} />;
};
