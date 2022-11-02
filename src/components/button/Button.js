import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { LoadingSpiner } from "../loading";

const ButtonStyled = styled.button`
  font-weight: 600px;
  /* width: 100%; */
  align-items: center;
  border-radius: 8px;
  border: none;
  outline: none;
  padding: 20px;
  color: ${(props) => props.theme.color.white};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  background: linear-gradient(
    107.61deg,
    ${(props) => props.theme.color.primary} 15.59%,
    ${(props) => props.theme.color.secondary} 87.25%
  );
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
    user-select: none;
  }
`;

/**
 * @requires
 *  @param {string} type type of button is button | submit
 * @returns
 */

const Button = ({ type = "button", children, handle = () => {}, ...props }) => {
  const { isLoading } = props;
  const child = isLoading ? <LoadingSpiner></LoadingSpiner> : children;
  return (
    <ButtonStyled type={type} {...props} onClick={handle}>
      {child}
    </ButtonStyled>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  handle: PropTypes.func,
  type: PropTypes.oneOf(["submit", "button"]),
};

export default Button;
