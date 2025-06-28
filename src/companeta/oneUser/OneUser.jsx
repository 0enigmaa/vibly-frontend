import React from "react";
import "./oneUser.scss";
import Post from "../post/Post";
import { useInfoContext } from "../../context/context";
import Men from "../../puplickImg/men.png"
const OneUser = () => {
  const { oneUserPage } = useInfoContext();
  console.log(oneUserPage);

  return (
    <div>
      {oneUserPage && (
        <div className="oneuser">
          <div className="w-100">
            <div className="oneuser-box py-5 rounded mt-4">
              <div style={{ marginLeft: "-20px" }}>
                    {oneUserPage.profileImage?.url ? (
                  <img
                    width={100}
                    style={{ borderRadius: "50%", height: "100px" }}
                    src={oneUserPage.profileImage.url}
                  />
                ) : (
                  <img
                    style={{ borderRadius: "50%" }}
                    width={50}
                    src={Men}
                  />
                )}

                <div className="text-center mt-3">
                  <h3>
                    {oneUserPage.surname + " " + oneUserPage.username}
                  </h3>
                  <i className="d-block">{oneUserPage.email}</i>
                  <span>Frontend Developer | Teach Lover</span>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-around mt-4">
                <div className="text-center">
                  <strong>
                    {oneUserPage.posts
                      ? oneUserPage.posts.length
                      : 0}
                  </strong>
                  <p>Posts</p>
                </div>
                <div className="text-center">
                  <strong>
                    {oneUserPage.followed.length
                      ? oneUserPage.followed.length
                      : "0"}
                  </strong>
                  <p>followed</p>
                </div>
                <div className="text-center">
                  <strong>
                    {oneUserPage.follower.length
                      ? oneUserPage.follower.length
                      : "0"}
                  </strong>
                  <p>Followers</p>
                </div>
              </div>

              <div className="oneuser-actions d-flex align-items-center justify-content-center gap-3 mt-5 text-align-center"></div>
            </div>

            <div className="oneuser-lg-media row p-0 m-0">
              {oneUserPage.posts?.map((post) => {
                return (
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4 p-0 m-0" key={post._id}>
                    <Post post={post}/>
                  </div>
                );
              })}

              <div className="col-12 col-sm-6 col-md-6 col-lg-4 p-0 m-0"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OneUser;
