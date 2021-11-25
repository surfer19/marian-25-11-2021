import { transformPriceListToLocalStructure } from "./utils";

export const mockedPriceListAPI = [
  [63278.5, 0.0],
  [63282.0, 22500.0],
  [63283.0, 5000.0],
  [63278.1, 0.0],
];

export const mockedPriceList = [
  { price: 63278.5, size: 0.0 },
  { price: 63282.0, size: 22500.0 },
  { price: 63283.0, size: 5000.0 },
  { price: 63278.1, size: 0.0 },
];

export const nonNullMockedPriceList = [
  { price: 63282.0, size: 22500.0 },
  { price: 63283.0, size: 5000.0 },
];

describe("API Utils method", () => {
  describe("transformOrdersInternally ", () => {
    it("should transorm initial prices correctly", () => {
      expect(
        transformPriceListToLocalStructure(mockedPriceListAPI)
      ).toHaveLength(4);
      expect(transformPriceListToLocalStructure(mockedPriceListAPI)).toEqual([
        {
          price: 63278.5,
          size: 0.0,
        },
        {
          price: 63282.0,
          size: 22500.0,
        },
        {
          price: 63283.0,
          size: 5000.0,
        },
        {
          price: 63278.1,
          size: 0.0,
        },
      ]);
    });
    it("should return empty list in case of unexpected input data", () => {
      expect(transformPriceListToLocalStructure([])).toEqual([]);
      expect(transformPriceListToLocalStructure(null)).toEqual([]);
      expect(transformPriceListToLocalStructure([[1, null]])).toEqual([]);
    });
    it("should inform that input data are wrong", () => {
      console.warn = jest.fn();
      transformPriceListToLocalStructure([[1, undefined]]);
      expect(console.warn).toBeCalled();
    });
  });
});
