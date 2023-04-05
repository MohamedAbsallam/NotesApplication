import axios from "axios";
import {token} from './../REDUX/Storage/getItems'

export const createUser = async (values) => {
  try {
    const response = await axios.post(`/api/users`, values);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export const authenticateUser = async (values) => {
  try {
    const response = await axios.post(`/api/users/authenticate`, values);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export const addUserImage = async (values, id) => {
  try {
    const response = await axios.post(`/api/users/${id}/userimage`, values, {
      headers: {
        authorization: `Bearer ${token}`
      } 
    });
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export const getUsers = async (values) => {
  try {
    const response = await axios.post(`/api/users/search`, values, {
      headers: {
        authorization: `Bearer ${token}`
      } 
    });
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export const getUser = async (id) => {
  try {
    const response = await axios.get(`/api/users/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      } 
    });
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateUser = async (id, values) => {
  try {
    const response = await axios.put(`/api/users/${id}`, values, {
      headers: {
        authorization: `Bearer ${token}`
      } 
    });
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`/api/users/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      } 
    });
    return response;
  } catch (err) {
    throw new Error(err);
  }
};
