import { useInfoContext } from "./context/context";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import { getAllUsers, getOneUser } from "./api/userRequests";
import Login from "./page/login/Login";
import Home from "./page/home/Home";
import "./App.css";
import { useLocation } from "react-router-dom";
import { getPost } from "./api/postRequest";
import { getAdminComments } from "./api/commentRequest";
function App2() {
  const location = useLocation();
  const {
    currentUser,
    setCurrentPost,
    setAllUsers,
    setOneUserPage,
    allUsers,
    setAllPost,
    exit,
    setAllComment,
  } = useInfoContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearchUserPage = async () => {
    try {
      const res = await getAllUsers();
      const filteredUsers = res.data.users.filter(
        (user) => user._id !== currentUser._id
      );

      setAllUsers(filteredUsers);
    } catch (error) {
      console.log(error);
      toast.error(error.massage);
    }
  };

  const handleOneUser = async (id) => {
    try {
      if (id) {
        const res = await getOneUser(id);
        setOneUserPage(res.data.user);
        localStorage.setItem("oneUser", JSON.stringify(res.data.user));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleGetPost = async () => {
    try {
      const res = await getPost();
      console.log(res);

      // console.log(res);
      setAllPost(res.data.allPosts);
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "Invalid or expired token") {
        exit();
      }
    }
  };
  useEffect(() => {
    const fetchAdminComments = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await getAdminComments(token);
        setAllComment(res.data.comments);
      } catch (error) {
        toast.error("Xatolik: " + error.message);
      }
    };

    fetchAdminComments();
  }, [setAllComment]);
  const hendleUserPosts = async () => {
    try {
      const res = await getOneUser(currentUser._id);
      const postIds = res.data.user.posts.map((post) => post._id);

      const updatedUser = {
        ...currentUser,
        posts: postIds,
      };
      localStorage.setItem("profile", JSON.stringify(updatedUser));
      setCurrentPost(res.data.user.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/searchPost" ||
      location.pathname === "/posts"
    ) {
      handleGetPost();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/") {
      handleSearchUserPage();
    } else if (location.pathname === "/users") {
      handleSearchUserPage();
    } else if (location.pathname === "/searchUser" && allUsers.length === 0) {
      handleSearchUserPage();
    } else if (!location.pathname.startsWith("/user/")) {
      localStorage.removeItem("oneUser");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/profil") {
      hendleUserPosts();
    }
  }, [location.pathname, currentUser]);
  return (
    <div className="App2">
      <div>
        {currentUser ? (
          <div>
            <Home
              handleSearchUserPage={handleSearchUserPage}
              handleOneUser={handleOneUser}
              showModal={showModal}
            />
          </div>
        ) : (
          <Login />
        )}
      </div>

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <h4 className="text-center">Now it isn't working! 🚧</h4>
      </Modal>
    </div>
  );
}

export default App2;
