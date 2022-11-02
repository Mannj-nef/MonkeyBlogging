import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const SpinerStyled = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 100%;
  border: ${(props) => props.rounder}px solid transparent;
  border-top: ${(props) => props.rounder}px solid
    ${(props) => props.theme.color.white};
  border-bottom: ${(props) => props.rounder}px solid
    ${(props) => props.theme.color.white};
  animation: spinner 1s infinite linear;
  @keyframes spinner {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpiner = ({ size = "25px", rounder = 4 }) => {
  return <SpinerStyled size={size} rounder={rounder}></SpinerStyled>;
};

LoadingSpiner.propTypes = {
  size: PropTypes.string,
  rounder: PropTypes.number,
};

export default LoadingSpiner;
