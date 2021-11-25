/* eslint-disable no-unused-vars */
import { Order, ProductId } from "../../../api/types";

export type ActionOrders = {
  type: string;
  order: Order;
};

export type ActionPair = {
  type: string;
  pair: ProductId;
};
export type ActionClear = {
  type: string;
};

export type OrderBookState = {
  currentPair: ProductId;
  order: Order;
};

export type OrderReducerAction = ActionOrders & ActionPair & ActionClear;

export enum SortType {
  Asc = "Ascending",
  Desc = "Descending",
}
