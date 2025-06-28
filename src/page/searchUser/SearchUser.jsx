import { useEffect, useState } from "react";
import "./searchUser.scss";
import { useInfoContext } from "../../context/context";
import userDefaultImg from "../../puplickImg/men.png";
import { follow } from "../../api/userRequests";
import { toast } from "react-toastify";
const SearchUser = ({ handleOneUser, handleClick }) => {
  const { allUsers, setAllUsers, setCurrentUser, currentUser } =
    useInfoContext();
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleFollow = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await follow(id, token);
      if (res?.data?.user) {
        const updatedUsers = allUsers.map((u) =>
          u._id === res.data.user._id ? res.data.user : u
        );
        setAllUsers(updatedUsers);
        const isFollowing = res.data.user.follower.some(
          (f) => f.toString() === currentUser._id.toString()
        );

        let updatedCurrentUser;

        if (isFollowing) {
          updatedCurrentUser = {
            ...currentUser,
            followed: [...currentUser.followed, res.data.user._id],
          };
        } else {
          updatedCurrentUser = {
            ...currentUser,
            followed: currentUser.followed.filter(
              (fid) => fid !== res.data.user._id
            ),
          };
        }
        console.log(updatedCurrentUser);

        setCurrentUser(updatedCurrentUser);
        localStorage.setItem("profile", JSON.stringify(updatedCurrentUser));
      }
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Follow failed");
    }
  };
  return (
    <div className="search-user-container">
      <div
        id="search-input-box"
        className="w-75 d-flex align-items-center justify-content-between"
      >
        <h1 className="search-header"> Find Users</h1>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    {user.profileImage?.url ? (
                  <img
                    width={50}
                    style={{ borderRadius: "50%", height: "50px" }}
                    src={user.profileImage.url}
                  />
                ) : (
                  <img
                    style={{ borderRadius: "50%" }}
                    width={50}
                    src={userDefaultImg}
                  />
                )}
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
                      {(user.surname ? user.surname : "") +
                        " " +
                        (user.username ? user.username : "")}
                    </a>
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
                      {user.email}
                    </a>
                  </td>
                  <td>
                    {user.follower.find((f) => f === currentUser._id) ? (
                      <button
                        onClick={() => handleFollow(user._id)}
                        className={`btn btn-danger`}
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        onClick={() => handleFollow(user._id)}
                        className={`btn btn-primary`}
                      >
                        Follow
                      </button>
                    )}
                  </td>
                
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-results">No users found</div>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
