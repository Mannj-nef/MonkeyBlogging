import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const PostImageStyled = styled.div`
  cursor: pointer;
  & img {
    border-radius: 15px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PostImage = ({
  url = "https://images.unsplash.com/photo-1580522154071-c6ca47a859ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  classImage,
  ...props
}) => {
  return (
    <PostImageStyled {...props}>
      <img src={url} alt="feature-img" className={classImage} />
    </PostImageStyled>
  );
};

PostImage.propTypes = {
  url: PropTypes.string,
  classImage: PropTypes.string,
};

export default PostImage;
