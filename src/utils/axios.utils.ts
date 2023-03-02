import axios from "axios";
import { config } from "../config";

export const setupClietnAxios = () => {
  axios.defaults.baseURL = config.baseUrlApi;
};

export const setupServerAxios = () => {
  const axiosInstance = axios.create({ baseURL: config.baseUrlApi });
};
