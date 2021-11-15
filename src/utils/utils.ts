import { OrderPriceItem, OrderPriceType } from "../api/types";

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
// TODO: unit tests for bid
export const countTotalByLevels = (
  levels: OrderPriceItem[],
  edgeLevel: OrderPriceItem
) => {
  const reducer = (
    previousLevel: OrderPriceItem,
    currentLevel: OrderPriceItem
  ) => {
    const isInRangeByOrderType =
      currentLevel.type === OrderPriceType.Asks
        ? currentLevel.price > edgeLevel.price
        : currentLevel.price < edgeLevel.price;

    if (isInRangeByOrderType) {
      return {
        ...previousLevel,
      };
    } else {
      return {
        ...currentLevel,
        total: previousLevel?.total
          ? previousLevel.total + currentLevel.size
          : currentLevel.size,
      };
    }
  };
  return levels.reduce(reducer, {
    price: 0,
    size: 0,
    total: 0,
    type: OrderPriceType.Asks,
  });
};

export const countTotalLevelRatios = (
  orderPriceList: OrderPriceItem[]
): OrderPriceItem[] => {
  const highestTotalValue = findHighestValueByAttribute(
    orderPriceList,
    "total"
  );
  return orderPriceList.map((priceItem: OrderPriceItem) => ({
    ...priceItem,
    totalLevelRatio: parseFloat(
      ((priceItem.total / highestTotalValue) * 100).toFixed(2)
    ),
  }));
};

export const countAllLevels = (
  orderPriceList: OrderPriceItem[]
): OrderPriceItem[] => {
  return orderPriceList.map((orderPriceItem) => {
    const level = countTotalByLevels(orderPriceList, orderPriceItem);
    return level;
  });
};
