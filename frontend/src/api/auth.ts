import API from "./axios";

export const signup = (data: { email: string; password: string }) =>
  API.post("/signup", data);

export const login = (data: { email: string; password: string }) =>
  API.post("/login", data);