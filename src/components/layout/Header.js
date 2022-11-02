import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "../../contexts/auth-context";

import { ROUTERLINK } from "../../router/Router";
import { Button } from "../button";
import { IconSearch } from "../icons";
import { Search } from "../search";

const links = [
  {
    id: ROUTERLINK.HOME.path,
    name: ROUTERLINK.HOME.name,
    path: ROUTERLINK.HOME.path,
  },
  {
    id: ROUTERLINK.BLOG.path,
    name: ROUTERLINK.BLOG.name,
    path: ROUTERLINK.BLOG.path,
  },
  {
    id: ROUTERLINK.CONTACT.path,
    name: ROUTERLINK.CONTACT.name,
    path: ROUTERLINK.CONTACT.path,
  },
];

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 40px;
  padding-bottom: 40px;
  .header-main {
    display: flex;
    align-items: center;
  }
  .header-logo {
    height: 60px;
    margin-right: 40px;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .nav-links {
    display: flex;
    align-items: center;
    list-style: none;
    gap: 40px;
    & a {
      font-weight: 600;
      font-size: 18px;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuthContext();
  return (
    <HeaderStyled className="container">
      <div className="header-main">
        <NavLink className="header-logo" to={ROUTERLINK.HOME.path}>
          <img src="/logo.png" alt="" />
        </NavLink>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.id}>
              <NavLink to={link.path}>{link.name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="header-right">
        <Search>
          <IconSearch></IconSearch>
        </Search>

        {userInfo ? (
          <Button
            type="button"
            handle={() => navigate(ROUTERLINK.DASHBOARD_POST.path)}
            style={{ fontWeight: 600, minWidth: 190 }}
          >
            Dashboard
          </Button>
        ) : (
          <Button
            type="button"
            handle={() => navigate(ROUTERLINK.SING_IN.path)}
            style={{ fontWeight: 600, minWidth: 190 }}
          >
            Sign In
          </Button>
        )}
      </div>
    </HeaderStyled>
  );
};

export default Header;
