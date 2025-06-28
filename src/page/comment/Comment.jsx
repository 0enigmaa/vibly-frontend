import React, { useEffect, useState } from 'react';
import { getAdminComments, deleteComment, updateComment } from '../../api/commentRequest';
import { useInfoContext } from '../../context/context';
import avatar from "../../puplickImg/men.png";
import "./CommentAdmin.css";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const CommentAdmin = () => {
  const { allComment, setAllComment } = useInfoContext();
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
const navigate = useNavigate()
  const handleDelete = async (id) => {
    if (!window.confirm("Rostdan ham ushbu kommentni o'chirmoqchimisiz?")) return;

    try {
      const token = localStorage.getItem("token");
      await deleteComment(token, id);
      setAllComment(prev => prev.filter(c => c._id !== id));
      toast.success("Komment o'chirildi!");
    } catch (error) {
      toast.error("O'chirishda xatolik: " + error.message);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await updateComment(token, id, editedContent);
      setAllComment(prev =>
        prev.map(c => c._id === id ? { ...c, content: editedContent } : c)
      );
      toast.success("Komment yangilandi!");
      setEditCommentId(null);
    } catch (error) {
      toast.error("Yangilashda xatolik: " + error.message);
    }
  };
  const hendleNavigate = (e, path) => {
    e.preventDefault();
    navigate(path);
  };
  return (
    <div className="admin-comments container mt-4">
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
      <h2>Admin all comments</h2>
      {allComment.length === 0 ? (
        <p>Kommentlar yo'q</p>
      ) : (
        <div className="row">
          {allComment.map((c) => (
            <div className="col-md-6 mb-3" key={c._id}>
              <div className="card p-3">
                <div className="d-flex align-items-center mb-2">
                  <img
                    src={c.userId.profileImage ? c.userId.profileImage.url : avatar}
                    alt="user"
                    width={40}
                    height={40}
                    className="rounded-circle me-2"
                  />
                  <strong>{c.userId.username} {c.userId.surname}</strong>
                </div>

                {editCommentId === c._id ? (
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    />
                  </div>
                ) : (
                  <p className="cm-content">{c.content}</p>
                )}

                <div className="d-flex gap-2">
                  {editCommentId === c._id ? (
                    <>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleUpdate(c._id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditCommentId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => {
                          setEditCommentId(c._id);
                          setEditedContent(c.content);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(c._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentAdmin;
