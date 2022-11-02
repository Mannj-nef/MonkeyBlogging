import React from "react";
import useClickOutSide from "../../hooks/useClickOutside";
import { useDropdown } from "./dropdown-context";

const DropElement = ({ children }) => {
  const { setShow } = useDropdown();
  const { dropdownRef } = useClickOutSide(setShow);
  return (
    <div ref={dropdownRef} className="relative inline-block w-full">
      {children}
    </div>
  );
};

export default DropElement;
