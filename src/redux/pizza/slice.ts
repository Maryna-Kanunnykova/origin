import { createSlice } from "@reduxjs/toolkit";
import { PizzaSliceState, Status } from "./types";
import { fetchPizzas } from "./asyncAction";

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const PizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = PizzasSlice.actions;
export default PizzasSlice.reducer;
