import React from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import styled from "styled-components";

const InputStyle = styled.div`
  input {
    padding: 20px;
    width: 100%;
    border-radius: 8px;
    border: 1px solid transparent;
    background-color: ${(props) => props.theme.color.grayF3};
    transition: all 0.3s linear;

    :focus {
      border: 1px solid;
      border-color: ${(props) => props.theme.color.primary};
      background-color: white;
    }
  }
`;

/**
 * @requires
 * @param {obj} control isRequired
 * @returns
 */
const Input = ({ name, type = "text", control, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: props.defaultValue || "",
  });

  return (
    <InputStyle>
      <input id={name} type={type} {...props} {...field} />
    </InputStyle>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  control: PropTypes.object.isRequired,
  type: PropTypes.string,
};

export default Input;
