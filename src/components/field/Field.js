import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const FieldStyle = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 50px;
  flex-direction: column;
`;

const Field = ({ children }) => {
  return <FieldStyle>{children}</FieldStyle>;
};

Field.propTypes = {
  children: PropTypes.node,
};

export default Field;
