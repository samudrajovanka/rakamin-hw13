import instance from "../lib/axios";

export const register = async (payload) => {
  const response = await instance.post('/register', payload);

  return response.data;
};

export const login = async (payload) => {
  const response = await instance.post('/login', payload);

  return response.data;
};