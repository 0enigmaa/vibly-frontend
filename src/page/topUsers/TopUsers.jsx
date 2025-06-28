import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useInfoContext } from "../../context/context";
import { useEffect, useState } from "react";
import { getOneUser, getTopUsers } from "../../api/userRequests";
import "./topUser.scss";
import avatar from "../../puplickImg/men.png";
import { useNavigate } from "react-router-dom";
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const TopUsers = () => {
  const { topUsers, setTopUsers, setOneUserPage } = useInfoContext();
  const navigate = useNavigate();

  const handleTopUserGet = async () => {
    try {
      const res = await getTopUsers();
      setTopUsers(res.data.users);
    } catch (error) {
      console.log("Error fetching top user:", error);
    }
  };
  useEffect(() => {
    handleTopUserGet();
  }, []);

  const hendleNavigate = (e, path) => {
    e.preventDefault();
    navigate(path);
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
  console.log(topUsers);

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
      {topUsers ? (
        <div>
          <div className="user-table-wrapper" style={{ margin: "0 auto" }}>
            {topUsers.length > 0 ? (
              <table className="user-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Follower</th>
                  </tr>
                </thead>
                <tbody>
                  {topUsers.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.surname}
                            className="user-avatar"
                          />
                        ) : (
                          <img
                            src={avatar}
                            alt={user.username}
                            className="user-avatar"
                          />
                        )}
                      </td>
                      <td>
                        <a
                          href={`/user/${user._id}`}
                          onClick={(e) => {
                            hendleNavigate(e, `/user/${user._id}`);
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
                            hendleNavigate(e, `/user/${user._id}`);
                            handleOneUser(user._id);
                          }}
                          className="text-dark"
                        >
                          {user.email}
                        </a>
                      </td>
                      <td>
                        <p>{user.follower.length}</p>
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
      ) : (
        <div>Loading....</div>
      )}
    </div>
  );
};

export default TopUsers;
