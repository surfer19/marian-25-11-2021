import { OrderAPI, Order, OrderPriceItem, OrderPriceListAPI } from "./types";
import { isEmpty, isNil } from "ramda";

/*
 * API -> FE structure transformations
 */

export const transformOrderToLocalStructure = (order: OrderAPI): Order => ({
  ...order,
  bids: [...transformPriceListToLocalStructure(order.bids)],
  asks: [...transformPriceListToLocalStructure(order.asks)],
});

export const transformPriceListToLocalStructure = (
  orderPriceList: OrderPriceListAPI
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
          }
        : undefined;
    })
    .filter((item) => item) as OrderPriceItem[]; // filter out undefined values
};

// TODO: possibly remove
export const filterOutZeroSizeOrders = (
  orderPriceList: OrderPriceItem[]
): OrderPriceItem[] =>
  orderPriceList.filter((priceItem: OrderPriceItem) => priceItem?.size > 0);

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
