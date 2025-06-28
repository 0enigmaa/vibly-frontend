// import React, { useState } from "react";
// import Men from "../../puplickImg/men.png";
// import { Image, Popconfirm, message, Button } from "antd";
// import { useInfoContext } from "../../context/context";
// import moment from "moment";
// import { deletePost, likePost, updatePost } from "../../api/postRequest";
// import UpdatePostModal from "../modal/UpdatePostModal";
// import { savedPost } from "../../api/userRequests";
// import {
//   addComment,
//   deleteComment,
//   getComments,
// } from "../../api/commentRequest";
// import { PopconfirmProps } from "antd";
// import "./post.scss";

// const Post = ({ post, handleOneUser, handleClick }) => {
//   const { currentUser, setCurrentUser } = useInfoContext();
//   const [isCommit, setIsCommit] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser._id));
//   const [likeCount, setLikeCount] = useState(post.likes.length);
//   const [commentLenth, setCommentLenth] = useState(post.comments.length);

//   // Edit tugmasini bosganda
//   const handleEditClick = (post) => {
//     setSelectedPost(post);
//     setIsModalOpen(true);
//   };

//   const cancel: PopconfirmProps["onCancel"] = (e) => {
//     console.log(e);
//     message.error("Click on No");
//   };

//   const handleUpdatePost = async (values) => {
//     try {
//       await updatePost(selectedPost._id, values);
//       message.success("Post muvaffaqiyatli yangilandi");
//       setIsModalOpen(false);

//       const updatedUser = {
//         ...currentUser,
//         post: currentUser.post.map((p) =>
//           p._id === selectedPost._id ? { ...p, ...values } : p
//         ),
//       };
//       localStorage.setItem("profile", JSON.stringify(updatedUser));
//       setCurrentUser(updatedUser);
//     } catch (error) {
//       setIsModalOpen(false);
//       console.error("Xatolik:", error);
//       message.error("Postni yangilashda xatolik yuz berdi");
//     }
//   };

//   const hendleDeletPost = async (id) => {
//     try {
//       await deletePost(id);

//       const currentUser = JSON.parse(localStorage.getItem("profile"));
//       const updatedPosts = currentUser.posts.filter((postId) => postId !== id);

//       const updatedUser = {
//         ...currentUser,
//         posts: updatedPosts,
//       };

//       console.log(updatedPosts);
//       localStorage.setItem("profile", JSON.stringify(updatedUser));
//       setCurrentUser(updatedUser);
//       message.success("Post o‘chirildi");
//     } catch (error) {
//       console.log("Xatolik:", error);
//       message.error("Postni o‘chirishda xatolik yuz berdi");
//     }
//   };

//   const handleSavePost = async (postId) => {
//     try {
//       await savedPost(postId);

//       const userData = currentUser;
//       if (!userData) return console.log("User not found in localStorage");

//       let savedPosts = userData.savedPosts || [];

//       const isSaved = savedPosts.includes(postId);

//       if (isSaved) {
//         savedPosts = savedPosts.filter((id) => id !== postId);
//       } else {
//         savedPosts.push(postId);
//       }

//       const updatedUser = {
//         ...userData,
//         savedPosts,
//       };
//       localStorage.setItem("profile", JSON.stringify(updatedUser));
//       setCurrentUser(updatedUser);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const getCommentsByPostId = async (postId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await getComments(token, postId);
//       setComments(res.data.comments);
//     } catch (error) {
//       console.error("Error fetching comments:", error);
//     }
//   };

//   const handleSendComment = async () => {
//     try {
//       if (!newComment.trim()) return;

//       const token = localStorage.getItem("token");
//       await addComment(token, newComment, post._id);

//       setCommentLenth(commentLenth + 1);
//       setNewComment(""); // inputni tozalash
//       await getCommentsByPostId(post._id); // yangilash
//     } catch (err) {
//       console.error("Failed to send comment", err);
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       const token = localStorage.getItem("token");
//       await deleteComment(token, commentId);

//       setCommentLenth(commentLenth - 1);
//       await getCommentsByPostId(post._id);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const handleLike = async (id) => {
//     try {
//       await likePost(id);
//       setIsLiked(!isLiked);
//       setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
//     } catch (error) {
//       console.error("Like bosishda xatolik:", error);
//     }
//   };

