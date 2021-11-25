/* eslint-disable no-unused-vars */
import { Dispatch, Reducer, useEffect, useReducer, useState } from "react";
import { useThrottle } from "react-use";
import { ReadyState } from "react-use-websocket";
import {
  ordersReducer,
  initialOrders,
} from "../../containers/orderbook/state/OrdersReducer";
import {
  OrderBookState,
  OrderReducerAction,
} from "../../containers/orderbook/state/OrdersReducer.types";
import { useWrappedWebsocket } from "../common/useWrappedWebsocket";
import { ProductId } from "./orderbook.types";
import {
  UseOrderBookSubscribeProps,
  UseOrderBookSubscribeResponse,
} from "./useOrderbookSubscribe.types";
import { transformOrderToLocalStructure } from "./utils";

export const useOrderBookSubscribe = ({
  feed,
  socketUrl,
}: UseOrderBookSubscribeProps): UseOrderBookSubscribeResponse => {
  const [productIds, setproductIds] = useState([ProductId.XBTUSD]);

  const [currentProductIds, setcurrentProductIds] = useState([
    ProductId.XBTUSD,
  ]);

  // orderbook consumes specific reducer
  const [orderBookState, dispatch]: [
    OrderBookState,
    Dispatch<OrderReducerAction>
  ] = useReducer<Reducer<OrderBookState, OrderReducerAction>>(
    ordersReducer,
    initialOrders
  );

  const orderStateThrottled = useThrottle(orderBookState, 1000);
  // create webscocket connection
  const { subscribe, unsubscribe, lastMessage, connectionStatus } =
    useWrappedWebsocket(socketUrl);

  const recievedData = lastMessage && JSON.parse(lastMessage.data);
  // handle errors comming from API
  if (
    recievedData?.event === "alert" &&
    recievedData.message !== "Not subscribed to feed"
  ) {
    console.warn("Something went wrong with message call: ", lastMessage);
  }

  const unsubscribeOrderbook = <T>(value?: T) => {
    unsubscribe({
      feed,
      product_ids: value ? value : currentProductIds,
    });
  };

  const subscribeOrderbook = () => {
    subscribe({
      feed,
      product_ids: productIds,
    });
  };

  useEffect(() => {
    setcurrentProductIds(productIds);
    unsubscribeOrderbook();
    setTimeout(() => {
      dispatch({
        type: "clear",
      });
      subscribeOrderbook();
    }, 1000);
  }, [productIds]);

  useEffect(() => {
    if (lastMessage !== null) {
      const transformedData = transformOrderToLocalStructure(
        JSON.parse(lastMessage.data)
      );
      dispatch({
        type: "updated",
        order: transformedData,
      });
    }
  }, [lastMessage, dispatch]);

  return {
    orderBookState: orderStateThrottled,
    dispatch,
    setproductIds,
    connectionStatus,
    unsubscribeOrderbook,
    subscribeOrderbook,
  };
};
