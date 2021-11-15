// REDUCERS
import {
  Feed,
  Order,
  // OrderPriceItem,
  OrderPriceType,
  ProductId,
} from "../../../api/types";
import produce from "immer";
import {
  // findMatchedPriceItem,
  processUpdatedOrderPriceList,
} from "./OrderReducer.utils";

// BIDS => [{ size: 5000, price: 63283.0, feed: "book_ui_1", product_id: "PI_XBTUSD" }]
// ASKS => [
//   { size: 5000, price: 63283.0, feed: "book_ui_1", product_id: "PI_XBTUSD" },
//   { size: 5000, price: 63284.0, feed: "book_ui_1", product_id: "PI_XBTUSD" }
// ]

export type ActionOrders = {
  type: string;
  order: Order;
};

export const initialOrders = {
  feed: Feed.Empty,
  product_id: ProductId.Empty,
  bids: [],
  asks: [],
};

export const ordersReducer = (
  state: Order = initialOrders,
  action: ActionOrders
): Order =>
  produce(state, (draft: Order) => {
    switch (action.type) {
      case "updated": {
        /*
         * ASKS
         */
        processUpdatedOrderPriceList({
          orderPriceList: action?.order?.asks,
          draft,
          orderPriceType: OrderPriceType.Asks,
        });

        processUpdatedOrderPriceList({
          orderPriceList: action?.order?.bids,
          draft,
          orderPriceType: OrderPriceType.Bids,
        });

        // action?.order?.asks.map((newAsk: OrderPriceItem) => {
        //   const [foundAsk, foundAskIndex] = findMatchedPriceItem({
        //     draftOrderPrices: draft.asks,
        //     newOrderPriceItem: newAsk,
        //   });
        //   const draftAsks = draft.asks as OrderPriceItem[];
        //   // delete item / do nothing
        //   if (newAsk?.size === 0) {
        //     if (!foundAsk) {
        //       return;
        //     }
        //     draftAsks.splice(foundAskIndex, 1).filter((item) => item);
        //     return;
        //   }
        //   // add new item
        //   if (!foundAsk) {
        //     draftAsks.push(newAsk);
        //     return;
        //   }
        //   // update
        //   draftAsks[foundAskIndex] = {
        //     price: newAsk.price,
        //     size: newAsk.size + draftAsks[foundAskIndex]?.size,
        //     total: 0,
        //   };
        // });

        /*
         * BIDS
         */
        // action.order?.bids?.map((newBid: OrderPriceItem) => {
        //   // search for asks with same price in old array
        //   const [foundBid, foundBidIndex] = findMatchedPriceItem({
        //     draftOrderPrices: draft.bids,
        //     newOrderPriceItem: newBid,
        //   });
        //   const draftBids = draft.bids as OrderPriceItem[];
        //   if (!foundBid) {
        //     draftBids.push(newBid);
        //     return;
        //   }
        //   // join draft ask with new ask
        //   draftBids[foundBidIndex] = {
        //     price: newBid.price,
        //     size: newBid.size + draftBids[foundBidIndex]?.size,
        //   };
        // });
        // break;
        break;
      }

      default:
        break;
    }
  });