//   return (
//     post && (
//       <div className="post">
//         <div className="post-card">
//           <a
//             href={`/user/${post?.userId?._id}`}
//             onClick={(e) => {
//               handleClick(e, `/user/${post?.userId?._id}`);
//               handleOneUser(post?.userId?._id);
//             }}
//           >
//             <div className="user-info">
//               <img src={Men} alt="User" className="avatar" />
//               <div style={{ textAlign: "start" }}>
//                 <h3 className="username">
//                   {post?.userId?.surname + " " + post?.userId?.username}
//                 </h3>
//                 <p className="location">
//                   {moment(post?.createdAt).format("DD MMMM YYYY, HH:mm")}
//                 </p>
//               </div>
//             </div>
//           </a>

//           <div className="post-content">
//             <p>{post?.content}</p>
//           </div>

//           {post?.postImage?.url ? (
//             <div className="post-image">
//               <Image src={post?.postImage?.url} alt="Post" />
//             </div>
//           ) : (
//             <div
//               style={{
//                 height: "200px",
//                 border: "1px dashed grey",
//                 lineHeight: "200px",
//                 color: "grey",
//               }}
//               className="text-center"
//             >
//               img not
//             </div>
//           )}

//           <div className="actions">
//             <div
//               className="action-btn"
//               onClick={() => handleLike(post._id)}
//               style={{ color: isLiked ? "blue" : "gray" }}
//             >
//               {isLiked ? (
//                 <i className="fa-solid fa-thumbs-up"></i>
//               ) : (
//                 <i className="fa-regular fa-thumbs-up"></i>
//               )}
//               <span>{likeCount}</span>
//             </div>
//             <div
//               onClick={() => {
//                 setIsCommit(!isCommit);
//                 getCommentsByPostId(post._id);
//               }}
//               className="action-btn"
//             >
//               <i className="fa-solid fa-comment-dots"></i>
//               <span>{commentLenth}</span>
//             </div>
//             <div
//               className="action-btn"
//               onClick={() => handleSavePost(post?._id)}
//             >
//               {currentUser.savedPosts.includes(post?._id) ? (
//                 <i className="fa-solid fa-bookmark"></i>
//               ) : (
//                 <i className="fa-regular fa-bookmark"></i>
//               )}

//               {currentUser.savedPosts.includes(post?._id) ? (
//                 <span>Unsave</span>
//               ) : (
//                 <span>Save</span>
//               )}
//             </div>
//           </div>

//           {isCommit && (
//             <div className="comments-container">
//               {comments.length > 0 ? (
//                 <div className="comments-list">
//                   {comments.map((comment) => (
//                     <div
//                       key={comment._id}
//                       className="w-100 comment-item d-flex justify-content-between"
//                     >
//                       <div>
//                         <strong>{comment.userId?.username}</strong>:{" "}
//                         {comment.content}
//                         <small className="text-muted d-block">
//                           {moment(comment.createdAt).fromNow()}
//                         </small>
//                       </div>
//                       {(currentUser._id === comment.userId._id ||
//                         currentUser.role === "admin") && (
//                         <div className="d-flex align-items-center gap-2">
//                           <button className="btn btn-warning text-light btn-lg">
//                             <i className="fa-solid fa-pen-to-square"></i>
//                           </button>

//                           <Popconfirm
//                             title="Delete the comment"
//                             description="Are you sure to delete this comment?"
//                             onConfirm={() => handleDeleteComment(comment._id)}
//                             okText="Yes"
//                             cancelText="No"
//                           >
//                             <Button danger>
//                               <i className="fa-solid fa-trash"></i>
//                             </Button>
//                           </Popconfirm>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-muted">No comments yet.</p>
//               )}
//             </div>
//           )}

//           <div className="comment-box gap-3">
//             <input
//               type="text"
//               placeholder="Write your comment..."
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//             />
//             <button onClick={handleSendComment}>
//               <i className="fa-solid fa-paper-plane"></i>
//             </button>
//           </div>

//           {(currentUser._id === post?.userId?._id ||
//             currentUser.role === "admin") && (
//             <div className="d-flex mt-3 gap-3">
//               <button
//                 onClick={() => handleEditClick(post)}
//                 className="btn btn-warning d-flex gap-2 align-items-center"
//               >
//                 <i className="fa-solid fa-pen"></i>Update Post
//               </button>
//               <Popconfirm
//                 title="Delete the post"
//                 description="Are you sure to delete this post?"
//                 onConfirm={() => hendleDeletPost(post?._id)}
//                 onCancel={cancel}
//                 okText="Yes"
//                 cancelText="No"
//               >
//                 <button className="btn btn-lg btn-danger d-flex gap-2 align-items-center">
//                   <i className="fa-solid fa-trash"></i>Delete Post
//                 </button>
//               </Popconfirm>
//             </div>
//           )}
//         </div>

