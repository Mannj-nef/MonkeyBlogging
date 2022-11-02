import {
  collection,
  doc,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ActionDelete, ActionEdit } from "../../components/action";
import { Button } from "../../components/button";
import LabelStatus from "../../components/label/LabelStatus";
import { Search } from "../../components/search";
import { Table } from "../../components/table";
import { db } from "../../firebase/firebase-config";
import { ROUTERLINK } from "../../router/Router";
import { FIREBASE_COLLECTION, ROLE, USER_STATUS } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";

const UserManageStyled = styled.div`
  .heading_button {
    margin-right: 0;
  }
`;

const LIMIT_USER = 4;
const colRef = collection(db, FIREBASE_COLLECTION.USER);

const UserManage = () => {
  const [userList, setUserList] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [lastDoc, setLastDoc] = useState();
  const navigate = useNavigate();

  const handleSearchCategory = (value) => {
    setValueSearch(value);
  };
  const handleLoadmore = () => {
    const loadMore = true;
    const loadQuery = query(colRef, startAfter(lastDoc), limit(LIMIT_USER));
    handleFetchUser(loadQuery, loadMore);
  };

  function handleFetchUser(queryRef, loadMore = false) {
    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      setLastDoc(lastVisible);
      setUserList(loadMore ? (prev) => [...prev, ...users] : users);
    });
    return unsubscribe;
  }

  const renderStatusUser = (user) => {
    const status = Number(user.status);
    switch (status) {
      case USER_STATUS.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>;
      case USER_STATUS.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case USER_STATUS.BANNED:
        return <LabelStatus type="danger">Ban</LabelStatus>;
      default:
        break;
    }
  };

  const renderRoleUser = (user) => {
    const role = Number(user.role);
    switch (role) {
      case ROLE.ADMIN:
        return "Admin";
      case ROLE.USER:
        return "User";
      case ROLE.MODERATOR:
        return "Moderator";

      default:
        break;
    }
  };

  useEffect(() => {
    const queryUser = query(colRef, limit(LIMIT_USER));
    const querySearch = query(
      colRef,
      where("displayName", ">=", valueSearch),
      where("displayName", "<=", valueSearch + "utf8"),
      limit(LIMIT_USER)
    );

    const newQuery = valueSearch ? querySearch : queryUser;
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const totaUser = snapshot.docs.length;
      setTotal(totaUser);
    });
    handleFetchUser(newQuery);
    return unsubscribe;
  }, [valueSearch]);

  const handleSlictStr = (value) => {
    if (!value) return;
    return value.slice(0, 4) + "...";
  };

  useEffect(() => {
    document.title = "MonkeyBlogging - User";
  });

  return (
    <UserManageStyled>
      <DashboardHeading title="User" desc="Manage user">
        <Button
          className="heading_button"
          handle={() => navigate(ROUTERLINK.DASHBOARD_ADD_USER.path)}
        >
          Create user
        </Button>
      </DashboardHeading>
      <div className="w-full my-10 ">
        <Search
          placeholder="Search category..."
          handle={handleSearchCategory}
        ></Search>
      </div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Info</th>
            <th>Username</th>
            <th>Email address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!!userList.length &&
            userList.map((user) => (
              <tr key={user.id}>
                <td title={user.id}>{handleSlictStr(user.id)}</td>
                <td className="whitespace-nowrap">
                  <div className="flex gap-3 items-center ">
                    <div className="w-12 h-12 rounded-lg flex-shrink-0">
                      <img
                        src={user.avatar}
                        className="w-full h-full object-cover rounded-md"
                        alt=""
                      />
                    </div>
                    <div className="flex-1 ">
                      <p>{user.displayName}</p>
                      <time>
                        {new Date(
                          user?.time?.seconds * 1000
                        ).toLocaleDateString("vi-VI")}
                      </time>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap">
                  <span className="category-slug">{user.displayName}</span>
                </td>
                <td>
                  <span className="category-slug" title={user.email}>
                    {handleSlictStr(user.email)}
                  </span>
                </td>
                <td>
                  <span>{renderStatusUser(user)}</span>
                </td>
                <td>
                  <span className="category-slug">{renderRoleUser(user)}</span>
                </td>
                <td>
                  <div className="flex items-center gap-x-3 text-gray-500">
                    <ActionEdit
                      handle={() =>
                        navigate(
                          `${ROUTERLINK.DASHBOARD_UPDATE_USER.path}?id=${user.id}`
                        )
                      }
                    ></ActionEdit>
                    <ActionDelete
                      docRef={doc(db, FIREBASE_COLLECTION.USER, user.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {userList.length < total && (
        <Button className="mt-10 w-[250px]" handle={handleLoadmore}>
          Load more
        </Button>
      )}
    </UserManageStyled>
  );
};

export default UserManage;
