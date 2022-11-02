import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ROUTERLINK } from "../router/Router";

const AuthenPageStyled = styled.div`
  /* min-height: 156px;
  height: 100%; */
  padding: 27px;
  .logo {
    display: block;
    width: 121px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 27px;
  }
  .logo-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .heading {
    font-weight: 600;
    margin-bottom: 60px;
    font-size: 40px;
    color: ${(props) => props.theme.color.primary};
    text-align: center;
  }
  .have-account {
    margin-bottom: 20px;
    font-size: 14px;
    a {
      margin-left: 10px;
      display: inline-block;
      color: ${(props) => props.theme.color.primary};
      font-weight: 500;
    }
  }
`;

const AuthenPage = ({ children }) => {
  return (
    <AuthenPageStyled>
      <div className="container">
        <Link to={ROUTERLINK.HOME.path} className="logo">
          <img src="/logo.png" alt="" className="logo-img" />
        </Link>
        <h1 className="heading">Monkey Blogging</h1>
        {children}
      </div>
    </AuthenPageStyled>
  );
};

AuthenPage.propTypes = {
  children: PropTypes.node,
};

export default AuthenPage;
