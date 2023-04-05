import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./Slices/users.Slice";

const store = configureStore({
  reducer: usersSlice,
});

export default store;
