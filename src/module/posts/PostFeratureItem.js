import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import { FIREBASE_COLLECTION } from "../../utils/constants";
import useFetchFirebaseData from "../../hooks/useFetchFirebaseData";

const PostFeratureItemStyled = styled.div`
  position: relative;
  .feature-main {
    padding: 26px;
    inset: 0;
    position: absolute;
    color: ${(props) => props.theme.color.white};
    z-index: 10;
  }
  .post-image {
    height: 272px;
  }
  .overlay {
    position: absolute;
    inset: 0;
    border-radius: 15px;
    background-color: ${(props) => props.theme.color.black};
    opacity: 0.4;
  }
  .feature-item__top {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    .post-meta {
      color: ${(props) => props.theme.color.white};
    }
  }
`;

const PostFeratureItem = ({ post }) => {
  const { image, category, time, author, title, slug } = post;

  const { data: userName } = useFetchFirebaseData(
    author?.id,
    FIREBASE_COLLECTION.USER
  );
  const { data: categoryName } = useFetchFirebaseData(
    category?.id,
    FIREBASE_COLLECTION.CATEGRORIES
  );

  const timestamp = new Date(time.seconds * 1000);
  const date = timestamp.toLocaleDateString("vi-VI");

  return (
    <PostFeratureItemStyled className="feature-item">
      <div className="overlay"></div>
      <PostImage className="post-image" url={image}></PostImage>
      <div className="feature-main">
        <div className="feature-item__top">
          <PostCategory
            short
            to={`/category/${categoryName?.slug}?id=${category?.id}`}
          >
            {categoryName?.title}
          </PostCategory>
          <PostMeta
            toAuthor={`/author/${userName?.userName}?id=${author?.id}`}
            className="post-meta"
            date={date}
            authorName={userName?.displayName}
          ></PostMeta>
        </div>
        <PostTitle to={slug}>{title}</PostTitle>
      </div>
    </PostFeratureItemStyled>
  );
};

PostFeratureItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostFeratureItem;
