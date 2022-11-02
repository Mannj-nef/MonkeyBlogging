import React from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import styled from "styled-components";

const TextareaStyled = styled.div`
  textarea {
    padding: 20px;
    width: 100%;
    height: 150px;
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
const Textarea = ({ name, type = "text", control, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: props.defaultValue || "",
  });

  return (
    <TextareaStyled>
      <textarea id={name} type={type} {...props} {...field} />
    </TextareaStyled>
  );
};

Textarea.propTypes = {
  name: PropTypes.string,
  control: PropTypes.object.isRequired,
  type: PropTypes.string,
};

export default Textarea;
