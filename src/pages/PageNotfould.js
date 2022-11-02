import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/button";
import { ROUTERLINK } from "../router/Router";

const PageNotFouldStyled = styled.div`
  height: 100vh;
  justify-content: center;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  & a {
    width: 200px;
    height: auto;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .main {
    margin: 30px;
    text-align: center;
    color: ${(props) => props.theme.color.blueDack};
    .title {
      font-weight: 700;
      font-size: 50px;
    }
    .desc {
      width: 300px;
      font-weight: 600;
    }
  }
`;

const PageNotfould = () => {
  const navigate = useNavigate();
  return (
    <PageNotFouldStyled>
      <NavLink to={ROUTERLINK.HOME.path}>
        <img src="/logo.png" alt="monkey-blogging" />
      </NavLink>
      <div className="main">
        <h1 className="title">404 Error.</h1>
        <p className="desc">We can't find the page that you're loking for.</p>
      </div>
      <Button handle={() => navigate(ROUTERLINK.HOME.path)} type="button">
        Back to home
      </Button>
    </PageNotFouldStyled>
  );
};

export default PageNotfould;
