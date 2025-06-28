import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const API = axios.create({ baseURL: serverUrl });

// Tokenni localStorage'dan olib har requestda headersga qo'shamiz
const getToken = () => localStorage.getItem("token");

export let getNotifications = () => {
  const token = getToken();
  return API.get("/api/notifications", {
    headers: { token },
  });
};

export let markNotificationAsRead = (id) => {
  const token = getToken();
  return API.put(`/api/notifications/read/${id}`, null, {
    headers: { token },
  });
};

export let deleteNotification = (id) => {
  const token = getToken();
  return API.delete(`/api/notifications/${id}`, {
    headers: { token },
  });
};

export let deleteAllNotifications = () => {
  const token = getToken();
  return API.delete("/api/notifications", {
    headers: { token },
  });
};


