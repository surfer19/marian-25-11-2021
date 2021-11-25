import React, { useContext, FunctionComponent } from "react";
import { Orderbook } from "./Orderbook.component";
import { OrdersContext } from "./state/OrdersContext";

export const OrderbookContainer: FunctionComponent<any> = (props: any) => {
  const orderState = useContext(OrdersContext);
  return <Orderbook orderState={orderState} {...props} />;
};
