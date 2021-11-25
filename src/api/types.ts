/* eslint-disable no-unused-vars */

/*
 * API structures (before transformations)
 */
export enum Feed {
  Ui1 = "book_ui_1",
  Snapshot = "book_ui_1_snapshot",
  Empty = "",
}

export enum OrderPriceType {
  Bids = "bids",
  Asks = "asks",
}

export enum ProductId {
  XBTUSD = "PI_XBTUSD",
  ETHUSD = "PI_ETHUSD",
  Empty = "",
}

export type OrderPriceListAPI = number[][];

export type OrderAPI = {
  feed: Feed;
  numLevels?: number;
  product_id?: ProductId;
  bids: number[][] | [];
  asks: number[][] | [];
};

/*
 * Transformed structures
 */

export type OrderPriceItem = OrderPriceItemAdditions & {
  type: OrderPriceType;
  price: number;
  size: number;
};

export type OrderPriceItemAdditions = {
  total: number;
  totalLevelRatio?: number;
};

export type Order = {
  feed: Feed;
  product_id?: ProductId;
  numLevels?: number;
  bids: OrderPriceItem[] | [];
  asks: OrderPriceItem[] | [];
};
