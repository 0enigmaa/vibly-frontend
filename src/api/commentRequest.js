import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const API = axios.create({ baseURL: serverUrl });

export const getComments = (token, postId) =>
  API.get(`/api/comment/${postId}`, {
    headers: { token },
  });
export const getAdminComments = (token) =>
  API.get(`/api/admin/comment`, {
    headers: { token },
  });

export const addComment = async (token, content, postId) => {
  return await API.post(
    `/api/comment`,
    { content, postId },
    {
      headers: { token },
    }
  );
};

export const deleteComment = async (token, commentId) => {
  return await API.delete(`/api/comment/${commentId}`, {
    headers: {
      token: token, // ⬅️ tokenni 'token' sifatida yubor
    },
  });
};
export const updateComment = async (token, commentId, content) => {
  return await API.put(
    `/api/comment/${commentId}`,
    { content },
    {
      headers: { token },
    }
  );
};
