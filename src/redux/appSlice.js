import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: {},
  listUser: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      return { ...state, admin: action.payload };
    },
    setListUser: (state, action) => {
      return { ...state, listUser: action.payload };
    },
  },
});

export const { setAdmin, setListUser } = appSlice.actions;

export default appSlice.reducer;
