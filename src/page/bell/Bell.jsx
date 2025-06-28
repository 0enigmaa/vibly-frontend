import { useEffect } from "react";
import { useInfoContext } from "../../context/context";
import {
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
  deleteAllNotifications,
} from "../../api/nutification";
import "./bell.scss";
import moment from "moment";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { getOneUser } from "../../api/userRequests";
import { getOnePost } from "../../api/postRequest";

const NotificationsPage = () => {
  // update: moved notifications state to context
  const {
    currentUser,
    setCountNTF,
    countNTF,
    notifications,
    setNotifications,
    setOneUserPage,
    setOnePost,
  } = useInfoContext(); // update: fallback to empty array
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?._id) {
      fetchNotifications();
    }
  }, [currentUser]);
  const handleOneUser = async (id) => {
    try {
      if (id) {
        const res = await getOneUser(id);
        setOneUserPage(res.data.user);
        localStorage.setItem("oneUser", JSON.stringify(res.data.user));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnePost = async (id) => {
    try {
      if (id) {
        const res = await getOnePost(id);        
        setOnePost(res.data.post);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchNotifications = async () => {
    try {
      
      const data = await getNotifications();
      setNotifications(data.data.notifications); // update: set context notifications
      setCountNTF(data.data.unreadCount);
    } catch (err) {
      console.error("Xatolik (fetchNotifications):", err);
    }
  };

  const handleMarkAsNavigate = async (userId, type, postId) => {
    if (type === "follow") {
      await handleOneUser(userId);
      navigate(`/user/${userId}`);
    } else {
      await handleOnePost(postId);
      navigate(`/post/${postId}`);
    }
  };

  const handleMarkAsRead = async (id, userId, type, postId) => {
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      if (type === "follow") {
        await handleOneUser(userId);
        navigate(`/user/${userId}`);
      } else {
        await handleOnePost(postId);
        navigate(`/post/${postId}`);
      }
      setCountNTF((prev) => Math.max(prev - 1, 0));
    } catch (err) {
      console.error("Xatolik (markAsRead):", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Barcha bildirishnoma o‘chirishni xohlaysizmi?"
    );
    if (!confirmed) return;
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      const deletedNtf = notifications.find((n) => n._id === id);
      if (deletedNtf && !deletedNtf.isRead) {
        setCountNTF((prev) => Math.max(prev - 1, 0));
      }
    } catch (err) {
      console.error("Xatolik (delete):", err);
    }
  };

  const handleDeleteAll = async () => {
    const confirmed = window.confirm(
      "Barcha bildirishnomalarni o‘chirishni xohlaysizmi?"
    );
    if (!confirmed) return;
    try {
      await deleteAllNotifications();
      setNotifications([]);
      setCountNTF(0);
    } catch (err) {
      console.error("Xatolik (deleteAll):", err);
    }
  };

  return (
    <div className="notifications">
      <div className="count">
        <i className="fa-solid fa-bell" style={{ color: "#74C0FC" }}>
          {" "}
        </i>{" "}
        <h2> Notifications </h2> <div className="count-i">{countNTF}</div>
      </div>

      <Button color="default" variant="filled" onClick={handleDeleteAll}>
        all delete
      </Button>
      <ul className="ntf-all">
        {notifications.map((ntf) => (
          <li
            key={ntf._id}
            className={`ntf-item ${ntf.isRead ? "font-normal" : "font-bold"}`}
          >
            <div className="ntf-text">
              <strong>{ntf.sender?.username}</strong>
              <div>
                {ntf.type === "like" && (
                  <p className="notification-like">
                    <i
                      className="fa-solid fa-heart"
                      style={{ color: "#d81313" }}
                    ></i>
                    <span> liked your post</span>
                  </p>
                )}

                {ntf.type === "follow" && (
                  <p className="notification-follow">
                    <i
                      className="fa-solid fa-user-plus"
                      style={{ color: "#74C0FC" }}
                    ></i>
                    <span> followed you</span>
                  </p>
                )}

                {ntf.type === "comment" && (
                  <p className="notification-comment">
                    <i
                      className="fa-regular fa-comment"
                      style={{ color: "#74C0FC" }}
                    ></i>
                    <span> commente you</span>
                  </p>
                )}

                {!["like", "follow", "comment"].includes(ntf.type) && (
                  <h1 className="notification-default">
                    sent you a notification
                  </h1>
                )}
              </div>

              <small className="date">{moment(ntf?.createdAt).fromNow()}</small>
            </div>
            <div className="ntf-btn">
              {ntf.isRead ? (
                <Button
                  className="read-btn"
                  color="primary"
                  variant="solid"
                  onClick={() =>
                    handleMarkAsNavigate(ntf.sender._id, ntf.type, ntf.postId)
                  }
                >
                  view
                </Button>
              ) : (
                <Button
                  className="read-btn"
                  color="primary"
                  variant="solid"
                  onClick={() =>
                    handleMarkAsRead(
                      ntf._id,
                      ntf.sender._id,
                      ntf.type,
                      ntf.postId
                    )
                  }
                >
                  view
                </Button>
              )}
              <Button
                className="delete-btn"
                color="default"
                variant="filled"
                onClick={() => handleDelete(ntf._id)}
              >
                delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;
