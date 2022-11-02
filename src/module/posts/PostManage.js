import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Search } from "../../components/search";
import { Table } from "../../components/table";
import DashboardHeading from "../dashboard/DashboardHeading";
import {
  collection,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { FIREBASE_COLLECTION } from "../../utils/constants";
import PostTableTr from "./PostTableTr";
import { Button } from "../../components/button";

const PostManageStyled = styled.div`
  h3 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`;

const collRef = collection(db, FIREBASE_COLLECTION.POST);
const LIMIT_POST = 10;

const PostManage = () => {
  const [postList, setPostList] = useState([]);
  const [total, setTotal] = useState(0);
  const [filterPost, setFilterPost] = useState("");
  const [lastDoc, setLastDoc] = useState(0);

  const handleSearchPost = (value) => {
    setFilterPost(value);
  };

  const handleFetchPostData = (query, loadMore = false) => {
    const unsubscribe = onSnapshot(query, (snapshot) => {
      const post = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      setLastDoc(lastVisible);
      setPostList(loadMore ? (prev) => [...prev, ...post] : post);
    });

    return unsubscribe;
  };

  const handleLoadmore = () => {
    const loadMore = true;
    const loadQuery = query(collRef, startAfter(lastDoc), limit(LIMIT_POST));
    handleFetchPostData(loadQuery, loadMore);
  };

  useEffect(() => {
    const queryPost = query(collRef, limit(LIMIT_POST));
    const queryFilterPost = query(
      collRef,
      where("title", ">=", filterPost),
      where("title", "<=", filterPost + "utf8")
    );

    const unsubscribe = onSnapshot(collRef, (snapshot) => {
      const total = snapshot.docs.length;
      setTotal(total);
    });

    const newQuery = filterPost ? queryFilterPost : queryPost;
    handleFetchPostData(newQuery);

    return unsubscribe;
  }, [filterPost]);

  useEffect(() => {
    document.title = "MonkeyBlogging - Post";
  }, []);

  return (
    <PostManageStyled>
      <DashboardHeading title="All posts" desc="Manage all posts">
        <div className="w-[400px]">
          <Search handle={handleSearchPost}></Search>
        </div>
      </DashboardHeading>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!!postList.length &&
            postList.map((post) => (
              <PostTableTr key={post.id} post={post}></PostTableTr>
            ))}
        </tbody>
      </Table>
      {postList.length < total && (
        <Button className="mt-10 w-[250px]" handle={handleLoadmore}>
          Load more
        </Button>
      )}
    </PostManageStyled>
  );
};

export default PostManage;
