import React, { useEffect, useState } from "react";
import { getTopPost } from "../../api/postRequest";
import Post from "../../companeta/post/Post";
import { getOneUser } from "../../api/userRequests";
import { useInfoContext } from "../../context/context";
import { useNavigate } from "react-router-dom";

const TopPost = () => {
  const { setOneUserPage } = useInfoContext();
  const navigate = useNavigate();
  const [topPost, setTopPost] = useState([]);

  const hendleTopPostGet = async () => {
    try {
      const res = await getTopPost();
      setTopPost(res.data.getPost);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    hendleTopPostGet();
  }, []);
  const handleClick = (e, pathname) => {
    e.preventDefault();
    navigate(pathname);
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
    }
  };
  const hendleNavigate = (e, path) => {
    e.preventDefault();
    navigate(path);
  };  
  return (
    <div>
      <a
        href="/"
        className="d-flex align-items-center gap-2"
        style={{
          width: "100%",
          display: "block",
          textAlign: "left",
          margin: "20px",
        }}
        onClick={(e) => hendleNavigate(e, "/")}
      >
        <i class="fa-solid fa-arrow-left"></i>
        back
      </a>
      <div className="row m-0">
        {topPost?.map((post) => {
          return (
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-0 m-0">
              {" "}
              <Post
                post={post}
                handleClick={handleClick}
                handleOneUser={handleOneUser}
              />
              ;
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopPost;
