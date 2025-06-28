import React from "react";
import "./leftSize.scss";
import { useNavigate } from "react-router-dom";
import { useInfoContext } from "../../context/context";

const LeftSize = ({ showModal }) => {
  const navigate = useNavigate();
  const { isActiv, setIsActiv } = useInfoContext();

  const menuItems = [
    {
      isActivKey: 5,
      icon: "fas fa-clock",
      label: "Vospominaniya",
      isWork: true,
      path: "/story",
    },
    {
      isActivKey: 6,
      icon: "fas fa-bookmark",
      label: "Sohranennoe",
      isWork: true,
      path: "/note",
    },
    { isActivKey: 7, icon: "fas fa-users", label: "Gruppy", isWork: false },
    { isActivKey: 8, icon: "fas fa-video", label: "Audio", isWork: false },
    {
      isActivKey: 9,
      icon: "fas fa-store",
      label: "Marketplace",
      isWork: false,
    },
    { isActivKey: 10, icon: "fas fa-newspaper", label: "Lenty", isWork: false },
    {
      isActivKey: 11,
      icon: "fas fa-calendar",
      label: "Meropriyatiya",
      isWork: false,
    },
    { isActivKey: 12, icon: "fas fa-ad", label: "Ads Manager" },
    {
      isActivKey: 13,
      icon: "fas fa-hand-holding-heart",
      label: "Sbori pozhertvovaniy",
      isWork: false,
    },
  ];
  const handleClick = (e, pathname) => {
    e.preventDefault();
    navigate(pathname);
  };

  return (
    <div className="fb-sidebar">
      {menuItems.map((item, index) => (
        <a
          onClick={(e) => handleClick(e, item.path)}
          key={Math.random()}
          href={item.path}
        >
          <div
            key={index}
            className={`fb-sidebar-item ${
              isActiv === item.isActivKey ? "activee" : ""
            }`}
            onClick={() => {
              if (item.isWork !== true) {
                return showModal();
              }
              localStorage.setItem("isActiv", item.isActivKey);
              setIsActiv(item.isActivKey);
            }}
          >
            <i className={item.icon}></i>
            <span>{item.label}</span>
      
          </div>
        </a>
      ))}
    </div>
  );
};
export default LeftSize;
