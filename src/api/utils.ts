import {
  OrderAPI,
  Order,
  OrderPriceItem,
  OrderPriceListAPI,
  OrderPriceType,
} from "./types";
import { isEmpty, isNil } from "ramda";

/*
 * HELPER METHODS
 */
export const isValueInvalid = <T>(value: T) => isEmpty(value) || isNil(value);

export const isPriceItemListValid = <T>(list: T[]) => {
  for (const item of list) {
    if (isValueInvalid(item)) {
      // send log event!
      console.warn("Invalid data structure receieved!");
      return false;
    }
  }
  return true;
};

/*
 * API -> FE structure transformations
 */

export const transformPriceListToLocalStructure = (
  orderPriceList: OrderPriceListAPI,
  type: OrderPriceType
): OrderPriceItem[] => {
  if (isValueInvalid(orderPriceList)) {
    return [];
  }
  return orderPriceList
    .map((orderPriceItems: number[]) => {
      return isPriceItemListValid(orderPriceItems)
        ? {
            price: orderPriceItems[0],
            size: orderPriceItems[1],
            type,
          }
        : undefined;
    })
    .filter((item) => item) as OrderPriceItem[]; // filter out undefined values
};

export const transformOrderToLocalStructure = (order: OrderAPI): Order => ({
  ...order,
  bids: [
    ...transformPriceListToLocalStructure(order.bids, OrderPriceType.Bids),
  ],
  asks: [
    ...transformPriceListToLocalStructure(order.asks, OrderPriceType.Asks),
  ],
});
