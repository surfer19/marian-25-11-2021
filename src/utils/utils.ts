import { OrderPriceItem } from "../api/types";

type IndexedItem = {
  [key: string]: any;
};

export const sortListAscendingByAttribute = <
  T extends IndexedItem,
  K extends keyof IndexedItem
>(
  list: T[],
  attribute: K
): T[] => {
  return list.sort((a: T, b: T) => a[attribute] - b[attribute]);
};

export const sortListDescendingByAttribute = <
  T extends IndexedItem,
  K extends keyof IndexedItem
>(
  list: T[],
  attribute: K
): T[] => {
  return list.sort((a: T, b: T) => b[attribute] - a[attribute]);
};

export const findHighestValueByAttribute = <
  T extends IndexedItem,
  K extends keyof IndexedItem
>(
  list: T[],
  attribute: K
): number => {
  if (list.length < 1) return 0;
  const reducedItem = list.reduce(
    (a, b) => (a[attribute] > b[attribute] ? a : b),
    list[0]
  );
  return reducedItem[attribute];
};

export type CalculateCurrentSpreadProps = {
  ask: OrderPriceItem;
  bid: OrderPriceItem;
};
