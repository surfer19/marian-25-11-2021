import {
  OrderPriceItem,
  OrderPriceType,
} from "../../../api/orderbook/orderbook.types";

export interface FindMatchedPriceItemProps {
  draftOrderPrices: OrderPriceItem[];
  newOrderPriceItem: OrderPriceItem;
}
export type findMatchedPriceItemResponse<T, K> = [T, K];

export const findMatchedPriceItem = ({
  draftOrderPrices,
  newOrderPriceItem,
}: FindMatchedPriceItemProps): findMatchedPriceItemResponse<
  OrderPriceItem | undefined,
  number
> => {
  const foundItem = draftOrderPrices.find(
    (draftItem) => draftItem.price === newOrderPriceItem.price
  );
  const foundIndex = draftOrderPrices.findIndex(
    (draftItem) => draftItem.price === newOrderPriceItem.price
  );
  return [foundItem, foundIndex];
};

export type ProcessUpdatedOrderPriceListProps = {
  orderPriceList: OrderPriceItem[];
  draft: OrderPriceItem[];
  orderPriceType: OrderPriceType;
};

export const processUpdatedOrderPriceList = ({
  orderPriceList,
  draft,
  orderPriceType,
}: any) => {
  if (!draft) return;
  orderPriceList.map((newPriceItem: OrderPriceItem) => {
    const [foundAsk, foundAskIndex] = findMatchedPriceItem({
      draftOrderPrices: draft[orderPriceType],
      newOrderPriceItem: newPriceItem,
    });
    const draftAsks = draft[orderPriceType] as OrderPriceItem[];
    // delete item / do nothing
    if (newPriceItem?.size === 0) {
      if (!foundAsk) {
        return;
      }
      draftAsks.splice(foundAskIndex, 1).filter((item) => item);
      return;
    }
    // add new item
    if (!foundAsk) {
      draftAsks.push({
        ...newPriceItem,
        total: 0,
      });
      return;
    }
    // update
    draftAsks[foundAskIndex] = {
      type: newPriceItem.type,
      price: newPriceItem.price,
      size: newPriceItem.size + draftAsks[foundAskIndex]?.size,
      total: 0,
    };
  });
};
