import React, { useState } from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
import PropTypes from "prop-types";

const InputStyle = styled.div`
  position: relative;
  input {
    padding: 20px;
    padding-right: 70px;
    width: 100%;
    border-radius: 8px;
    border: 1px solid transparent;
    background-color: ${(props) => props.theme.color.grayLight};
    transition: all 0.3s linear;

    :focus {
      border: 1px solid;
      border-color: ${(props) => props.theme.color.primary};
      background-color: white;
    }
  }
  .input-icon {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

const InputTogglePassword = ({ iconShow, iconHide, control, ...props }) => {
  const { field } = useController({
    name: "password",
    control,
    defaultValue: "",
  });

  const [isShow, setIsShow] = useState(false);
  return (
    <InputStyle>
      <input
        id="password"
        type={isShow ? "text" : "password"}
        {...props}
        {...field}
      />
      {isShow ? (
        <span className="input-icon" onClick={() => setIsShow(false)}>
          {iconShow}
        </span>
      ) : (
        <span className="input-icon" onClick={() => setIsShow(true)}>
          {iconHide}
        </span>
      )}
    </InputStyle>
  );
};

InputTogglePassword.InputStyle = {
  iconHide: PropTypes.node,
  iconShow: PropTypes.node,
  control: PropTypes.object,
};

export default InputTogglePassword;
