import React from "react";
import { useLocation } from "react-router-dom";
import { useInfoContext } from "../../context/context";
import "./navbar.scss";
const Navbar = ({
  handleClick,
  isActiv,
  handleIconClick,
  showModal,
  handleSearchUserPage,
}) => {
  const { countNTF, currentUser } = useInfoContext();

  const location = useLocation();

  return (
    <div>
      <header className="fb-header">
        <div className="fb-header-left">
          <a href="/" onClick={(e) => handleClick(e, "/")}>
            {" "}
            <i id="fb-logo" className="fa-brands fa-slack"></i>
            <span className="fb-logo-text">Vibly</span>
          </a>
        </div>
        {currentUser.role === "admin" ? (
          <div className="fb-header-center">
            <a href="/" onClick={(e) => handleClick(e, "/")}>
              {" "}
              <div
                className={`fb-header-icon ${isActiv === 0 ? "active" : ""}`}
                onClick={() => handleIconClick(0)}
              >
                <i className="fa-solid fa-user-tie"></i>
              </div>
            </a>
            <a href="/home" onClick={(e) => handleClick(e, "/home")}>
              {" "}
              <div
                className={`fb-header-icon ${isActiv === 100 ? "active" : ""}`}
                onClick={() => handleIconClick(100)}
              >
                <i className="fas fa-home"></i>
              </div>
            </a>
            <a
              href="/searchPost"
              onClick={(e) => handleClick(e, "/searchPost")}
            >
              {" "}
              <div
                className={`fb-header-icon ${isActiv === 1 ? "active" : ""}`}
                onClick={() => handleIconClick(1)}
              >
                <i className="fas fa-tv"></i>
              </div>
            </a>
            <a
              href="/searchUser"
              onClick={(e) => {
                handleClick(e, "/searchUser");
                handleSearchUserPage();
              }}
            >
              <div
                className={`fb-header-icon ${isActiv === 2 ? "active" : ""}`}
                onClick={() => handleIconClick(2)}
              >
                <i className="fas fa-users"></i>
              </div>
            </a>
            <div className={"fb-header-icon"} onClick={() => showModal()}>
              <i className="fas fa-store"></i>
            </div>
            <div className="fb-header-icon" onClick={() => showModal()}>
              <i className="fas fa-gamepad"></i>
            </div>
          </div>
        ) : (
          <div className="fb-header-center">
            <a href="/" onClick={(e) => handleClick(e, "/")}>
              {" "}
              <div
                className={`fb-header-icon ${isActiv === 0 ? "active" : ""}`}
                onClick={() => handleIconClick(0)}
              >
                <i className="fas fa-home"></i>
              </div>
            </a>
            <a
              href="/searchPost"
              onClick={(e) => handleClick(e, "/searchPost")}
            >
              {" "}
              <div
                className={`fb-header-icon ${isActiv === 1 ? "active" : ""}`}
                onClick={() => handleIconClick(1)}
              >
                <i className="fas fa-tv"></i>
              </div>
            </a>
            <a
              href="/searchUser"
              onClick={(e) => {
                handleClick(e, "/searchUser");
                handleSearchUserPage();
              }}
            >
              <div
                className={`fb-header-icon ${isActiv === 2 ? "active" : ""}`}
                onClick={() => handleIconClick(2)}
              >
                <i className="fas fa-users"></i>
              </div>
            </a>
            <div className={"fb-header-icon"} onClick={() => showModal()}>
              <i className="fas fa-store"></i>
            </div>
            <div className="fb-header-icon" onClick={() => showModal()}>
              <i className="fas fa-gamepad"></i>
            </div>
          </div>
        )}

        <div className="fb-header-right">
          <div className="fb-circle-icon" onClick={() => showModal()}>
            <i className="fab fa-facebook-messenger"></i>
          </div>
          <a href="/bell" onClick={(e) => handleClick(e, "/bell")}>
            {" "}
            <div
              style={{ position: "relative" }}
              className={`fb-circle-icon ${isActiv === 3 ? "active" : ""}`}
              onClick={() => handleIconClick(3)}
            >
              <i className="fas fa-bell"></i>
              {countNTF > 0 ? (
                <span className="notifikation-span">{countNTF}</span>
              ) : (
                <span
                  style={{ display: "none" }}
                  className="notifikation-span"
                ></span>
              )}
            </div>
          </a>
          <a href="/profil" onClick={(e) => handleClick(e, "/profil")}>
            <div
              className={`fb-circle-icon ${isActiv === 4 ? "active" : ""}`}
              onClick={() => handleIconClick(4)}
            >
              <i className="fas fa-user-circle"></i>
            </div>
          </a>
        </div>
      </header>
      <div
        className={`fb-header-left-media ${
          location.pathname === "/" ? "" : "d-none"
        }`}
      >
        <i id="fb-logo" className="fa-brands fa-slack"></i>
        <span className="fb-logo-text">Vibly</span>
      </div>
      <section>
        {currentUser.role === "admin" ? (
          <div className="fb-header-center-media">
            <a href="/" onClick={(e) => handleClick(e, "/")}>
              <div
                className={`fb-header-icon ${isActiv === 0 ? "active" : ""}`}
                onClick={() => handleIconClick(0)}
              >
                <i className="fa-solid fa-user-tie"></i>
              </div>
            </a>
            <a href="/home" onClick={(e) => handleClick(e, "/home")}>
              <div
                className={`fb-header-icon ${isActiv === 100 ? "active" : ""}`}
                onClick={() => handleIconClick(100)}
              >
                <i className="fas fa-home"></i>
              </div>
            </a>
            <a
              href="/searchPost"
              onClick={(e) => handleClick(e, "/searchPost")}
            >
              {" "}
              <div
                className={`fb-header-icon ${isActiv === 1 ? "active" : ""}`}
                onClick={() => handleIconClick(1)}
              >
                <i className="fas fa-tv"></i>
              </div>
            </a>
            <a
              href="/searchUser"
              onClick={(e) => handleClick(e, "/searchUser")}
            >
              <div
                className={`fb-header-icon ${isActiv === 2 ? "active" : ""}`}
                onClick={() => handleIconClick(2)}
              >
                <i className="fas fa-users"></i>
              </div>
            </a>
            <a href="/bell" onClick={(e) => handleClick(e, "/bell")}>
              {" "}
              <div
                style={{ position: "relative" }}
                className={`fb-header-icon ${isActiv === 3 ? "active" : ""}`}
                onClick={() => handleIconClick(3)}
              >
                <i className="fas fa-bell"></i>
                {countNTF !== 0 && (
                  <span className="notifikation-span">{countNTF}</span>
                )}
              </div>
            </a>
            <a href="/profil" onClick={(e) => handleClick(e, "/profil")}>
              {" "}
              <div
                className={`fb-header-icon ${isActiv === 4 ? "active" : ""}`}
                onClick={() => handleIconClick(4)}
              >
                <i className="fas fa-user-circle"></i>
              </div>
            </a>
          </div>
        ) : (
          <div className="fb-header-center-media">
            <a href="/" onClick={(e) => handleClick(e, "/")}>
              <div
                className={`fb-header-icon ${isActiv === 0 ? "active" : ""}`}
                onClick={() => handleIconClick(0)}
              >
                <i className="fas fa-home"></i>
              </div>
            </a>
            <a
              href="/searchPost"
              onClick={(e) => handleClick(e, "/searchPost")}
            >
              {" "}
              <div
                className={`fb-header-icon ${isActiv === 1 ? "active" : ""}`}
                onClick={() => handleIconClick(1)}
              >
                <i className="fas fa-tv"></i>
              </div>
            </a>
            <a
              href="/searchUser"
              onClick={(e) => handleClick(e, "/searchUser")}
            >
              <div
                className={`fb-header-icon ${isActiv === 2 ? "active" : ""}`}
                onClick={() => handleIconClick(2)}
              >
                <i className="fas fa-users"></i>
              </div>
            </a>
            <a href="/bell" onClick={(e) => handleClick(e, "/bell")}>
              {" "}
              <div
                style={{ position: "relative" }}
                className={`fb-header-icon ${isActiv === 3 ? "active" : ""}`}
                onClick={() => handleIconClick(3)}
              >
                <i className="fas fa-bell"></i>
                {countNTF !== 0 && (
                  <span className="notifikation-span">{countNTF}</span>
                )}
              </div>
            </a>
            <a href="/profil" onClick={(e) => handleClick(e, "/profil")}>
              {" "}
              <div
                className={`fb-header-icon ${isActiv === 4 ? "active" : ""}`}
                onClick={() => handleIconClick(4)}
              >
                <i className="fas fa-user-circle"></i>
              </div>
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default Navbar;
