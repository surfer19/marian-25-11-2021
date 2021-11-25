import {
  OrderPriceItem,
  OrderPriceType,
} from "../../api/orderbook/orderbook.types";
import {
  CalculateCurrentSpreadProps,
  findHighestValueByAttribute,
  sortListAscendingByAttribute,
  sortListDescendingByAttribute,
} from "../../utils/utils";
import { SortType } from "./state/OrdersReducer.types";

export type PrepareOrderItemsProps = {
  orderPriceItemList: OrderPriceItem[];
  numberOfOrderItemsToShow: number;
  sortType: SortType;
};

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
        ? currentLevel.price < edgeLevel.price
        : currentLevel.price > edgeLevel.price;

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

export const countAllLevels = (
  orderPriceList: OrderPriceItem[]
): OrderPriceItem[] => {
  return orderPriceList.map((orderPriceItem) => {
    const level = countTotalByLevels(orderPriceList, orderPriceItem);
    return level;
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

export const prepareOrderItems = ({
  orderPriceItemList,
  numberOfOrderItemsToShow,
  sortType,
}: PrepareOrderItemsProps) => {
  const orderItem = orderPriceItemList.slice();
  const ordersSorted: OrderPriceItem[] =
    sortType === SortType.Desc
      ? sortListDescendingByAttribute<OrderPriceItem, string>(
          orderItem,
          "price"
        )
      : sortListAscendingByAttribute<OrderPriceItem, string>(
          orderItem,
          "price"
        );

  const levelsCounted = countAllLevels(ordersSorted);
  const totalOrder = countTotalLevelRatios(levelsCounted);
  const ordersSliced = totalOrder.slice(0, numberOfOrderItemsToShow);
  return ordersSliced;
};

export const calculateCurrentSpread = ({
  ask,
  bid,
}: CalculateCurrentSpreadProps) => {
  const spread = parseFloat(Math.abs(bid?.price - ask?.price).toFixed(2));
  const spreadPercentage = Math.abs(
    parseFloat(((spread / bid?.price) * 100).toFixed(2))
  );
  return { spread, spreadPercentage };
};
