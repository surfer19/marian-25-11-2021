import React from "react";
import { Grid } from "react-flexbox-grid";
import { usePageLeave } from "react-use";
import styled from "styled-components";
import { Feed } from "./api/types";
import "./App.css";
import { Snackbar } from "./components/SnackBar/SnackBar.component";
import { StyledBtn } from "./containers/orderbook/Orderbook.component";
import { OrderbookContainer } from "./containers/orderbook/Orderbook.container";
import {
  OrdersContext,
  OrdersDispatchContext,
} from "./containers/orderbook/state/OrdersContext";
import { useOrderBookSubscribe } from "./hooks/useOrderbookSubscribe";
import { useSnackbar } from "./hooks/useSnackBar";

export const VerticalCenter = styled("div")`
  width: 100%;
`;

export const StyledApp = styled("div")`
  height: 100vh;
  background: #0d1423;
  color: white;
  padding: 1rem 0;
`;

export const FlexContainer = styled("div")`
  display: flex;
  align-items: center;
  text-align: center;
`;

export const SnackOrderbookContent = ({
  subscribeOrderbook,
  showSnack,
}: any) => (
  <>
    <StyledBtn
      bgColor="violent"
      onClick={() => {
        subscribeOrderbook();
        showSnack(false);
      }}
    >
      Reconnect
    </StyledBtn>
  </>
);

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
    [orderBookState] as any
  );

  return (
    <StyledApp>
      <FlexContainer>
        <Snackbar isActive={isActive} message={message}>
          <SnackOrderbookContent
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
                connectionStatus === "Open" ? (
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
