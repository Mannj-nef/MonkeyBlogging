import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

import Heading from "../../components/layout/Heading";
import { db } from "../../firebase/firebase-config";
import { FIREBASE_COLLECTION, POST_HOT } from "../../utils/constants";
import PostNewestItem from "../posts/PostNewestItem";
import PostNewestLarge from "../posts/PostNewestLarge";

const HomeNewestStyled = styled.div`
  margin-top: 58px;

  margin-bottom: 500px;
  .layout {
    display: flex;
    gap: 40px;
  }
  .sidebar {
    flex: 1;
    margin-top: 30px;
    padding: 0 30px;
    border-radius: 15px;
    background-color: ${(props) => props.theme.color.grayF3};
  }
`;

const data = [
  {
    id: 1,
    imgUrl:
      "https://images.unsplash.com/photo-1580522154071-c6ca47a859ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    category: "Kiến thức",
    date: "Mar 23",
    author: "Andiez Le",
    desc: "Hướng dẫn setup phòng cực chill dành cho người mới toàn tập",
  },
  {
    id: 2,
    imgUrl:
      "https://images.unsplash.com/photo-1580522154071-c6ca47a859ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    category: "Kiến thức",
    date: "Mar 23",
    author: "Andiez Le",
    desc: "Hướng dẫn setup phòng cực chill dành cho người mới toàn tập",
  },
  {
    id: 3,
    imgUrl:
      "https://images.unsplash.com/photo-1580522154071-c6ca47a859ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    category: "Kiến thức",
    date: "Mar 23",
    author: "Andiez Le",
    desc: "Hướng dẫn setup phòng cực chill dành cho người mới toàn tập",
  },
];

const colRefPost = collection(db, FIREBASE_COLLECTION.POST);

const HomeNewest = () => {
  const [postList, setPostList] = useState([]);
  const [postFirst, ...restPosts] = postList;
  // fetch post
  useEffect(() => {
    const postQuery = query(
      colRefPost,
      where("host", "==", POST_HOT.FALSE),
      limit(4)
    );
    const unsubsribe = onSnapshot(postQuery, (snapshot) => {
      const postList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostList((prev) => [...postList, ...prev]);
    });
    return unsubsribe;
  }, []);

  if (!!postList.length <= 0) return null;
  return (
    <HomeNewestStyled className="container">
      <Heading>Mới nhất</Heading>
      <div className="layout">
        {postFirst && <PostNewestLarge post={postFirst}></PostNewestLarge>}
        <div className="sidebar">
          {!!restPosts.length &&
            restPosts.map((post) => (
              <PostNewestItem key={post.id} post={post}></PostNewestItem>
            ))}
        </div>
      </div>
    </HomeNewestStyled>
  );
};

export default HomeNewest;
