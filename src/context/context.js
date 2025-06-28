import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const InfoContext = createContext();
export const useInfoContext = () => useContext(InfoContext);

export const InfoProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("profile")) || null
  );
  const [currentPost, setCurrentPost] = useState(null);
  const [isActiv, setIsActiv] = useState(
    JSON.parse(localStorage.getItem("isActiv")) || 0
  );
  const [oneUserPage, setOneUserPage] = useState(
    JSON.parse(localStorage.getItem("oneUser")) || null
  );
  const [allUsers, setAllUsers] = useState([]);
  const [allPost, setAllPost] = useState([]);
  const [countNTF, setCountNTF] = useState(0); // → Bu array emas, number bo'lishi kerak!
  const [notifications, setNotifications] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const [onePost, setOnePost] = useState([]);
  const [allComment, setAllComment] = useState([]);
  const socketRef = useRef(null);

  // 🔌 SOCKET.IO ulanishi
  useEffect(() => {
    if (!currentUser?._id) return;

    if (!socketRef.current) {
      socketRef.current = io(process.env.REACT_APP_SERVER_URL);
    }

    socketRef.current.emit("new-user-add", currentUser._id);

    socketRef.current.on("newNotification", (data) => {
      console.log("Real-time notification:", data);
      setNotifications((prev) => [data, ...prev]);
      setCountNTF((prev) => prev + 1);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [currentUser]);

  const exit = () => {
    setCurrentUser(null);
    localStorage.clear();
  };

  const value = {
    exit,
    isActiv,
    setIsActiv,
    currentUser,
    setCurrentUser,
    allUsers,
    setAllUsers,
    oneUserPage,
    setOneUserPage,
    allPost,
    setAllPost,
    currentPost,
    setCurrentPost,
    countNTF,
    setCountNTF,
    socket: socketRef.current,
    notifications,
    setNotifications,
    topUsers,
    setTopUsers,
    topPosts,
    setTopPosts,
    onePost,
    setOnePost,
    allComment,
    setAllComment
  };

  return <InfoContext.Provider value={value}>{children}</InfoContext.Provider>;
};
