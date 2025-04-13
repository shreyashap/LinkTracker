import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import dashboardReducer from "./features/selectedDashboard";
import linkReducer from "./features/linkSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    selectedDashboard: dashboardReducer,
    link: linkReducer,
  },
});

export default store;
