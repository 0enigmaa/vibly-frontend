import React from "react";
import { useInfoContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { getOneUser } from "../../api/userRequests";
import Post from "../post/Post";

const OnePost = () => {
  const navigate = useNavigate();
  const { onePost, setOneUserPage } = useInfoContext();

  // Navigatsiya qilish uchun funksiya
  const handleClick = (pathname) => {
    navigate(pathname);
  };

  // Bitta foydalanuvchini olish funksiyasi
  const handleOneUser = async (id) => {
    try {
      if (id) {
        const res = await getOneUser(id);
        if (res?.data?.user) {
          setOneUserPage(res.data.user);
          localStorage.setItem("oneUser", JSON.stringify(res.data.user));
        }
      }
    } catch (error) {
      console.error("Foydalanuvchini olishda xatolik:", error);
    }
  };

  return (
    <div>
      {onePost ? (
        <Post
          handleClick={handleClick}
          post={onePost}
          handleOneUser={handleOneUser}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default OnePost;
