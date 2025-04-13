import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  links: {},
};

const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    setLinksData: (state, action) => {
      state.links = action.payload;
    },
  },
});

export default linkSlice.reducer;
export const { setLinksData } = linkSlice.actions;
