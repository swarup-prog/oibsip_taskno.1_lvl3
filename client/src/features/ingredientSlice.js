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
      state.isSelected = !state.isSelected;
    },
  },
});

export const { setIngredient } = ingredientSlice.actions;
export default ingredientSlice.reducer;
