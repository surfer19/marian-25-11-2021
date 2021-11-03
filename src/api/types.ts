/*
 * API structures (before transformations)
 */
export enum Feed {
  Ui1 = "book_ui_1",
}

export enum ProductId {
  xbtusd = "book_ui_1",
}

export type OrderPriceListAPI = number[][];

export type OrderAPI = {
  feed: Feed;
  product_id: ProductId;
  bids: number[][] | [];
  asks: number[][] | [];
};

/*
 * Transformed structures
 */

export type OrderPriceItem = {
  price: number;
  size: number;
};

export type Order = {
  feed: Feed;
  product_id: ProductId;
  bids: OrderPriceItem[] | [];
  asks: OrderPriceItem[] | [];
};
