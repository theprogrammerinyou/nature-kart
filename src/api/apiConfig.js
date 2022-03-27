/* eslint-disable no-param-reassign */
import axios from "axios";

const onBeforeRequestSent = (config) => {
  const token = window.accessToken;
  if (token) config.headers.common.Authorization = `Bearer ${token}`;
  return config;
};

const onRequestError = (error) => Promise.reject(error);

const instance = axios.create({
  headers: { "Content-Type": "application/json" },
  baseURL: process.env.REACT_APP_API_URL,
});

// request interceptor
instance.interceptors.request.use(onBeforeRequestSent, onRequestError);

const API = instance;

export default API;
