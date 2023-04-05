import { createSlice } from "@reduxjs/toolkit";
import {
  id,
  user_name,
  first_name,
  last_name,
  email,
  token,
} from "./../Storage/getItems";
import removeItems from "./../Storage/removeItems";

const usersSlice = createSlice({
  name: "USERS",
  initialState: {
    userData: {
      token: token !== "" ? token : "",
      id: id !== "" ? id : "",
      user_name: user_name !== "" ? user_name : "",
      first_name: first_name !== "" ? first_name : "",
      last_name: last_name !== "" ? last_name : "",
      email: email !== "" ? email : "",
      image: null,
    },
    isLoggedin: token ? true : false,
    isLoading: true,
    error: null,
  },
  reducers: {
    addUser: (state, action) => {
      (state.userData = action.payload.response),
      (state.userData.token = action.payload.token);
    },
    update: (state, action) => {
      (state.userData = action.payload.response),
      (state.userData.token = action.payload.token);
    },
    addImage: (state, action) => {
      (state.userData.image = action.payload);
    },
    login: (state) => {
      (state.isLoggedin = true);
    },
    logout: (state) => {
      (state.isLoggedin = false),
      (state.userData = {
        token: "",
        id: "",
        user_name: "",
        first_name: "",
        last_name: "",
        email: "",
        image: null,
      }),
      (state.isLoading = true),
      (state.error = null),
      removeItems();
    },
    setError: (state, action) => {
      (state.error = action.payload);
    },
    setLoading: (state, action) => {
      (state.isLoading = action.payload);
    },
  },
});

export const {
  addUser,
  update,
  addImage,
  login,
  logout,
  setError,
  setLoading,
} = usersSlice.actions;

export default usersSlice.reducer;
