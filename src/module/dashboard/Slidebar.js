import { signOut } from "firebase/auth";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  IconCategory,
  IconDashboard,
  IconLogout,
  IconPost,
  IconUser,
} from "../../components/icons";
import { auth } from "../../firebase/firebase-config";
import { ROUTERLINK } from "../../router/Router";

const SlideBarStyled = styled.div`
  padding: 20px 0;
  max-width: 400px;
  border-radius: 20px;
  box-shadow: rgba(149, 157, 165, 0.3) 0px 8px 24px;
  width: 100%;
  .slidebar-top {
    display: flex;
    align-items: center;
    gap: 20px;
    .slidebar-image {
      margin-left: 20px;
      --size: 50px;
      width: var(--size);
      height: var(--size);
      & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .slidebar-title {
      font-weight: 600;
    }
  }
  .slidebar-nav {
    margin-top: 10px;
    .menu-item {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 14px 20px;
      font-weight: 500;
      color: ${(props) => props.theme.gray80};
      margin-bottom: 20px;
      cursor: pointer;
      &.active,
      &:hover {
        background: #f1fbf7;
        color: ${(props) => props.theme.color.primary};
      }
    }
  }
`;

const sidebarLinks = [
  // {
  //   title: "Dashboard",
  //   url: "/dashboard",
  //   icon: <IconDashboard></IconDashboard>,
  // },
  {
    title: "Post",
    url: "/manage/post",
    icon: <IconPost></IconPost>,
  },
  {
    title: "Category",
    url: "/manage/category",
    icon: <IconCategory></IconCategory>,
  },
  {
    title: "User",
    url: "/manage/user",
    icon: <IconUser></IconUser>,
  },
  {
    title: "Logout",
    url: "/",
    icon: <IconLogout></IconLogout>,
    onClick: () => signOut(auth),
  },
];

const Slidebar = () => {
  const navigate = useNavigate();
  return (
    <SlideBarStyled>
      <div
        className="slidebar-top"
        onClick={() => navigate(ROUTERLINK.HOME.path)}
      >
        <div className="slidebar-image">
          <img src="/logo.png" alt="logo monkey blogging" />
        </div>
        <h3 className="slidebar-title">Monkey Blogging</h3>
      </div>
      <ul className="slidebar-nav">
        {sidebarLinks.map((link) => (
          <li key={link.title}>
            {link.onClick ? (
              <p to={link.url} className="menu-item" onClick={link.onClick}>
                <span className="menu-icon">{link.icon}</span>
                <span className="menu-text">{link.title}</span>
              </p>
            ) : (
              <NavLink to={link.url} className="menu-item">
                <span className="menu-icon">{link.icon}</span>
                <span className="menu-text">{link.title}</span>
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </SlideBarStyled>
  );
};

export default Slidebar;
