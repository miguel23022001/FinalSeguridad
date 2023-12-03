import axios from "./axios";

export const getPasswordsRequest = async () => axios.get("/passwords");

export const createPasswordRequest = async (password) => axios.post("/passwords", password);

export const updatePasswordRequest = async (password) =>
  axios.put(`/passwords/${password._id}`, password);

export const deletePasswordRequest = async (id) => axios.delete(`/passwords/${id}`);

export const getPasswordRequest = async (id) => axios.get(`/passwords/${id}`);