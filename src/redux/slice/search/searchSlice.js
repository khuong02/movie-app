import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchData: null,
  loading: false,
  err: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchPending: (state) => {
      state.loading = true;
    },
    searchSuccess: (state, action) => {
      state.loading = false;
      state.searchData = action.payload;
      state.err = null;
    },
    searchFailed: (state, action) => {
      state.loading = false;
      state.err = action.payload;
    },
    turnOffError: (state) => {
      state.loading = false;
      state.err = null;
    },
  },
});

export const { searchPending, searchSuccess, searchFailed, turnOffError } =
  searchSlice.actions;

export default searchSlice.reducer;
