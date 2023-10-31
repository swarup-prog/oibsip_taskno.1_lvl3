import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const fetchIngredients = createAsyncThunk(
  "inventory/fetchIngredients",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/inventory/getAllIngredients`
    );
    return response.data;
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default inventorySlice.reducer;
