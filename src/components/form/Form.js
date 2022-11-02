import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const FormStyled = styled.form`
  max-width: 600px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const Form = ({ children, handle, ...props }) => {
  return (
    <FormStyled autoComplete="off" onSubmit={handle} {...props}>
      {children}
    </FormStyled>
  );
};

Form.propTypes = {
  children: PropTypes.node,
  handle: PropTypes.func.isRequired,
};

export default Form;
