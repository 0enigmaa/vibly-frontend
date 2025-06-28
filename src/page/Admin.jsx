import { useNavigate } from "react-router-dom";
import "./admin.scss";
import { useInfoContext } from "../context/context";

const Admin = () => {
  const navigate = useNavigate();
  const { allUsers, allPost, allComment } = useInfoContext();

  return (
    <div>
      <div className="adminPage">
        <div
          className="adminPageItem top-users"
          onClick={() => navigate("/topUsers")}
        >
          <i
            class="fa-brands fa-web-awesome icon-admin"
            style={{ color: " #FFD43B" }}
          ></i>
          <p>Top Users</p>
        </div>
        <div className="adminPageItem" onClick={() => navigate("/topPost")}>
          <i
            class="fa-brands fa-web-awesome icon-admin"
            style={{ color: " #FFD43B" }}
          ></i>

          <p> Top Posts</p>
        </div>
      </div>
      <div className="adminPage">
        <div className="adminPageItem" onClick={() => navigate("/users")}>
          <i
            className="fa-solid fa-users  icon-admin"
          ></i>
          <p className="text-admin"> users {allUsers.length + 1} </p>
        </div>
        <div
          className="adminPageItem posts "
          onClick={() => navigate("/posts")}
        >
          <i class="fa-solid fa-layer-group icon-admin"></i>
          <p> posts {allPost.length} </p>
        </div>
        <div
          className="adminPageItem comment"
          onClick={() => navigate("/comments")}
        >
          <i class="fa-solid fa-comments icon-admin"></i>
          <p> comments {allComment.length} </p>
          {/* <p> comments {allUsers.length}  </p> */}
        </div>
      </div>
    </div>
  );
};

export default Admin;
