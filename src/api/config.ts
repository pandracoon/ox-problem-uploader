import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

const HOST = 'http://localhost:8000'

export const requestAPI = (): AxiosInstance => {
  const configs: AxiosRequestConfig = {

  };

  const client = axios.create({
    baseURL: HOST,
    ...configs,
  });

  return client;
};