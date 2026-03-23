import API from "./axios";

export const getTasks = () => API.get("/tasks");

export const createTask = (data: { title: string }) =>
  API.post("/tasks", data);

export const updateTask = (id: number, data: { title: string }) =>
  API.put(`/tasks/${id}`, data);

export const deleteTask = (id: number) =>
  API.delete(`/tasks/${id}`);