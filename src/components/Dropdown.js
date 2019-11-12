import React from "react";
import PropTypes from "prop-types";

const Dropdown = ({ onActionHandler }) => {
  return (
    <ul>
      <li
        onClick={() => {
          onActionHandler({ key: "edit" });
        }}
      >
        Edit
      </li>
      <li
        onClick={() => {
          onActionHandler({ key: "delete" });
        }}
      >
        Delete
      </li>
    </ul>
  );
};

export default Dropdown;
