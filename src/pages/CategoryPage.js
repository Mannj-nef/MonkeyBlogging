import { collection, onSnapshot, query, where } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/layout";
import Heading from "../components/layout/Heading";
import { db } from "../firebase/firebase-config";
import PostItem from "../module/posts/PostItem";
import { FIREBASE_COLLECTION } from "../utils/constants";

const CategoryPageStyled = styled.div``;

const CategoryPage = () => {
  const { slug } = useParams();
  const [param] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const idCategory = useRef(param.get("id")).current;

  useEffect(() => {
    const colRef = collection(db, FIREBASE_COLLECTION.POST);
    const queries = query(colRef, where("category.id", "==", idCategory));
    const unsubsribe = onSnapshot(queries, (snapshot) => {
      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(result);
    });
    return unsubsribe;
  }, [idCategory]);

  useEffect(() => {
    document.title = "MonkeyBlogging - Categorys";
  }, []);
  return (
    <Layout>
      <CategoryPageStyled className="container">
        <div className="mt-10"></div>
        <Heading className="post-heading">Danh mục Category {slug}</Heading>
        <div className="grid-layout">
          {!!posts.length &&
            posts.map((post) => (
              <PostItem key={post.id} post={post}></PostItem>
            ))}
        </div>
      </CategoryPageStyled>
    </Layout>
  );
};

export default CategoryPage;
