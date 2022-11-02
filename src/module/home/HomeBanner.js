import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/button";
import { ROUTERLINK } from "../../router/Router";

const HomeBannerStyled = styled.div`
  /* height: 520px; */
  padding: 70px 0;
  padding-bottom: 56px;
  background: linear-gradient(
    155deg,
    ${(props) => props.theme.color.primary} 6.67%,
    ${(props) => props.theme.color.secondary} 84.1%
  );
  color: ${(props) => props.theme.color.white};
  .banner-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .banner-content {
    width: 450px;
  }
  .banner-heading {
    font-weight: 700;
    font-size: 48px;
  }
  .banner-desc {
    margin-top: 28px;
    line-height: 28px;
    font-size: 14px;
    word-spacing: 2px;
    text-align: justify;
  }
  .banner-button {
    display: inline-block;
    margin-top: 48px;
    padding: 16px 63px;
    background-color: ${(props) => props.theme.color.white};
    background: ${(props) => props.theme.color.white};
    color: ${(props) => props.theme.color.primary};
  }
  .banner-image {
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const HomeBanner = () => {
  const navigate = useNavigate();
  return (
    <HomeBannerStyled>
      <div className="container banner-container">
        <div className="banner-content ">
          <h1 className="banner-heading">Monkey Blogging</h1>
          <p className="banner-desc">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae
            doloribus repellat maxime laboriosam ea accusantium modi quam
            temporibus, dolores voluptas! Explicabo fugiat, id officiis nemo
            placeat dolorem rerum voluptatum dicta?
          </p>
          <Button
            className="banner-button"
            handle={() => navigate(ROUTERLINK.SING_UP.path)}
          >
            Get Started
          </Button>
        </div>
        <div className="banner-image">
          <img src="/banner-img.png" alt="banner-monkey blogging" />
        </div>
      </div>
    </HomeBannerStyled>
  );
};

export default HomeBanner;
