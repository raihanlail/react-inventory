import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const loginUser = async (credentials) => {
  return axios.post(`${API_URL}/login`, credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const registerUser = async (user) => {
  return axios.post(`${API_URL}/register`, user);
};

export const getInventory = async (token) => {
  return axios.get(`${API_URL}/inventory`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addItem = async (item, token) => {
  return axios.post(`${API_URL}/inventory`, item, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateItem = async (id, item, token) => {
  return axios.put(`${API_URL}/inventory/${id}`, item, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteItem = async (id, token) => {
  return axios.delete(`${API_URL}/inventory/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
