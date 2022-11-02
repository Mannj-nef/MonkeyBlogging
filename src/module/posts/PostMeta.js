import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PostMetaStyled = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  color: ${(props) => props.theme.color.gray6B};
  .post-dots {
    --size: 5px;
    border-radius: 100%;
    display: block;
    width: var(--size);
    height: var(--size);
    background-color: currentColor;
  }
`;

const PostMeta = ({
  toAuthor = "",
  className = "",
  handle,
  date = "Mar 23",
  authorName = "Andiez Le",
  ...props
}) => {
  return (
    <PostMetaStyled className={`post-meta ${className}`} {...props}>
      <span className="post-time">{date}</span>
      <span className="post-dots"></span>
      <Link to={toAuthor} className="post-author">
        {authorName}
      </Link>
    </PostMetaStyled>
  );
};

PostMeta.propTypes = {
  toAuthor: PropTypes.string,
  handle: PropTypes.func,
  date: PropTypes.string,
  authorName: PropTypes.string,
};

export default PostMeta;
