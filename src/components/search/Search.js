import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { IconSearch } from "../icons";

const SearchStyled = styled.form`
  .input-serach__control {
    position: relative;

    .input-control {
      padding: 18px 60px 18px 20px;
      border-radius: 8px;
      width: 100%;
      border: 1px solid ${(props) => props.theme.color.gray};
      outline: none;
    }
    .icon-search {
      top: 50%;
      transform: translateY(-50%);
      right: 30px;
      position: absolute;
    }
  }
`;

const Search = ({ children, placeholder, handle, className = "" }) => {
  const [value, setValue] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handle(value);
  };

  return (
    <SearchStyled onSubmit={handleSearchSubmit}>
      <div className="input-serach__control">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`${className} input-control`}
          placeholder={placeholder || "Search posts..."}
        />
        {children || <IconSearch></IconSearch>}
      </div>
    </SearchStyled>
  );
};

Search.propTypes = {
  handle: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Search;
