import { useEffect } from "react";
import LeftSize from "../../companeta/left/LeftSize";
import "./home.css";
import Post from "../../companeta/post/Post";
import { useLocation, useNavigate } from "react-router-dom";
import Profil from "../profil/Profil";
import Bell from "../bell/Bell";
import SearchUser from "../searchUser/SearchUser";
import SearchPost from "../searchPost/SearchPost";
import { useInfoContext } from "../../context/context";
import Note from "../../companeta/note/Note";
import OneUser from "../../companeta/oneUser/OneUser";
import Navbar from "../../companeta/navbar/Navbar";
import Admin from "../Admin";
import UsersAdmin from "../user/UserAdmin";
import TopUsers from "../topUsers/TopUsers";
import TopPost from "../topPosts/TopPost";
import CommentAdmin from "../comment/Comment";
import OnePost from "../../companeta/onePost/OnePost";
const Home = ({ showModal, handleSearchUserPage, handleOneUser }) => {
  const { isActiv, setIsActiv, allPost, currentUser } = useInfoContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleIconClick = (index) => {
    localStorage.setItem("isActiv", index);
    setIsActiv(index);
  };

  useEffect(() => {
    if (location.pathname === "/") {
      localStorage.setItem("isActiv", 0);
      setIsActiv(0);
    }
  }, []);

  const handleClick = (e, pathname) => {
    e.preventDefault();
    navigate(pathname);
  };
  const hendleNavigate = (e, path) => {
    e.preventDefault();
    navigate(path);
  };
  return (
    <div>
      <div style={{ position: "sticky", top: "0", zIndex: "999" }}>
        <Navbar
          handleClick={handleClick}
          isActiv={isActiv}
          handleIconClick={handleIconClick}
          showModal={showModal}
          handleSearchUserPage={handleSearchUserPage}
        />
      </div>

      {currentUser.role === "admin" ? (
        <div>
          {location.pathname === "/" && (
            <section className="d-flex">
              <LeftSize showModal={showModal} />
              <div className="w-100" style={{ background: "#f0f2f5" }}>
                <Admin users={handleSearchUserPage} />
              </div>
            </section>
          )}
          {location.pathname === "/topUsers" && (
            <section className="d-flex">
              <LeftSize showModal={showModal} />
              <div className="w-100" style={{ background: "#f0f2f5" }}>
                <TopUsers />
              </div>
            </section>
          )}
          {location.pathname === "/topPost" && (
            <section className="d-flex">
              <LeftSize showModal={showModal} />
              <div className="w-100" style={{ background: "#f0f2f5" }}>
                <TopPost />
              </div>
            </section>
          )}

          {location.pathname === "/users" && (
            <section className="d-flex">
              <LeftSize showModal={showModal} />
              <div className="w-100" style={{ background: "#f0f2f5" }}>
                <UsersAdmin
                  handleClick={handleClick}
                  handleOneUser={handleOneUser}
                />
              </div>
            </section>
          )}
          {location.pathname === "/comments" && (
            <section className="d-flex">
              <LeftSize showModal={showModal} />
              <div className="w-100" style={{ background: "#f0f2f5" }}>
                <CommentAdmin />
              </div>
            </section>
          )}


          {location.pathname === "/posts" && (
            <div className="p-3" style={{ background: "#f0f2f5" }}>
              <a
                href="/"
                className="d-flex align-items-center gap-2"
                style={{
                  width: "100%",
                  display: "block",
                  textAlign: "left",
                }}
                onClick={(e) => hendleNavigate(e, "/")}
              >
                <i class="fa-solid fa-arrow-left"></i>
                back
              </a>
              <div className="w-100 row" >
                {allPost?.map((post) => {
                  return (
                    <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                      <Post
                        key={post._id}
                        handleClick={handleClick}
                        post={post}
                        handleOneUser={handleOneUser}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}


          {location.pathname === "/home" && (
            <section className="d-flex">
              <LeftSize showModal={showModal} />
              <div className="w-100" style={{ background: "#f0f2f5" }}>
                {allPost?.map((post) => {
                  return (
                    <Post
                      key={post._id}
                      handleClick={handleClick}
                      post={post}
                      handleOneUser={handleOneUser}
                    />
                  );
                })}
              </div>
            </section>
          )}
          {location.pathname === "/note" && (
            <section className="d-flex">
              <LeftSize showModal={showModal} />
              <div className="w-100" style={{ background: "#f0f2f5" }}>
                <Note />
              </div>
            </section>
          )}
          {location.pathname === "/story" && (
            <section className="d-flex">
              <LeftSize showModal={showModal} />
              <div className="w-100" style={{ background: "#f0f2f5" }}>
                <Note />
              </div>
            </section>
          )}
          <div>{location.pathname === "/profil" && <Profil />}</div>
          <div>{location.pathname === "/bell" && <Bell />}</div>
          <div>
            {location.pathname === "/searchUser" && (
              <SearchUser
                handleClick={handleClick}
                handleOneUser={handleOneUser}
              />
            )}
          </div>
          <div>
            {location.pathname === "/searchPost" && (
              <SearchPost
                handleClick={handleClick}
                handleOneUser={handleOneUser}
              />
            )}
          </div>
          <div>{location.pathname.startsWith("/user/") && <OneUser />}</div>
          <div>{location.pathname.startsWith("/post/") && <OnePost />}</div>
        </div>
      ) : (
        <div>
          {location.pathname === "/" && (
            <section className="d-flex">
              <LeftSize showModal={showModal} />
              <div className="w-100" style={{ background: "#f0f2f5" }}>
                {allPost?.map((post) => {
                  return (
                    <Post
                      key={post._id}
                      handleClick={handleClick}
                      post={post}
                      handleOneUser={handleOneUser}
                    />
                  );
                })}
              </div>
            </section>
          )}
          {location.pathname === "/note" && (
            <section className="d-flex">
              <LeftSize showModal={showModal} />
              <div className="w-100" style={{ background: "#f0f2f5" }}>
                <Note />
              </div>
            </section>
          )}
          {location.pathname === "/story" && (
            <section className="d-flex">
              <LeftSize showModal={showModal} />
              <div className="w-100" style={{ background: "#f0f2f5" }}>
                <Note />
              </div>
            </section>
          )}
          <div>{location.pathname === "/profil" && <Profil />}</div>
          <div>{location.pathname === "/bell" && <Bell />}</div>
          <div>
            {location.pathname === "/searchUser" && (
              <SearchUser
                handleClick={handleClick}
                handleOneUser={handleOneUser}
              />
            )}
          </div>
          <div>
            {location.pathname === "/searchPost" && (
              <SearchPost
                handleClick={handleClick}
                handleOneUser={handleOneUser}
              />
            )}
          </div>
          <div>{location.pathname.startsWith("/user/") && <OneUser />}</div>
          <div>{location.pathname.startsWith("/post/") && <OnePost />}</div>
        </div>
      )}
    </div>
  );
};

export default Home;
