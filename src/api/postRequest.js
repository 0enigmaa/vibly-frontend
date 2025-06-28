import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const API = axios.create({ baseURL: serverUrl });

export let addPost = (formData, token) =>
  API.post("/api/post", formData, {
    headers: { token: token },
  });

export let getPost = () =>
  API.get("/api/post", {
    headers: { token: localStorage.getItem("token")},
  });

export let getTopPost = () =>
  API.get("/api/post/top", {
    headers: { token: localStorage.getItem("token") },
  });

export let deletePost = (id) =>
  API.delete(`/api/post/${id}`, {
    headers: { token: localStorage.getItem("token") },
  });

export let updatePost = (id, formdata) =>
  API.put(`/api/post/${id}`, formdata, {
    headers: { token: localStorage.getItem("token") },
  });

export let getOnePost = (postId) =>
  API.get(`/api/post/${postId}`, {
    headers: { token: localStorage.getItem("token") },
  });

export let savedPost = (postId) =>
  API.put(
    `/api/save/${postId}`,
    {},
    {
      headers: { token: localStorage.getItem("token") },
    }
  );

export let likePost = (postId) =>
  API.put(
    `/api/like/${postId}`,
    {},
    {
      headers: { token: localStorage.getItem("token") },
    }
  );
