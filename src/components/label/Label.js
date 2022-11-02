import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LabelStyled = styled.label`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grayDack};
  align-self: flex-start;
  text-transform: capitalize;
  cursor: pointer;
`;

/**
 * @requires
 * @param {string} htmlFor label needs 1 htmlFor is id input
 * @returns
 */

const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <LabelStyled htmlFor={htmlFor} {...props}>
      {children}
    </LabelStyled>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Label;
