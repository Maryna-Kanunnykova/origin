import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// (пагинация)`https://6407092b862956433e61bf04.mockapi.io/items?page=${currentPage}&limit=4`

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sort, order, categoryParams } = params;
    const response = await axios.get(
      `https://6407092b862956433e61bf04.mockapi.io/items?` +
        categoryParams +
        sort +
        order
    );
    return response.data;
  }
);

const initialState = {
  items: [],
  status: "loading",
};

const PizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const { setItems } = PizzasSlice.actions;
export default PizzasSlice.reducer;
