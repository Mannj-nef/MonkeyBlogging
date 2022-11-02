import React from "react";
import styled from "styled-components";

import Layout from "../components/layout";
import HomeBanner from "../module/home/HomeBanner";
import HomeFeature from "../module/home/HomeFeature";
import HomeNewest from "../module/home/HomeNewest";

const HomePageStyled = styled.div``;

const HomePage = () => {
  return (
    <HomePageStyled>
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <HomeNewest></HomeNewest>
      </Layout>
    </HomePageStyled>
  );
};

export default HomePage;
