import { collection, onSnapshot, query, where } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/layout";
import Heading from "../components/layout/Heading";
import { db } from "../firebase/firebase-config";
import PostItem from "../module/posts/PostItem";
import { FIREBASE_COLLECTION } from "../utils/constants";

const AuthorPageStyled = styled.div``;

const AuthorPage = () => {
  const { slug } = useParams();
  const [param] = useSearchParams();
  const [postRelated, setPostRelated] = useState([]);
  const idAuthor = useRef(param.get("id")).current;

  useEffect(() => {
    const colRef = collection(db, FIREBASE_COLLECTION.POST);
    const queries = query(colRef, where("author.id", "==", idAuthor));
    const unsubsribe = onSnapshot(queries, (snapshot) => {
      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostRelated(result);
    });
    return unsubsribe;
  }, [idAuthor]);

  useEffect(() => {
    document.title = "MonkeyBlogging - Author";
  }, []);
  return (
    <Layout>
      <AuthorPageStyled className="container">
        <div className="mt-10"></div>
        <Heading className="post-heading">Danh mục Author {slug}</Heading>
        <div className="grid-layout">
          {!!postRelated.length &&
            postRelated.map((post) => (
              <PostItem key={post.id} post={post}></PostItem>
            ))}
        </div>
      </AuthorPageStyled>
    </Layout>
  );
};

export default AuthorPage;
