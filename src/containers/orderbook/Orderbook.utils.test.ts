import { OrderPriceItem, OrderPriceType } from "../../api/orderbook/orderbook.types";
import { findHighestValueByAttribute } from "../../utils/utils";
import {
  countAllLevels,
  countTotalLevelRatios,
  calculateCurrentSpread,
} from "./Orderbook.utils";

const priceTotalData: OrderPriceItem[] = [
  {
    type: OrderPriceType.Asks,
    price: 1010,
    size: 1000,
    total: 1000,
  },
  {
    type: OrderPriceType.Asks,
    price: 1007,
    size: 200,
    total: 1200,
  },
  {
    type: OrderPriceType.Asks,
    price: 1005,
    size: 100,
    total: 1300,
  },
  {
    type: OrderPriceType.Asks,
    price: 1000,
    size: 50,
    total: 1350,
  },
];
const countAllLevelsResult: OrderPriceItem[] = [
  {
    type: OrderPriceType.Asks,
    price: 1010,
    size: 1000,
    total: 1000,
  },
  {
    type: OrderPriceType.Asks,
    price: 1007,
    size: 200,
    total: 1200,
  },
  {
    type: OrderPriceType.Asks,
    price: 1005,
    size: 100,
    total: 1300,
  },
  {
    type: OrderPriceType.Asks,
    price: 1000,
    size: 50,
    total: 1350,
  },
];
describe("countAllLevels Asks", () => {
  const list: OrderPriceItem[] = [
    {
      type: OrderPriceType.Asks,
      price: 1010,
      size: 1000,
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
      price: 1005,
      size: 100,
      total: 0,
    },
    {
      type: OrderPriceType.Asks,
      price: 1000,
      size: 50,
      total: 0,
    },
  ];
  it("should count correct total from price levels", () => {
    expect(countAllLevels(list)).toEqual(countAllLevelsResult);
  });
});

describe("findHighestValueByAttribute", () => {
  it("should return highest number based on attribute", () => {
    expect(findHighestValueByAttribute(priceTotalData, "total")).toEqual(1350);
  });
});

describe("countTotalLevelRatios", () => {
  it("should count all total % ASKS", () => {
    expect(countTotalLevelRatios(priceTotalData)).toEqual([
      {
        type: OrderPriceType.Asks,
        price: 1010,
        size: 1000,
        total: 1000,
        totalLevelRatio: 74.07,
      },
      {
        type: OrderPriceType.Asks,
        price: 1007,
        size: 200,
        total: 1200,
        totalLevelRatio: 88.89,
      },
      {
        type: OrderPriceType.Asks,
        price: 1005,
        size: 100,
        total: 1300,
        totalLevelRatio: 96.3,
      },
      {
        type: OrderPriceType.Asks,
        price: 1000,
        size: 50,
        total: 1350,
        totalLevelRatio: 100,
      },
    ]);
  });
});

describe("calculateCurrentSpread", () => {
  it("should return correct spread with percentage", () => {
    expect(
      calculateCurrentSpread({
        ask: {
          type: OrderPriceType.Asks,
          price: 1010,
          size: 1000,
          total: 1350,
          totalLevelRatio: 100,
        },
        bid: {
          type: OrderPriceType.Bids,
          price: 1100,
          size: 1000,
          total: 1350,
          totalLevelRatio: 100,
        },
      })
    ).toEqual({
      spread: 90,
      spreadPercentage: 8.18,
    });
  });
});
