import React from "react";
import { Grid } from "react-flexbox-grid";
import { usePageLeave } from "react-use";
import { ReadyState } from "react-use-websocket";
import { Feed } from "./api/orderbook/orderbook.types";
import "./App.css";
import { FlexContainer, StyledApp, VerticalCenter } from "./App.styles";
import { Snackbar } from "./components/SnackBar/SnackBar.component";
import { OrderbookContainer } from "./containers/orderbook/Orderbook.container";
import {
  OrdersContext,
  OrdersDispatchContext,
} from "./containers/orderbook/state/OrdersContext";
import { useOrderBookSubscribe } from "./api/orderbook/useOrderbookSubscribe";
import { useSnackbar } from "./hooks/useSnackBar";
import { OrderbookSnackContent } from "./containers/orderbook/components/OrderbookSnackContent.component";

export const socketUrl = "wss://www.cryptofacilities.com/ws/v1"; // TODO: move to env variables

export const App = () => {
  const {
    orderBookState,
    dispatch,
    setproductIds,
    connectionStatus,
    unsubscribeOrderbook,
    subscribeOrderbook,
  } = useOrderBookSubscribe({
    feed: Feed.Ui1,
    socketUrl: socketUrl,
  });

  const { isActive, message, openSnackBar, showSnack } = useSnackbar();

  const showSnackbarHandler = () => {
    openSnackBar("Please click to button in order to reconnect Orderbook");
  };

  usePageLeave(
    () => {
      unsubscribeOrderbook([orderBookState.currentPair]); // get current PAIR from store
      showSnackbarHandler();
    },
    [orderBookState] as never
  );

  return (
    <StyledApp>
      <FlexContainer>
        <Snackbar isActive={isActive} message={message}>
          <OrderbookSnackContent
            subscribeOrderbook={subscribeOrderbook}
            showSnack={showSnack}
          />
        </Snackbar>

        <VerticalCenter>
          <OrdersContext.Provider value={orderBookState}>
            <OrdersDispatchContext.Provider value={dispatch}>
              <Grid>
                {orderBookState?.order?.asks.length > 0 &&
                orderBookState?.order?.bids.length > 0 &&
                connectionStatus === ReadyState.OPEN ? (
                  <OrderbookContainer setproductIds={setproductIds} />
                ) : (
                  `Loading graph...`
                )}
              </Grid>
            </OrdersDispatchContext.Provider>
          </OrdersContext.Provider>
        </VerticalCenter>
      </FlexContainer>
    </StyledApp>
  );
};
