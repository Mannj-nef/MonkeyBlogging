import React from "react";
import styled from "styled-components";

const HeadingStyled = styled.h2`
  font-weight: 600;
  font-size: 28px;
  color: #3a1097;
  position: relative;
  &::before {
    position: absolute;
    content: "";
    width: 35px;
    height: 3px;
    background-color: ${(props) => props.theme.color.primary};
  }
`;

const Heading = ({ children, ...props }) => {
  return <HeadingStyled {...props}>{children}</HeadingStyled>;
};

export default Heading;
