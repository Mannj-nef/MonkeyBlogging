import React from "react";
import { IconPencilSquare } from "../icons";

const ActionEdit = ({ handle }) => {
  return (
    <span
      className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded cursor-pointer text-blue-500"
      onClick={handle}
      style={{
        color: "rgb(59 130 246 / 1)",
      }}
    >
      <IconPencilSquare></IconPencilSquare>
    </span>
  );
};

export default ActionEdit;
