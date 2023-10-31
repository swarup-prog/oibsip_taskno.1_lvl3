import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import otpReducer from "../features/otpSlice";
import ingredientReducer from "../features/ingredientSlice";
import inventoryReducer from "../features/inventorySlice";

export const store = configureStore({
  reducer: {
    userData: authReducer,
    otp: otpReducer,
    inventory: inventoryReducer,
    selectedIngredient: ingredientReducer,
  },
});
