import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const API = axios.create({ baseURL: serverUrl });
const token = localStorage.getItem("token");

export let getTopUsers = () => API.get('/api/user/top', {
  headers: {token: token}
})
export let getAllUsers = () => API.get("/api/user");
export let getOneUser = (id) => API.get(`/api/user/${id}`);
export let deleteUser = (id) =>
  API.delete(`/api/user/${id}`, {
    headers: { token:token },
  });
export let updateUser = (id, formdata) =>
  API.put(`/api/user/${id}`, formdata, { headers: { token:token} });

export let follow = (id, token) =>
  API.put(
    `/api/follow/${id}`,
    {},
    {
      headers: {
        token: token,
      },
    }
  );
export let savedPost = (postId) =>
  API.put(
    `/api/save/${postId}`,
    {},
    {
      headers: { token },
    }
  );
