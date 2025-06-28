// Profil.js
import React, { useEffect, useRef, useState } from "react";
import ProfilBox from "../../companeta/profilBox/ProfilBox";
import "./profil.css";
import { useInfoContext } from "../../context/context";
import { updateUser } from "../../api/userRequests";
import { addPost } from "../../api/postRequest";
import { message } from "antd";

const Profil = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostModal, setisPostModal] = useState(false);
  const { currentUser, setCurrentUser } = useInfoContext();
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [posting, setPosting] = useState(false);

  const [formData, setFormData] = useState({
    username: currentUser.username || "",
    surname: currentUser.surname || "",
    email: currentUser.email || "",
    hobby: currentUser.hobby || "",
    work: currentUser.work || "",
    profileImage: currentUser.profileImage || {},
  });

  const fileInputRef = useRef(null);
  const showModal = () => setIsModalOpen(true);
  const handleCancelModalPost = () => setisPostModal(false);
  const showPostModal = () => setisPostModal(true);

  const handlePostImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostContentChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleOkPost = () => {
    handleAddPost();
  };

  const handleAddPost = async () => {
    try {
      setPosting(true);
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("content", postContent);
      if (postImage) {
        formData.append("postImage", postImage);
      }

      const res = await addPost(formData, token);
      if (res.data.post) {
        const updatedUser = {
          ...currentUser,
          posts: [...(currentUser.posts || []), res.data.post._id],
        };
        setCurrentUser(updatedUser);
        localStorage.setItem("profile", JSON.stringify(updatedUser));
      }

      setisPostModal(false);
    } catch (error) {
      console.error("Post qo‘shishda xatolik:", error);
    } finally {
      setPosting(false);
      setPostImage(null);
      setPostContent("");
      setPreviewImage("");
    }
  };

  useEffect(() => {
    setFormData({
      username: currentUser.username || "",
      surname: currentUser.surname || "",
      email: currentUser.email || "",
      hobby: currentUser.hobby || "",
      work: currentUser.work || "",
      profileImage: currentUser.profileImage || {},
    });
  }, [currentUser]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profilePicture: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setPosting(true);
      const token = localStorage.getItem("token");
      const updatedFormData = new FormData();
      updatedFormData.append("username", formData.username);
      updatedFormData.append("surname", formData.surname);
      updatedFormData.append("email", formData.email);
      updatedFormData.append("hobby", formData.hobby);
      updatedFormData.append("work", formData.work);
      if (formData.profilePicture) {
        updatedFormData.append("profileImage", formData.profilePicture);
      }

      const res = await updateUser(currentUser._id, updatedFormData, token);
      if (res.data.updatedUser) {
        setCurrentUser(res.data.updatedUser);
        localStorage.setItem("profile", JSON.stringify(res.data.updatedUser));
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      message.error("Profilni yangilashda xatolik yuz berdi.");
    } finally {
      setPosting(false);
    }
  };

  return (
    <ProfilBox
      showModal={showModal}
      isModalOpen={isModalOpen}
      handleSubmit={handleSubmit}
      formData={formData}
      fileInputRef={fileInputRef}
      handleImageChange={handleImageChange}
      handleChange={handleChange}
      postImage={postImage}
      postContent={postContent}
      handlePostImageChange={handlePostImageChange}
      handlePostContentChange={handlePostContentChange}
      handleOkPost={handleOkPost}
      isPostModal={isPostModal}
      handleCancelModalPost={handleCancelModalPost}
      showPostModal={showPostModal}
      addPost={addPost}
      View={previewImage}
      posting={posting}
      setIsModalOpen={setIsModalOpen}
    />
  );
};

export default Profil;
