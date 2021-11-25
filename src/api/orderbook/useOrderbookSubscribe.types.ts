import { ReadyState } from "react-use-websocket";
import { Dispatch } from "react";
import {
  OrderBookState,
  OrderReducerAction,
} from "../../containers/orderbook/state/OrderbookReducer.types";
import { Feed, ProductId } from "./orderbook.types";

export type UseOrderBookSubscribeProps = {
  feed: Feed;
  socketUrl: string;
};

export type UseOrderBookSubscribeResponse = {
  orderBookState: OrderBookState;
  dispatch: Dispatch<OrderReducerAction>;
  setproductIds: (productIds: ProductId[]) => void;
  connectionStatus: ReadyState;
  unsubscribeOrderbook: <T>(value: T) => void;
  subscribeOrderbook: () => void;
};
