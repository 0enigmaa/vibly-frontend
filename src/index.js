// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";
import { InfoProvider } from "./context/context.js";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <InfoProvider>
        <App />
        <ToastContainer />
      </InfoProvider>
    </React.StrictMode>
  </BrowserRouter>
);
