import {
  collection,
  getDoc,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Heading from "../../components/layout/Heading";
import { db } from "../../firebase/firebase-config";
import {
  FIREBASE_COLLECTION,
  POST_HOT,
  POST_STATUS,
} from "../../utils/constants";
import PostFeratureItem from "../posts/PostFeratureItem";

const HomeFeatureStyled = styled.div`
  margin-top: 70px;

  .grid-layout {
    margin-top: 30px;
    gap: 50px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const HomeFeature = () => {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const colRef = collection(db, FIREBASE_COLLECTION.POST);
    const queries = query(
      colRef,
      where("host", "==", POST_HOT.TRUE),
      where("status", "==", POST_STATUS.APPROVED),
      limit(3)
    );
    const unsubsribe = onSnapshot(queries, (snapshot) => {
      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPost(result);
    });
    return unsubsribe;
  }, []);

  if (!posts.length) return null;
  return (
    <HomeFeatureStyled className="container home-block">
      <Heading>Bài viết nổi bật</Heading>
      <div className="grid-layout">
        {posts.map((post) => (
          <PostFeratureItem key={post.id} post={post}></PostFeratureItem>
        ))}
      </div>
    </HomeFeatureStyled>
  );
};

export default HomeFeature;
