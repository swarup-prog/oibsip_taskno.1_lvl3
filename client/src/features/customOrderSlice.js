import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredients: {},
};

export const customOrderSlice = createSlice({
  name: "customOrder",
  initialState,
  reducers: {
    setIngredient: (state, action) => {
      const { type, ...payload } = action.payload;
      state.ingredients[type] = payload;
    },
    setIngredientNoType: (state, action) => {
      state.ingredients = action.payload;
    },
    clearIngredient: (state) => {
      state.ingredients = {};
    },
  },
});

export const { setIngredient, clearIngredient, setIngredientNoType } =
  customOrderSlice.actions;
export default customOrderSlice.reducer;
