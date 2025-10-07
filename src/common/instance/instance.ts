import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const instance = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    "API-KEY": `${API_KEY}`,
  },
});

instance.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${localStorage.getItem("authToken")}`;
  return config;
});
