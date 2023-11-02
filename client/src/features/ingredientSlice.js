import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isSelected: false,
};

export const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
    setIngredient: (state, action) => {
      state.data = action.payload;
      state.isSelected = true;
    },
    clearIngredient: (state) => {
      state.data = {};
      state.isSelected = false;
    },
  },
});

export const { setIngredient, clearIngredient } = ingredientSlice.actions;
export default ingredientSlice.reducer;
