import React from "react";
import styled from "styled-components";

import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import useFetchFirebaseData from "../../hooks/useFetchFirebaseData";
import { FIREBASE_COLLECTION } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const PostItemStyled = styled.div`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  .post-category {
    margin-top: 24px;
    display: inline-block;
    max-width: 150px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .post-title {
    font-size: 18px;
    line-height: 24px;
    margin-bottom: 15px;
  }
`;

const PostItem = ({ post }) => {
  const navigate = useNavigate();
  const { data: author } = useFetchFirebaseData(
    post?.author?.id,
    FIREBASE_COLLECTION.USER
  );

  const date = new Date(post?.time?.seconds * 1000).toLocaleDateString("vi-VI");
  return (
    <PostItemStyled>
      <PostImage
        onClick={() => navigate(`/${post?.slug}`)}
        className="h-[167px]"
        url={post.image}
      ></PostImage>
      <div className="flex flex-1 flex-col px-3 pb-3">
        <PostCategory
          to={`/category/${post?.category?.slug}?id=${post?.category?.id}`}
          className="post-category"
        >
          {post?.category?.title}
        </PostCategory>
        <PostTitle to={`/${post?.slug}`} className="post-title">
          {post?.title}
        </PostTitle>
        <PostMeta
          className="mt-auto "
          date={date}
          toAuthor={`/author/${author?.userName}?id=${post?.author?.id}`}
          authorName={author?.userName}
        ></PostMeta>
      </div>
    </PostItemStyled>
  );
};

export default PostItem;
