import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ROUTERLINK } from "../../router/Router";

const PostCategoryStyled = styled.span`
  padding: 3px 12px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.color.grayF3};
  color: ${(props) => props.theme.color.gray6B};

  ${(props) =>
    props.short &&
    css`
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: pre;
      height: fit-content;
    `};
`;

const PostCategory = ({ to = ROUTERLINK.HOME.path, children, ...props }) => {
  return (
    <PostCategoryStyled {...props}>
      <Link title={children} to={to}>
        {children}
      </Link>
    </PostCategoryStyled>
  );
};

PostCategory.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
};

export default PostCategory;
