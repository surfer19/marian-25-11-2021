import { useEffect, useReducer, useState } from "react";
import { useThrottle } from "react-use";
import { Feed, ProductId } from "../api/types";
import { transformOrderToLocalStructure } from "../api/utils";
import {
  ordersReducer,
  initialOrders,
} from "../containers/orderbook/state/OrdersReducer";
import { useSubscribe } from "./useSubscribe";

export const socketUrl = "wss://www.cryptofacilities.com/ws/v1"; // TODO: move to env variables

export interface UseOrderBookSubscribeProps {
  initialProductIds: Array<ProductId>;
  feed: Feed;
}

export const useOrderBookSubscribe = ({
  initialProductIds,
  feed,
}: UseOrderBookSubscribeProps) => {
  const [productIds, setproductIds] = useState(initialProductIds);

  // orderbook consumes specific reducer
  const [orderBookState, dispatch]: any = useReducer<any>(
    ordersReducer,
    initialOrders
  );

  const orderStateThrottled = useThrottle(orderBookState, 1000);

  // eslint-disable-next-line no-unused-vars
  const { subscribe, unsubscribe, lastMessage } = useSubscribe();
  const recievedData = lastMessage && JSON.parse(lastMessage.data);
  // handle errors comming from API
  if (recievedData?.event === "alert") {
    console.warn("Something went wrong with message call: ", lastMessage);
  }

  useEffect(() => {
    const inputMessageData = {
      feed,
      product_ids: productIds,
    };
    subscribe(inputMessageData);
  }, []);

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

  return { orderBookState: orderStateThrottled, dispatch, setproductIds };
};

//   sendMessage(
//     '{"event":"unsubscribe","feed":"book_ui_1","product_ids":["PI_XBTUSD"]}'
//   );
//data.event !== "unsubscribed" &&
// if (data.feed === "book_ui_1_snapshot") {xrx
