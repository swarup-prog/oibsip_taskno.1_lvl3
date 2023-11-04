import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: [],
  isRead: false,
  error: null,
};

export const fetchNotification = createAsyncThunk(
  "notification/fetchBotification",
  async (id) => {
    const response = await axios.get(
      `http://localhost:8000/api/notification/getNotifications/${id}`
    );
    return response.data;
  }
);

const CLEAR_NOTIFICATION = "notification/clearNotification";

export const clearNotification = () => ({
  type: CLEAR_NOTIFICATION,
});

const notificatioSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setIsRead: (state) => {
      state.isRead = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isRead = false;
        state.error = null;
      })
      .addCase(fetchNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(CLEAR_NOTIFICATION, (state) => {
        state.data = [];
        state.isRead = false;
      });
  },
});

export const { setIsRead } = notificatioSlice.actions;

export default notificatioSlice.reducer;
