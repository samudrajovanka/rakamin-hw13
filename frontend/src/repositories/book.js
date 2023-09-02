import instance from "../lib/axios";

export const createBook = async (payload) => {
  const response = await instance.postForm('/books', payload);

  return response.data;
};

export const getBooks = async () => {
  const response = await instance.get('/books');

  return response.data;
};

export const getBook = async (id) => {
  const response = await instance.get(`/books/${id}`);

  return response.data;
};

export const updateBook = async (id, payload) => {
  console.log(id, payload);
  const response = await instance.put(`/books/${id}`, payload);

  return response.data;
};

export const deleteBook = async (id) => {
  const response = await instance.delete(`/books/${id}`);

  return response.data;
};
