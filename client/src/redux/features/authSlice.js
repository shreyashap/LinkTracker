import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("user")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      const user = action.payload;
      localStorage.setItem("user", JSON.stringify(user));
      state.userInfo = user;
    },
    userLogout: () => {
      localStorage.removeItem("user");
      state.userInfo = null;
    },
  },
});

export default authSlice.reducer;

export const { userLogin, userLogout } = authSlice.actions;
