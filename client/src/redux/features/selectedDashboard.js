import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dashboardName: "All Links",
};

const selectedDashboard = createSlice({
  name: "selectedDashboard",
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.dashboardName = action.payload;
    },
  },
});

export default selectedDashboard.reducer;

export const { setSelected } = selectedDashboard.actions;
