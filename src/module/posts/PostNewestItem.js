import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import useFetchFirebaseData from "../../hooks/useFetchFirebaseData";
import { FIREBASE_COLLECTION } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const PostNewestItemzStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
  border-bottom: 1px solid ${(props) => props.theme.color.gray};
  :last-child {
    border: none;
  }
  gap: 30px;
  .post-image {
    max-width: 181px;
    width: 100%;
    .image {
      border-radius: 10px;
    }
  }
  .info {
    color: ${(props) => props.theme.color.grayDack};
  }
  .category {
    background-color: ${(props) => props.theme.color.white};
  }
  .post-desc {
    font-size: 18px;
    line-height: 1.3;
  }
`;

const PostNewestItem = ({ post }) => {
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

  if (!post.id) return null;
  return (
    <PostNewestItemzStyled>
      <PostImage
        className="post-image h-[120px]"
        classImage="image"
        onClick={() => navigate(`/${post?.slug}`)}
        url={post?.image}
      ></PostImage>
      <div className="info">
        <PostCategory
          to={`/category/${category?.slug}?id=${post?.category?.id}`}
          className="category"
        >
          {category?.title}
        </PostCategory>
        <PostTitle to={`/${post?.slug}`} className="post-desc">
          {post?.title}
        </PostTitle>
        <PostMeta
          toAuthor={`/author/${author?.userName}?id=${post?.author?.id}`}
          date={date}
          authorName={author?.userName}
        ></PostMeta>
      </div>
    </PostNewestItemzStyled>
  );
};

export default PostNewestItem;
