import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const API = axios.create({ baseURL: serverUrl });

export const register = (formData) => API.post("/api/signup", formData);

export const logIn = (formData) => API.post("/api/login", formData);