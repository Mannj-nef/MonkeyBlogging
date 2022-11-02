import { FirebaseError } from "firebase/app";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/button/Button";
import { useAuthContext } from "../../contexts/auth-context";
import useFetchFirebaseData from "../../hooks/useFetchFirebaseData";
import { ROUTERLINK } from "../../router/Router";
import { FIREBASE_COLLECTION } from "../../utils/constants";

const DashboardHeaderStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid ${(props) => props.theme.color.gray};
  .dashboar-hearder {
    margin-right: 20px;
    height: 60px;
    padding: 0 30px;
    font-weight: 600;
  }
  .dashboar-avata {
    --size: 70px;
    display: inline-block;
    width: var(--size);
    height: var(--size);
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100%;
    }
  }
`;

const DashboardHeader = () => {
  const { userInfo } = useAuthContext();
  const idUser = userInfo.uid;

  const { data: author } = useFetchFirebaseData(
    idUser,
    FIREBASE_COLLECTION.USER
  );

  console.log(author);

  const navigate = useNavigate();
  return (
    <DashboardHeaderStyled>
      <Button
        handle={() => navigate(ROUTERLINK.DASHBOARD_ADD_POST.path)}
        className="dashboar-hearder"
      >
        Write new post
      </Button>
      <div className="dashboar-avata">
        <img src={author?.avatar} alt="" />
      </div>
    </DashboardHeaderStyled>
  );
};

export default DashboardHeader;
