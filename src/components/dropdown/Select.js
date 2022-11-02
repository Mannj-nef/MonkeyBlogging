import React from "react";
import { IconDown, IconUpp } from "../icons";
import { useDropdown } from "./dropdown-context";
import PropTypes from "prop-types";

const Select = ({ placeholder = "" }) => {
  const { show, handleToggleDropdown } = useDropdown();
  return (
    <div
      className="flex items-center justify-between p-5 bg-[#E7ECF3] rounded cursor-pointer font-medium"
      onClick={handleToggleDropdown}
    >
      <span>{placeholder}</span>
      <span>{show ? <IconDown></IconDown> : <IconUpp></IconUpp>}</span>
    </div>
  );
};
Select.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default Select;
