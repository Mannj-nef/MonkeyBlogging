import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const PostTitleStyled = styled.h3`
  margin-top: 15px;
  font-size: 22px;
  font-weight: 600;
  display: inline-block;
  cursor: pointer;
`;

const PostTitle = ({ to, children, handler, ...props }) => {
  const element = to ? <NavLink to={to}>{children}</NavLink> : children;
  return (
    <PostTitleStyled onClick={handler} {...props}>
      {element}
    </PostTitleStyled>
  );
};

PostTitle.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node.isRequired,
  handler: PropTypes.func,
};

export default PostTitle;
