import { ProductId } from "../../api/orderbook/orderbook.types";
import { OrderBookState } from "./state/OrdersReducer.types";

export interface OrderbookProps {
  orderState: OrderBookState;
  setproductIds: (prop: ProductId[]) => void;
}
