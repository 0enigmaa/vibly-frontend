// App.jsx
import React, { useEffect, useState } from "react";
import NotFound from "./page/notFountPage/NotFountPage.jsx";
import App2 from "./App2.jsx";

// Ruxsat berilgan yo‘llar
const allowedPathsAdmin = [
  "/",
  "/home",
  "/searchUser",
  "/searchPost",
  "/bell",
  "/profil",
  "/topUsers",
  "/topPost",
  "/posts",
  "/users",
  "/comments"
];
const allowedPathsUser = [
  "/",
  "/searchUser",
  "/searchPost",
  "/bell",
  "/profil",
];

const App = () => {
  // `null` – hali aniqlanmagan holat; true/false aniqlangach set qilinadi
  const [isAllowed, setIsAllowed] = useState(null);

  useEffect(() => {
    const currentPath = window.location.pathname;

    let allowed = false;
    try {
      const savedProfile = localStorage.getItem("profile");
      const currentUser = savedProfile ? JSON.parse(savedProfile) : null;
        
      if (currentUser) {
        const paths =
          currentUser.role === "admin" ? allowedPathsAdmin : allowedPathsUser;
        allowed = paths.includes(currentPath);        
      }else{
        const paths = allowedPathsUser;
        allowed = paths.includes(currentPath)
      }
    } catch (err) {
      console.error("localStorage yoki JSON xatosi:", err);
    }

    setIsAllowed(allowed);
  }, []); // [] – faqat bir marta ishga tushadi (mount paytida)

  // Hali aniqlanmagan bo‘lsa, hech narsa ko‘rsatmaymiz (yoki loader qo‘yishingiz mumkin)
  if (isAllowed === null) return null;

  // Aniqlangach, kerakli komponentni render qilamiz
  return isAllowed ? <App2 /> : <NotFound />;
};

export default App;
