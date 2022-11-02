import React, { memo } from "react";
import { DropdownProvider } from "./dropdown-context";
import DropElement from "./DropElement";

const Dropdown = ({ children }) => {
  return (
    <DropdownProvider>
      <DropElement>{children}</DropElement>
    </DropdownProvider>
  );
};

export default memo(Dropdown);
