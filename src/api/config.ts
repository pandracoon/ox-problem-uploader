import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

// const HOST = "https://api.almo-edu.com"
const HOST = process.env.REACT_APP_BACKEND_URL

export const requestAPI = (): AxiosInstance => {
  const configs: AxiosRequestConfig = {

  };

  const client = axios.create({
    baseURL: HOST,
    ...configs,
  });

  return client;
};