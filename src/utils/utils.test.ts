import { OrderPriceItem, OrderPriceType } from "../api/orderbook/orderbook.types";
import {
  sortListAscendingByAttribute,
  sortListDescendingByAttribute,
} from "./utils";

type Item = {
  attr: number;
  x: string;
};

describe("sortAscendingByAttribute", () => {
  const list: Item[] = [
    { attr: 3, x: "a" },
    { attr: 2.5, x: "b" },
    { attr: 99, x: "c" },
    { attr: 1, x: "d" },
  ];
  it("should sort list ascending correctly", () => {
    const attr = "attr";
    expect(sortListAscendingByAttribute<Item, string>(list, attr)).toEqual([
      { attr: 1, x: "d" },
      { attr: 2.5, x: "b" },
      { attr: 3, x: "a" },
      { attr: 99, x: "c" },
    ]);
  });

  it("should sort list descending correctly", () => {
    const attr = "attr";
    expect(sortListDescendingByAttribute<Item, string>(list, attr)).toEqual([
      { attr: 99, x: "c" },
      { attr: 3, x: "a" },
      { attr: 2.5, x: "b" },
      { attr: 1, x: "d" },
    ]);
  });
});
