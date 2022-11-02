import React from "react";
import styled from "styled-components";

const TableStyled = styled.div`
  border-radius: 10px;
  overflow-x: auto;
  background-color: ${(props) => props.theme.color.white};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 10px;
  table {
    width: 100%;
    border-radius: inherit;
  }
  table th,
  td {
    vertical-align: middle;
  }
  th {
    padding: 20px 30px;
    font-weight: 700;
    text-align: left;
    white-space: nowrap;
  }
  td {
    padding: 15px 30px;
  }
  td span {
    font-weight: 500;
  }
  thead {
    background-color: ${(props) => props.theme.color.grayF7};
  }
`;

const Table = ({ children, ...props }) => {
  return (
    <TableStyled>
      <table {...props}>{children}</table>
    </TableStyled>
  );
};

export default Table;
