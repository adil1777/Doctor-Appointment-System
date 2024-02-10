import React from "react";
import "../styles/LayoutStyle.css";
import { adminMenu, userMenu } from "../data/data";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  //Logout Handler
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  //=========================Doctor Menu==================
  const doctorMenu = [
    {
      id: 1,
      name: 'Home',
      path: '/',
      icon: 'fa-sharp fa-solid fa-house',
    },
    {
      id: 2,
      name: 'Appointment',
      path: '/doctor-appointments',
      icon: 'fa-sharp fa-solid fa-list',
    },
    {
      id: 3,
      name: 'Profile',
      path: `/doctor/profile/${user?._id}`,
      icon: 'fa-solid fa-user',
    },
  ];
//==============================Doctor Menu====================

  //=========== rendering Menu List===============
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6 className="doc">DocCare</h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div
                      className={`menu-item ${isActive && "active"}`}
                      key={menu._id}
                    >
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className="menu-item" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={user?.notification.length}
                  onClick={() => navigate("/notification")}
                >
                  <i className="fa-solid fa-bell"></i>
                </Badge>

                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
