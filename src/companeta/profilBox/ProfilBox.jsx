// ProfilBox.js
import React from "react";
import { Button, Modal, Form, Input } from "antd";
import Post from "../post/Post";
import { useInfoContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../api/userRequests";
import imgUser from "../../puplickImg/men.png";

const ProfilBox = ({
  showModal,
  isModalOpen,
  handleSubmit,
  formData,
  fileInputRef,
  handleImageChange,
  handleChange,
  postContent,
  handlePostImageChange,
  handlePostContentChange,
  handleOkPost,
  isPostModal,
  handleCancelModalPost,
  showPostModal,
  View,
  posting,
  setIsModalOpen,
}) => {
  const { currentUser, currentPost, exit } = useInfoContext();
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm(
      "Are you sure to delete your account?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await deleteUser(currentUser._id, token);
      exit();
      navigate("/");
    } catch (error) {
      console.error("User deletion failed:", error);
      alert("Failed to delete user");
    }
  };

  return (
    <div className="profil">
      <div className="w-100">
        <div className="profil-box py-5 rounded mt-4">
          <div style={{ marginLeft: "-20px", position: "relative" }}>
            <div className="profil-avatar mb-4">
              <img
                width={100}
                style={{ borderRadius: "50%", height: "100px" }}
                src={currentUser?.profileImage?.url || imgUser}
                alt="Profile"
              />
            </div>
            <button
              className="btn btn-danger d-flex gap-2 align-items-center"
              onClick={exit}
              style={{ position: "absolute", top: "-30%", right: "5%" }}
            >
              <strong>LogOut</strong>
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
            <div className="text-center mt-3">
              <h3>
                {currentUser.username} {currentUser.surname}
              </h3>
              <i>{currentUser.email}</i>
              <br />
              <span>{currentUser.work + " | " + currentUser.hobby}</span>
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-around mt-4">
            <div className="text-center">
              <strong>
                {currentUser.posts ? currentUser.posts.length : "0"}
              </strong>
              <p>Posts</p>
            </div>
            <div className="text-center">
              <strong>{currentUser.followed.length}</strong>
              <p>Followed</p>
            </div>
            <div className="text-center">
              <strong>{currentUser.follower.length}</strong>
              <p>Followers</p>
            </div>
          </div>

          <div className="action-box d-flex align-items-center justify-content-center gap-3 mt-5">
            <Button type="primary" onClick={showPostModal}>
              Add Post
            </Button>
            <Button type="primary" onClick={showModal}>
              Edit Profile
            </Button>
            <Button danger onClick={handleDeleteUser}>
              Delete User
            </Button>
          </div>
        </div>

        <div className="profil-lg-media row p-0 m-0">
          {currentPost?.map((post) => (
            <div
              key={post._id}
              className="col-12 col-sm-6 col-md-6 col-lg-4 p-0 m-0"
            >
              <Post post={post} />
            </div>
          ))}
        </div>

        <Modal
          title="Add New Post"
          open={isPostModal}
          onOk={handleOkPost}
          onCancel={handleCancelModalPost}
          okText="Add Post"
          cancelText="Cancel"
          okButtonProps={{ disabled: posting, loading: posting }}
        >
          <Form layout="vertical">
            <Form.Item label="Post Image">
              <label
                htmlFor="post-upload"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  cursor: "pointer",
                  border: "2px dashed #ccc",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {View ? (
                  <img
                    src={View}
                    alt="Post"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <p>+ Add Post</p>
                )}
              </label>
              <input
                type="file"
                accept="image/*"
                id="post-upload"
                style={{ display: "none" }}
                onChange={handlePostImageChange}
              />
            </Form.Item>

            <Form.Item label="Post Content" required>
              <Input.TextArea
                rows={4}
                placeholder="What's on your mind?"
                value={postContent}
                onChange={handlePostContentChange}
              />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Edit User"
          open={isModalOpen}
          onOk={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          okText="Save Changes"
          okButtonProps={{ disabled: posting, loading: posting }}
        >
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <label htmlFor="profile-upload">
              <img
                src={View || currentUser?.profileImage?.url || imgUser}
                alt="Profile"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              />
            </label>
            <input
              type="file"
              accept="image/*"
              id="profile-upload"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>

          <Form layout="vertical">
            <Form.Item label="Username" required>
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Surname" required>
              <Input
                name="surname"
                value={formData.surname}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Email" required>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Hobby">
              <Input
                name="hobby"
                value={formData.hobby}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Work">
              <Input
                name="work"
                value={formData.work}
                onChange={handleChange}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default ProfilBox;
