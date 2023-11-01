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
  },
});

export const { setIngredient } = customOrderSlice.actions;
export default customOrderSlice.reducer;