//         {selectedPost && (
//           <UpdatePostModal
//             visible={isModalOpen}
//             onCancel={() => setIsModalOpen(false)}
//             onUpdate={handleUpdatePost}
//             initialValues={{
//               content: selectedPost.content,
//               postImage: selectedPost.postImage, // rasm uchun kerak
//             }}
//           />
//         )}
//       </div>
//     )
//   );
// };

// export default Post;
import React, { useState } from "react";
import Men from "../../puplickImg/men.png";
import { Image, Popconfirm, message, Button } from "antd";
import { useInfoContext } from "../../context/context";
import moment from "moment";
import {
  deletePost,
  getPost,
  likePost,
  updatePost,
} from "../../api/postRequest";
import UpdatePostModal from "../modal/UpdatePostModal";
import { savedPost } from "../../api/userRequests";
import {
  addComment,
  deleteComment,
  getComments,
  updateComment,
} from "../../api/commentRequest";
import { PopconfirmProps } from "antd";
import "./post.scss";

const Post = ({ post, handleOneUser, handleClick }) => {
  const { currentUser, setCurrentUser, setAllPost } = useInfoContext();
  const [isCommit, setIsCommit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser._id));
  const [likeCount, setLikeCount] = useState(post.likes.length);

  // Edit tugmasini bosganda
  const handleEditClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const handleUpdatePost = async (values) => {
    try {
      const res = await updatePost(selectedPost._id, values);
      if (res) {
        const res = await getPost();
        setAllPost(res.data.allPosts);
      }
      message.success("Post muvaffaqiyatli yangilandi");
      setIsModalOpen(false);

      const updatedUser = {
        ...currentUser,
        post: currentUser.post.map((p) =>
          p._id === selectedPost._id ? { ...p, ...values } : p
        ),
      };
      localStorage.setItem("profile", JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
    } catch (error) {
      setIsModalOpen(false);
      console.error("Xatolik:", error);
      message.error("Postni yangilashda xatolik yuz berdi");
    }
  };

  const hendleDeletPost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res) {
        const res = await getPost();
        setAllPost(res.data.allPosts);
      }
      const currentUser = JSON.parse(localStorage.getItem("profile"));
      const updatedPosts = currentUser.posts.filter((postId) => postId !== id);

      const updatedUser = {
        ...currentUser,
        posts: updatedPosts,
      };

      console.log(updatedPosts);
      localStorage.setItem("profile", JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      message.success("Post o‘chirildi");
    } catch (error) {
      console.log("Xatolik:", error);
      message.error("Postni o‘chirishda xatolik yuz berdi");
    }
  };

  const handleSavePost = async (postId) => {
    try {
      const res = await savedPost(postId);

      const userData = currentUser;
      if (!userData) return console.log("User not found in localStorage");

      let savedPosts = userData.savedPosts || [];

      const isSaved = savedPosts.includes(postId);

      if (isSaved) {
        savedPosts = savedPosts.filter((id) => id !== postId);
      } else {
        savedPosts.push(postId);
      }

      const updatedUser = {
        ...userData,
        savedPosts,
      };
      localStorage.setItem("profile", JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
    } catch (error) {
      console.log(error);
    }
  };
  const getCommentsByPostId = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await getComments(token, postId);
      setComments(res.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSendComment = async () => {
    try {
      if (!newComment.trim()) return;

      const token = localStorage.getItem("token");
      const res = await addComment(token, newComment, post._id);

      setNewComment(""); // inputni tozalash
      await getCommentsByPostId(post._id); // yangilash
    } catch (err) {
      console.error("Failed to send comment", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await deleteComment(token, commentId);

      message.success("Comment deleted successfully!");

      await getCommentsByPostId(post._id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment._id);
    setEditedCommentContent(comment.content);
  };

  const handleUpdateComment = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      await updateComment(token, commentId, editedCommentContent);
      setEditingCommentId(null);
      setEditedCommentContent("");
      await getCommentsByPostId(post._id); // yangilash
      message.success("Comment updated successfully!");
    } catch (error) {
      console.error("Failed to update comment", error);
      message.error("Commentni yangilashda xatolik yuz berdi");
    }
  };

  const handleLike = async (id) => {
    try {
      const res = await likePost(id);
      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Like bosishda xatolik:", error);
    }
  };

  return (
    post && (
      <div className="post">
        <div className="post-card">
          <a
            href={`/user/${post?.userId?._id}`}
            onClick={(e) => {
              handleClick(e, `/user/${post?.userId?._id}`);
              handleOneUser(post?.userId?._id);
            }}
          >
            <div className="user-info">
              {post.userId?.profileImage?.url ? (
                <img
                  width={50}
                  style={{ borderRadius: "50%", height: "50px" }}
                  src={post.userId.profileImage.url}
                />
              ) : (
                <img style={{ borderRadius: "50%" }} width={50} src={Men} />
              )}
              <div style={{ textAlign: "start" }}>
                <h3 className="username">
                  {post?.userId?.surname + " " + post?.userId?.username}
                </h3>
                <p className="location">
                  {moment(post?.createdAt).format("DD MMMM YYYY, HH:mm")}
                </p>
              </div>
            </div>
          </a>

          <div className="post-content">
            <p>{post?.content}</p>
          </div>

          {post?.postImage?.url ? (
            <div className="post-image">
              <Image src={post?.postImage?.url} alt="Post" />
            </div>
          ) : (
            <div
              style={{
                height: "200px",
                border: "1px dashed grey",
                lineHeight: "200px",
                color: "grey",
              }}
              className="text-center"
            >
              img not fount
            </div>
          )}

          <div className="actions">
            <div
              className="action-btn"
              onClick={() => handleLike(post._id)}
              style={{ color: isLiked ? "blue" : "gray" }}
            >
              {isLiked ? (
                <i className="fa-solid fa-thumbs-up"></i>
              ) : (
                <i className="fa-regular fa-thumbs-up"></i>
              )}
              <span>{likeCount}</span>
            </div>
            <div
              onClick={() => {
                setIsCommit(!isCommit);
                getCommentsByPostId(post._id);
              }}
              className="action-btn"
            >
              <i className="fa-solid fa-comment-dots"></i>
              <span>{post.comments.length}</span>
            </div>
            <div
              className="action-btn"
              onClick={() => handleSavePost(post?._id)}
            >
              {currentUser.savedPosts.includes(post?._id) ? (
                <i className="fa-solid fa-bookmark"></i>
              ) : (
                <i className="fa-regular fa-bookmark"></i>
              )}

              {currentUser.savedPosts.includes(post?._id) ? (
                <span>Unsave</span>
              ) : (
                <span>Save</span>
              )}
            </div>
          </div>

          {isCommit && (
            <div className="comments-container">
              {comments.length > 0 ? (
                <div className="comments-list">
                  {comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="w-100 comment-item d-flex justify-content-between"
                    >
                      <div>
                        <strong>{comment.userId?.username}</strong>:
                        {editingCommentId === comment._id ? (
                          <div className="d-flex flex-column">
                            <input
                              type="text"
                              value={editedCommentContent}
                              onChange={(e) =>
                                setEditedCommentContent(e.target.value)
                              }
                              className="form-control my-2"
                            />
                            <div className="d-flex gap-2">
                              <Button
                                type="primary"
                                onClick={() => handleUpdateComment(comment._id)}
                              >
                                Save
                              </Button>
                              <Button
                                onClick={() => {
                                  setEditingCommentId(null);
                                  setEditedCommentContent("");
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <span> {comment.content}</span>
                            <small className="text-muted d-block">
                              {moment(comment.createdAt).fromNow()}
                            </small>
                          </>
                        )}
                      </div>

                      {currentUser._id === comment.userId._id &&
                        editingCommentId !== comment._id && (
                          <div className="d-flex align-items-center gap-2">
                            <Button
                              className="btn btn-warning text-light"
                              onClick={() => handleEditComment(comment)}
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </Button>
                            <Popconfirm
                              title="Delete the comment"
                              description="Are you sure to delete this comment?"
                              onConfirm={() => handleDeleteComment(comment._id)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button danger>
                                <i className="fa-solid fa-trash"></i>
                              </Button>
                            </Popconfirm>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted">No comments yet.</p>
              )}
            </div>
          )}

          <div className="comment-box gap-3">
            <input
              type="text"
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleSendComment}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>

          {currentUser._id === post?.userId?._id ||
          currentUser.role === "admin" ? (
            <div className="d-flex mt-3 gap-3">
              <button
                onClick={() => handleEditClick(post)}
                className="btn btn-warning d-flex gap-2 align-items-center"
              >
                <i className="fa-solid fa-pen"></i>Update Post
              </button>
              <Popconfirm
                title="Delete the post"
                description="Are you sure to delete this post?"
                onConfirm={() => hendleDeletPost(post?._id)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <button className="btn btn-lg btn-danger d-flex gap-2 align-items-center">
                  <i className="fa-solid fa-trash"></i>Delete Post
                </button>
              </Popconfirm>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        {selectedPost && (
          <UpdatePostModal
            visible={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onUpdate={handleUpdatePost}
            initialValues={{
              content: selectedPost.content,
              postImage: selectedPost.postImage, // rasm uchun kerak
            }}
          />
        )}
      </div>
    )
  );
};

export default Post;
