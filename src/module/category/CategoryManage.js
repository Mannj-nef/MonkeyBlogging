import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";

import DashboardHeading from "../dashboard/DashboardHeading";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import { ROUTERLINK } from "../../router/Router";
import { Search } from "../../components/search";
import { Table } from "../../components/table";
import { ActionDelete, ActionEdit, ActionView } from "../../components/action";
import { db } from "../../firebase/firebase-config";
import { CATEGORY_STATUS, FIREBASE_COLLECTION } from "../../utils/constants";
import LabelStatus from "../../components/label/LabelStatus";

const CategoryManageStyled = styled.div`
  .heading_button {
    margin-right: 0;
  }
  .category-slug {
    font-style: italic;
    color: ${(props) => props.theme.color.gray6B};
    font-weight: 400;
    cursor: default;
  }
`;

const LIMIT_CATEGORY = 3;

const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [lastDoc, setLastDoc] = useState();
  const navigate = useNavigate();

  const handleSearchCategory = (value) => {
    setValueSearch(value);
  };

  function fetchDataCategory(queryRef, load) {
    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      const lastDoc = snapshot.docs[snapshot.docs.length - 1];
      setLastDoc(lastDoc);

      const category = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategoryList(load ? (prev) => [...prev, ...category] : category);
    });
    return unsubscribe;
  }

  const handleLoadmore = async () => {
    if (categoryList.length >= total) return;

    const load = true;
    const nextCategories = query(
      collection(db, FIREBASE_COLLECTION.CATEGRORIES),
      startAfter(lastDoc),
      limit(LIMIT_CATEGORY)
    );
    fetchDataCategory(nextCategories, load);
  };

  useEffect(() => {
    const docRef = collection(db, FIREBASE_COLLECTION.CATEGRORIES);
    const queryCategory = query(docRef, limit(LIMIT_CATEGORY));
    const queryCategorySearch = query(
      docRef,
      where("title", ">=", valueSearch),
      where("title", "<=", valueSearch + "utf8"),
      limit(LIMIT_CATEGORY)
    );

    const queRyRef = valueSearch ? queryCategorySearch : queryCategory;

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setTotal(snapshot.size);
    });

    fetchDataCategory(queRyRef);

    return unsubscribe;
  }, [valueSearch]);

  useEffect(() => {
    document.title = "MonkeyBlogging - Category";
  }, []);

  return (
    <CategoryManageStyled>
      <DashboardHeading title="categories" desc="Manage your category">
        <Button
          className="heading_button"
          handle={() => navigate(ROUTERLINK.DASHBOARD_ADD_CATEGORY.path)}
        >
          Create category
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
            <th></th>
            <th>ID</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!!categoryList.length &&
            categoryList.map((category) => (
              <tr key={category.id}>
                <td></td>
                <td>{category.id}</td>
                <td>
                  <span>{category.title}</span>
                </td>
                <td>
                  <span className="category-slug">{category.slug}</span>
                </td>
                <td>
                  <span>
                    {category.status === CATEGORY_STATUS.APPROVED && (
                      <LabelStatus type="success">Approved</LabelStatus>
                    )}
                    {category.status === CATEGORY_STATUS.UNAPPROVED && (
                      <LabelStatus type="danger">Unapproved</LabelStatus>
                    )}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-x-3 text-gray-500">
                    <ActionView></ActionView>
                    <ActionEdit
                      handle={() =>
                        navigate(
                          `${ROUTERLINK.DASHBOARD_UPDATE_CATEGORY.path}?id=${category.id}`
                        )
                      }
                    ></ActionEdit>
                    <ActionDelete
                      docRef={doc(
                        db,
                        FIREBASE_COLLECTION.CATEGRORIES,
                        category.id
                      )}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {categoryList.length < total && (
        <Button className="mt-10 w-[250px]" handle={handleLoadmore}>
          Load more
        </Button>
      )}
    </CategoryManageStyled>
  );
};

CategoryManage.propTypes = {};

export default CategoryManage;
