import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  link: "/list",
};

const changeLinkSlice = createSlice({
  name: "changeLink",
  initialState,
  reducers: {
    changeLink: (state, action) => {
      state.link = action.payload;
    },
  },
});

export const { changeLink } = changeLinkSlice.actions;

export default changeLinkSlice.reducer;
