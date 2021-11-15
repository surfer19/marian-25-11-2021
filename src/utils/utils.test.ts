import { OrderPriceItem, OrderPriceType } from "../api/types";
import {
  countAllLevels,
  countTotalByLevels,
  countTotalLevelRatios,
  findHighestValueByAttribute,
  sortListAscendingByAttribute,
  sortListDescendingByAttribute,
} from "./utils";

type Item = {
  attr: number;
  x: any;
};

const priceTotalData: OrderPriceItem[] = [
  {
    type: OrderPriceType.Asks,
    price: 1000,
    size: 50,
    total: 50,
  },
  {
    type: OrderPriceType.Asks,
    price: 1005,
    size: 100,
    total: 150,
  },
  {
    type: OrderPriceType.Asks,
    price: 1007,
    size: 200,
    total: 350,
  },
  {
    type: OrderPriceType.Asks,
    price: 1010,
    size: 1000,
    total: 1350,
  },
];

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

describe("countAllLevels Asks", () => {
  const list: OrderPriceItem[] = [
    {
      type: OrderPriceType.Asks,
      price: 1000,
      size: 50,
      total: 0,
    },
    {
      type: OrderPriceType.Asks,
      price: 1005,
      size: 100,
      total: 0,
    },
    {
      type: OrderPriceType.Asks,
      price: 1007,
      size: 200,
      total: 0,
    },
    {
      type: OrderPriceType.Asks,
      price: 1010,
      size: 1000,
      total: 0,
    },
  ];
  it("should count correct total from price levels", () => {
    expect(countAllLevels(list)).toEqual(priceTotalData);
  });
});

describe("findHighestValueByAttribute", () => {
  it("should return highest number based on attribute", () => {
    expect(findHighestValueByAttribute(priceTotalData, "total")).toEqual(1350);
  });
});

describe("countTotalLevelRatios", () => {
  it("should count all total %", () => {
    expect(countTotalLevelRatios(priceTotalData)).toEqual([
      {
        type: OrderPriceType.Asks,
        price: 1000,
        size: 50,
        total: 50,
        totalLevelRatio: 3.7,
      },
      {
        type: OrderPriceType.Asks,
        price: 1005,
        size: 100,
        total: 150,
        totalLevelRatio: 11.11,
      },
      {
        type: OrderPriceType.Asks,
        price: 1007,
        size: 200,
        total: 350,
        totalLevelRatio: 25.93,
      },
      {
        type: OrderPriceType.Asks,
        price: 1010,
        size: 1000,
        total: 1350,
        totalLevelRatio: 100,
      },
    ]);
  });
});
