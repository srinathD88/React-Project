import { createSlice } from "@reduxjs/toolkit";

const initialData = null;
const userSlice = createSlice({
  name: "user",
  initialState: initialData,
  reducers: {
    login: (state, {payload}) => {
      return payload
    },
    logout: () => {
        return initialData;
    }
  },
});

const { actions, reducer } = userSlice;

export const { login, logout } = actions;

export default reducer;
