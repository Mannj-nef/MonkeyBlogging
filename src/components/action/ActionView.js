import React from "react";
import PropTypes from "prop-types";
import { IconEye } from "../icons";
import { NavLink } from "react-router-dom";

const ActionView = ({ to = null, ...props }) => {
  if (to) {
    return (
      <NavLink
        to={`/${to}`}
        className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded cursor-pointer text-green-500"
        style={{
          color: "rgb(34 197 94 /1)",
        }}
      >
        <IconEye></IconEye>
      </NavLink>
    );
  }

  return (
    <span
      className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded cursor-pointer text-green-500"
      style={{
        color: "rgb(34 197 94 /1)",
      }}
    >
      <IconEye></IconEye>
    </span>
  );
};
ActionView.propTypes = {
  to: PropTypes.string,
};

export default ActionView;
