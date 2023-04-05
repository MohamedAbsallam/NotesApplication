import axios from "axios";
import {token} from './../REDUX/Storage/getItems'

export const getNotes = async () => {
  try {
    const response = await axios.get(`/api/notes`, {
      headers: {
        authorization: `Bearer ${token}`
      } 
    });
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export const createNote = async (id, values) => {
  try {
    const response = await axios.post(`/api/notes/${id}`, values, {
      headers: {
        authorization: `Bearer ${token}`
      } 
    });
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export const getNote = async (id) => {
  try {
    const response = await axios.get(`/api/notes/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      } 
    });
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export const updateNote = async (id, values) => {
  try {
    const response = await axios.put(`/api/notes/${id}`, values, {
      headers: {
        authorization: `Bearer ${token}`
      } 
    });
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`/api/notes/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      } 
    });
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export const trendingNotes = async () => {
  try {
    const response = await axios.get(`/api/notes/trending`, {
      headers: {
        authorization: `Bearer ${token}`
      } 
    });
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export const profileNotes = async (id) => {
  try {
    const response = await axios.get(`/api/notes/profile/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      } 
    });
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export const userNotes = async (id) => {
  try {
    const response = await axios.get(`/api/notes/users/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      } 
    });
    return response;
  } catch (err) {
    throw new Error(err);
  }
};
