import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: [],
  isLoggedIn: false,
  error: null,
};

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (id) => {
    const response = await axios.get(
      `http://localhost:8000/api/user/getUserInfo/${id}`
    );
    return response.data;
  }
);

const CLEAR_USER_DATA = "auth/clearUserData";

export const clearUserData = () => ({
  type: CLEAR_USER_DATA,
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(CLEAR_USER_DATA, (state) => {
        state.data = [];
        state.isLoggedIn = false;
      });
  },
});

export default authSlice.reducer;
