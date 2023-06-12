import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getCatrFromLS } from "../../components/utils/getCatrFromLS";
import { calcTotalPrice } from "../../components/utils/calcTotalPrice";
import { CartItemType, CartSliceState } from "./types";

const { items, totalPrice } = getCatrFromLS();
const initialState: CartSliceState = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItems(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
      }

      if (findItem && findItem.count <= 0) {
        state.items = state.items.filter((obj) => {
          return obj.id !== action.payload;
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },

    removeItems(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => {
        return obj.id !== action.payload;
      });
      if (state.items.length === 0) {
        state.totalPrice = 0;
      }
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItems, removeItems, clearItems, minusItem } =
  cartSlice.actions;
export default cartSlice.reducer;
