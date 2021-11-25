import { createContext, Dispatch } from "react";
import { OrderBookState, OrderReducerAction } from "./OrdersReducer.types";

export const OrdersContext = createContext({} as OrderBookState);
export const OrdersDispatchContext = createContext(
  {} as Dispatch<OrderReducerAction>
);
