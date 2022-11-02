import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ErrorsInputStyled = styled.p`
  position: absolute;
  top: 100%;
  left: 10px;
  color: ${(props) => props.theme.color.red};
`;

const ErrorsInput = ({ children, ...props }) => {
  return <ErrorsInputStyled {...props}>{children}</ErrorsInputStyled>;
};

ErrorsInput.propTypes = {
  children: PropTypes.node,
};

export default ErrorsInput;
