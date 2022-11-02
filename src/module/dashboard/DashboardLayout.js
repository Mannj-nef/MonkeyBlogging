import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { useAuthContext } from "../../contexts/auth-context";
import PageNotfould from "../../pages/PageNotfould";
import DashboardHeader from "./DashboardHeader";
import Slidebar from "./Slidebar";

const DashboardLayoutStyled = styled.div`
  .dashboard-main {
    display: grid;
    grid-template-columns: 300px minmax(0, 1fr);
    padding: 40px 20px;
    gap: 0 40px;
    align-items: start;
    .heading {
      font-weight: 700;
      color: ${(props) => props.theme.color.primary};
    }
    .dashboard-heading {
      font-weight: bold;
      font-size: 30px;
      margin-bottom: 5px;
      text-transform: capitalize;
      color: ${(props) => props.theme.color.primary};
    }
    .dashboard-short-desc {
      font-size: 14px;
      color: ${(props) => props.theme.color.gray80};
    }
  }
`;

const DashboardLayout = () => {
  const { userInfo } = useAuthContext();
  if (!userInfo) return <PageNotfould />;

  return (
    <DashboardLayoutStyled>
      <DashboardHeader></DashboardHeader>
      <div className="dashboard-main">
        <Slidebar></Slidebar>
        <Outlet></Outlet>
      </div>
    </DashboardLayoutStyled>
  );
};

export default DashboardLayout;
