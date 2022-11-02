import React from "react";
import styled from "styled-components";

const ToggleStyled = styled.label`
  cursor: pointer;
  .wrapper-toggle {
    background-color: ${(props) =>
      props.checked ? props.theme.color.primary : props.theme.color.grayD2};
    span {
      background-color: ${(props) => props.theme.color.white};
    }
  }
`;

const Toggle = (props) => {
  const { on, ...rest } = props;
  return (
    <ToggleStyled checked={on ? 1 : 0}>
      <input
        type="checkbox"
        className="input-toggle hidden-input"
        onChange={() => {}}
        checked={on}
        {...rest}
      />
      <div className="w-[80px] h-[40px] px-2 py-1 rounded-2xl wrapper-toggle">
        <span
          className={`w-[32px] h-[32px] rounded-full block transition-all ${
            on ? "translate-x-[32px]" : ""
          }`}
        ></span>
      </div>
    </ToggleStyled>
  );
};

export default Toggle;
