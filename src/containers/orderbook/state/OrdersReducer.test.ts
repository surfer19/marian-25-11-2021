import { Feed, ProductId } from "../../../api/types";
import { ordersReducer } from "./OrdersReducer";

const initialAction = {
  type: "",
  order: {
    feed: Feed.Empty,
    product_id: ProductId.Empty,
    bids: [],
    asks: [],
  },
};

describe("Orders Reducer", () => {
  describe("updated case", () => {
    it("should match initial state", () => {
      const state = undefined;
      const action = initialAction;
      expect(ordersReducer(state, action)).toEqual(
        expect.objectContaining({
          feed: Feed.Empty,
          product_id: ProductId.Empty,
          bids: [],
          asks: [],
        })
      );
    });
    it("should add a asks from new order", () => {
      const state = {
        ...initialAction.order,
        feed: Feed.Ui1,
      };
      const action = {
        type: "updated",
        order: {
          feed: Feed.Ui1,
          bids: [],
          asks: [
            { price: 12000, size: 1000 },
            { price: 12001, size: 1000 },
          ],
        },
      };
      const result = ordersReducer(state, action);
      expect(result.bids).toHaveLength(0);
      expect(result.asks).toHaveLength(2);
      expect(result.asks[0].price).toEqual(12000);
      expect(result.asks[1].price).toEqual(12001);
    });

    it("should add a bids from new order", () => {
      const state = {
        ...initialAction.order,
        feed: Feed.Ui1,
      };
      const action = {
        type: "updated",
        order: {
          feed: Feed.Ui1,
          bids: [
            { price: 12000, size: 1000 },
            { price: 12001, size: 1000 },
          ],
          asks: [],
        },
      };
      const result = ordersReducer(state, action);
      expect(result.asks).toHaveLength(0);
      expect(result.bids).toHaveLength(2);
      expect(result.bids[0].price).toEqual(12000);
      expect(result.bids[1].price).toEqual(12001);
    });

    it("should join two same price asks", () => {
      const state = {
        ...initialAction.order,
        asks: [
          { price: 12001, size: 1000 },
          { price: 12000, size: 1000 },
        ],
        feed: Feed.Ui1,
      };
      const action = {
        type: "updated",
        order: {
          feed: Feed.Ui1,
          asks: [{ price: 12000, size: 1000 }],
          bids: [],
        },
      };
      const result = ordersReducer(state, action);
      expect(result.asks).toHaveLength(2);
      expect(result.asks[0].price).toEqual(12001);
      expect(result.asks[0].size).toEqual(1000);
      expect(result.asks[1].price).toEqual(12000);
      expect(result.asks[1].size).toEqual(2000);
    });

    it("should join two same price bids", () => {
      const state = {
        ...initialAction.order,
        bids: [
          { price: 12001, size: 1000 },
          { price: 12000, size: 1000 },
        ],
        feed: Feed.Ui1,
      };
      const action = {
        type: "updated",
        order: {
          feed: Feed.Ui1,
          asks: [],
          bids: [{ price: 12000, size: 1000 }],
        },
      };
      const result = ordersReducer(state, action);
      expect(result.bids).toHaveLength(2);
      expect(result.bids[0].price).toEqual(12001);
      expect(result.bids[0].size).toEqual(1000);
      expect(result.bids[1].price).toEqual(12000);
      expect(result.bids[1].size).toEqual(2000);
    });

    it("should remove", () => {
      const state = {
        ...initialAction.order,
        asks: [
          { price: 12001, size: 2000 },
          { price: 12000, size: 1000 },
        ],
        feed: Feed.Ui1,
      };
      const action = {
        type: "updated",
        order: {
          feed: Feed.Ui1,
          bids: [],
          asks: [
            { price: 12000, size: 1000 },
            { price: 12001, size: 0 },
          ],
        },
      };
      const result = ordersReducer(state, action);
      expect(result.asks).toHaveLength(1);
    });

    it("should not add item zero sized item", () => {
      const state = {
        ...initialAction.order,
        asks: [],
        feed: Feed.Ui1,
      };
      const action = {
        type: "updated",
        order: {
          feed: Feed.Ui1,
          bids: [],
          asks: [
            { price: 12002, size: 1000 },
            { price: 12001, size: 0 },
            { price: 12003, size: 1000 },
            { price: 12004, size: 1000 },
          ],
        },
      };
      const result = ordersReducer(state, action);
      expect(result.asks).toHaveLength(3);
    });
  });
});
