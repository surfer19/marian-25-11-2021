import React from "react";
import { Feed, ProductId } from "./api/types";
import "./App.css";
import { OrderbookContainer } from "./containers/orderbook/Orderbook.container";
import {
  OrdersContext,
  OrdersDispatchContext,
} from "./containers/orderbook/state/OrdersContext";
import { useOrderBookSubscribe } from "./hooks/useOrderbookSubscribe";
import Theme from "./theme/theme.component";

export const App = () => {
  // eslint-disable-next-line no-unused-vars
  const { orderBookState, dispatch, setproductIds } = useOrderBookSubscribe({
    initialProductIds: [ProductId.XBTUSD],
    feed: Feed.Ui1,
  });
  return (
    <div className="App">
      <OrdersContext.Provider value={orderBookState}>
        <OrdersDispatchContext.Provider value={dispatch}>
          <Theme>
            <OrderbookContainer />
          </Theme>
        </OrdersDispatchContext.Provider>
      </OrdersContext.Provider>
    </div>
  );
};
