import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import useFetchFirebaseData from "../../hooks/useFetchFirebaseData";
import { FIREBASE_COLLECTION } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const PostNewestLargeStyled = styled.div`
  flex: 1;
  margin-top: 30px;
  color: ${(props) => props.theme.color.grayDack};
  h3 {
    display: block;
  }
  .category {
    display: inline-block;
    margin-top: 30px;
  }
  .desc {
    color: ${(props) => props.theme.color.blueDack};
  }
`;
const PostNewestLarge = ({ post }) => {
  const navigate = useNavigate();
  const { data: author } = useFetchFirebaseData(
    post?.author?.id,
    FIREBASE_COLLECTION.USER
  );
  const { data: category } = useFetchFirebaseData(
    post?.category?.id,
    FIREBASE_COLLECTION.CATEGRORIES
  );

  const date = new Date(post?.time?.seconds * 1000).toLocaleDateString();
  return (
    <PostNewestLargeStyled>
      <PostImage
        onClick={() => navigate(`/${post?.slug}`)}
        url={post?.image}
        className="h-[360px]"
      ></PostImage>
      <PostCategory
        to={`/category/${category?.slug}?id=${post?.category?.id}`}
        className="category"
      >
        {category?.title}
      </PostCategory>
      <PostTitle to={`/${post?.slug}`}>{post?.title}</PostTitle>
      <PostMeta
        toAuthor={`/author/${author?.userName}?id=${post?.author?.id}`}
        date={date}
        authorName={author?.userName}
      ></PostMeta>
    </PostNewestLargeStyled>
  );
};

export default PostNewestLarge;
