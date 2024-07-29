// features/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
    updateUserProfile: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
  },
});

export const { setUser, clearUser, updateUserProfile } = userSlice.actions;

export const selectUser = (state) => state.user.currentUser;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export default userSlice.reducer;
