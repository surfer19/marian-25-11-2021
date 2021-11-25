import {
  Feed,
  OrderPriceType,
  ProductId,
} from "../../../api/orderbook/orderbook.types";
import produce from "immer";
import { processUpdatedOrderPriceList } from "./OrderbookReducer.utils";
import { OrderBookState, OrderReducerAction } from "./OrdersReducer.types";

export const initialOrders = {
  currentPair: ProductId.XBTUSD,
  order: {
    feed: Feed.Empty,
    product_id: ProductId.Empty,
    bids: [],
    asks: [],
  },
};

export const ordersReducer = (
  state: OrderBookState = initialOrders,
  action: OrderReducerAction
): OrderBookState =>
  produce(state, (draft: OrderBookState) => {
    switch (action.type) {
      case "updated": {
        /*
         * ASKS
         */
        processUpdatedOrderPriceList({
          orderPriceList: action?.order?.asks,
          draft: draft?.order,
          orderPriceType: OrderPriceType.Asks,
        });
        /*
         * BIDS
         */
        processUpdatedOrderPriceList({
          orderPriceList: action?.order?.bids,
          draft: draft?.order,
          orderPriceType: OrderPriceType.Bids,
        });
        break;
      }

      case "updated-pair": {
        if (draft) {
          draft.currentPair = action.pair;
        }
        break;
      }
      // needed while changing trading pair
      case "clear": {
        draft.order[OrderPriceType.Bids] = [];
        draft.order[OrderPriceType.Asks] = [];
        break;
      }

      default:
        break;
    }
  });
