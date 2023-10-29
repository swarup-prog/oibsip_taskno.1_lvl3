import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  OTP: "",
};

export const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    setOTP: (state, action) => {
      state.OTP = action.payload;
    },
  },
});

export const { setOTP } = otpSlice.actions;
export default otpSlice.reducer;
