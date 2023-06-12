import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PizzaType, SearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: SearchPizzaParams) => {
    const { sort, order, categoryParams } = params;
    const response = await axios.get<PizzaType[]>(
      `https://6407092b862956433e61bf04.mockapi.io/items?` +
        categoryParams +
        sort +
        order
    );
    return response.data as PizzaType[];
  }
);
