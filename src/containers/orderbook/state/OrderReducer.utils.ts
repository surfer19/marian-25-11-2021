import { OrderPriceItem, OrderPriceType } from "../../../api/types";

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

export const processUpdatedOrderPriceList = (
  { orderPriceList, draft, orderPriceType }: any // TODO: type
) => {
  orderPriceList.map((newAsk: OrderPriceItem) => {
    const [foundAsk, foundAskIndex] = findMatchedPriceItem({
      draftOrderPrices: draft[orderPriceType],
      newOrderPriceItem: newAsk,
    });
    const draftAsks = draft[orderPriceType] as OrderPriceItem[];
    // delete item / do nothing
    if (newAsk?.size === 0) {
      if (!foundAsk) {
        return;
      }
      draftAsks.splice(foundAskIndex, 1).filter((item) => item);
      return;
    }
    // add new item
    if (!foundAsk) {
      draftAsks.push({
        ...newAsk,
        total: 0,
      });
      return;
    }
    // update
    draftAsks[foundAskIndex] = {
      type: newAsk.type,
      price: newAsk.price,
      size: newAsk.size + draftAsks[foundAskIndex]?.size,
      total: 0,
    };
  });
};
