import axios from "axios";
import { TOKEN_KEY } from "./constants/key";

const instance = axios.create({
  baseURL: 'http://localhost:8000'
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
