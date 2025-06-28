import { useEffect, useRef, useState } from "react";
import { useInfoContext } from "../../context/context";
import userDefaultImg from "../../puplickImg/men.png";
import { deleteUser, updateUser } from "../../api/userRequests";
import { toast } from "react-toastify";
import { Modal, Form, Input, message } from "antd";
import "./usersAdmin.scss";
import { useNavigate } from "react-router-dom";

const UsersAdmin = ({ handleOneUser, handleClick }) => {
  const { allUsers, setAllUsers, currentUser, setCurrentUser } =
    useInfoContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posting, setPosting] = useState(false);
  const [formData, setFormData] = useState({});
  const [previewImage, setPreviewImage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const fileInputRef = useRef(null);

  const filteredUsers = (allUsers || []).filter((user) => {
    const surname = user.surname || "";
    const email = user.email || "";
    const username = user.username || "";
    return (
      surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const navigate = useNavigate()
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profilePicture: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setPosting(true);
      const token = localStorage.getItem("token");
      const updatedFormData = new FormData();
      updatedFormData.append("username", formData.username);
      updatedFormData.append("surname", formData.surname);
      updatedFormData.append("email", formData.email);
      updatedFormData.append("hobby", formData.hobby);
      updatedFormData.append("work", formData.work);
      if (formData.profilePicture) {
        updatedFormData.append("profileImage", formData.profilePicture);
      }

      const res = await updateUser(selectedUser._id, updatedFormData, token);

      if (res.data.updatedUser) {
        message.success("Profil muvaffaqiyatli yangilandi");
        const updatedUsers = allUsers.map((u) =>
          u._id === selectedUser._id ? res.data.updatedUser : u
        );
        setAllUsers(updatedUsers);
        if (selectedUser._id === currentUser._id) {
          setCurrentUser(res.data.updatedUser);
          localStorage.setItem("profile", JSON.stringify(res.data.updatedUser));
        }
        setIsModalOpen(false);
        setSelectedUser(null);
      }
    } catch (error) {
      console.error(error);
      message.error("Profilni yangilashda xatolik yuz berdi.");
    } finally {
      setPosting(false);
    }
  };

  const handleDeleteUserByAdmin = async (userId, username) => {
    const confirmDelete = window.confirm(`Delete user: ${username}?`);
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await deleteUser(userId, token);
      const updatedUsers = allUsers.filter((u) => u._id !== userId);
      setAllUsers(updatedUsers);
      toast.success(`${username} deleted`);
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error(error?.response?.data?.message || "Failed to delete user");
    }
  };
  const hendleNavigate = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div className="search-user-container">
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
      <div
        id="search-input-box"
        className="w-75 d-flex align-items-center justify-content-between"
      >
        <h1 className="search-header">Find Users</h1>
        <input
          type="text"
          className="search-input"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="user-table-wrapper">
        {filteredUsers.length > 0 ? (
          <table className="user-table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                {currentUser.role === "admin" && <th>Admin</th>}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    <img
                      src={user.profileImage?.url || userDefaultImg}
                      alt={user.username}
                      className="user-avatar"
                    />
                  </td>
                  <td>
                    <a
                      href={`/user/${user._id}`}
                      onClick={(e) => {
                        handleClick(e, `/user/${user._id}`);
                        handleOneUser(user._id);
                      }}
                      className="text-dark"
                    >
                      {(user.surname || "") + " " + (user.username || "")}
                    </a>
                  </td>
                  <td>{user.email}</td>
                  {currentUser.role === "admin" && (
                    <td className="d-flex gap-2 justify-content-center">
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          setSelectedUser(user);
                          setFormData({
                            username: user.username,
                            surname: user.surname,
                            email: user.email,
                            hobby: user.hobby,
                            work: user.work,
                            profilePicture: null,
                          });
                          setPreviewImage(user?.profileImage?.url || "");
                          setIsModalOpen(true);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          handleDeleteUserByAdmin(user._id, user.username)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-results">No users found</div>
        )}
      </div>

      <Modal
        title="Edit User"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        okText="Save Changes"
        okButtonProps={{ disabled: posting, loading: posting }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <label htmlFor="profile-upload">
            <img
              src={previewImage || userDefaultImg}
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
            <Input name="work" value={formData.work} onChange={handleChange} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersAdmin;
