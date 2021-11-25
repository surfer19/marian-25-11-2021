import { Dispatch } from "react";
import { ProductId } from "../../api/types";
import {
  OrderReducerAction,
  OrderBookState,
} from "./state/OrdersReducer.types";

export interface OrderbookProps {
  orderState: OrderBookState;
  setproductIds: (
    ids: ProductId[]
  ) => React.Dispatch<React.SetStateAction<ProductId[]>>;
  dispatch: Dispatch<OrderReducerAction>;
}
